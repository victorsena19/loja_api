import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImagesEntity } from './product-image.entity';
import { ProductCharacteristicEntity } from './product-characteristic.entity';
import { ItemOrderEntity } from '../order/itemOrder.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'value', nullable: false })
  value: number;

  @Column({ name: 'available_quantity', nullable: false })
  availableQuantity: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @OneToMany(() => ItemOrderEntity, (itemOrder) => itemOrder.product, {
    cascade: true,
  })
  itensOrder: ItemOrderEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => ProductImagesEntity,
    (productImagesEntity) => productImagesEntity.product,
    { cascade: true, eager: true },
  )
  images: ProductImagesEntity[];

  @OneToMany(
    () => ProductCharacteristicEntity,
    (productCharacteristicEntity) => productCharacteristicEntity.product,
    { cascade: true, eager: true },
  )
  characteristics: ProductCharacteristicEntity[];
}
