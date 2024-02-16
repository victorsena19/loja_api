import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('produto_characteristic')
export class ProductCharacteristicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'description', length: 255, nullable: false })
  descricao: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
