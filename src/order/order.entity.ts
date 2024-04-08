import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusPedido } from './enum/StatusPedido.enum';
import { UserEntity } from '../user/user.entity';
import { ItemOrderEntity } from './itemOrder.entity';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'status', enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @ManyToOne(() => UserEntity, (user) => user.order)
  user: UserEntity;

  @OneToMany(() => ItemOrderEntity, (itemOrder) => itemOrder.order, {
    cascade: true,
  })
  itensOrder: ItemOrderEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
