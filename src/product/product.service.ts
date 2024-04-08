import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/createProductDTO';
import { UpdateProductDTO } from './dto/updateProductDTO';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async listProduct() {
    const product = await this.productRepository.find();
    return product;
  }

  async createProduct(product: CreateProductDTO) {
    const productEntity = new ProductEntity();

    productEntity.name = product.name;
    productEntity.value = product.value;
    productEntity.availableQuantity = product.availableQuantity;
    productEntity.description = product.description;
    productEntity.category = product.category;
    productEntity.characteristics = product.characteristics;
    productEntity.images = product.images;

    return await this.productRepository.save(productEntity);
  }

  async updateProduct(id: string, newProduct: UpdateProductDTO) {
    const productId = await this.productRepository.findOneBy({ id });

    if (productId === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    Object.assign(productId, newProduct);
    return this.productRepository.save(productId);
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id);
  }
}
