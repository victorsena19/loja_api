import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Query('userId') userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const createdOrder = this.orderService.registerOrder(
      userId,
      createOrderDto,
    );
    return createdOrder;
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get()
  async OrderByUserId(@Query('userId') userId: string) {
    const order = await this.orderService.findOrderUser(userId);
    return order;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
