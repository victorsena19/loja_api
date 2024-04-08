import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { UserEntity } from 'src/user/user.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, ProductEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
