import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/user/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { OrderEntity } from './order.entity';
import { StatusPedido } from './enum/StatusPedido.enum';
import { ItemOrderEntity } from './itemOrder.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  private handlesRequest(dataOrder: CreateOrderDto, products: ProductEntity[]) {
    dataOrder.itensOrder.forEach((itemOrder) => {
      const relatedProduct = products.find(
        (product) => product.id === itemOrder.productId,
      );
      if (relatedProduct === undefined) {
        throw new NotFoundException(
          `O Produto com o id ${itemOrder.productId} não foi encontrado!`,
        );
      }

      if (itemOrder.quantity > relatedProduct.availableQuantity) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemOrder.quantity}) é maior do que a disponível (${relatedProduct.availableQuantity}) para o produto ${relatedProduct.name}.`,
        );
      }
    });
  }

  async registerOrder(userId: string, dataOrder: CreateOrderDto) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user === null) {
      throw new NotFoundException('Usuario não cadastrado!');
    }

    const productId = dataOrder.itensOrder.map(
      (itemOrder) => itemOrder.productId,
    );
    const relatedsProducts = await this.productRepository.findBy({
      id: In(productId),
    });
    const orderEntity = new OrderEntity();

    orderEntity.status = StatusPedido.PROCESSING;
    orderEntity.user = user;
    this.handlesRequest(dataOrder, relatedsProducts);

    const itensOrder = dataOrder.itensOrder.map((itemOrder) => {
      const relatedProduct = relatedsProducts.find(
        (product) => product.id === itemOrder.productId,
      );

      if (relatedProduct === undefined) {
        throw new NotFoundException(
          `O Produto com o id ${itemOrder.productId} não foi encontrado!`,
        );
      }
      const itemOrderEntity = new ItemOrderEntity();
      itemOrderEntity.product = relatedProduct;
      itemOrderEntity.salePrice = relatedProduct.value;
      itemOrderEntity.quantity = itemOrder.quantity;
      itemOrderEntity.product.availableQuantity -= itemOrder.quantity;
      return itemOrderEntity;
    });

    const amount = itensOrder.reduce((total, item) => {
      return total + item.salePrice * item.quantity;
    }, 0);
    orderEntity.itensOrder = itensOrder;
    orderEntity.amount = amount;

    const createdOrder = await this.orderRepository.save(orderEntity);
    return createdOrder;
  }

  async findAll() {
    const getOrder = await this.orderRepository.find();
    return getOrder;
  }

  async findOrderUser(userId: string) {
    const user = await this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });
    return user;
  }

  async update(id: string, dataOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });
    if (order === null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }
    Object.assign(order, dataOrderDto);
    return this.orderRepository.save(order);
  }

  remove(id: string) {
    return this.orderRepository.delete(id);
  }
}
