import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ItemOrderDTO {
  @IsUUID()
  productId: string;
  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @IsArray()
  @ArrayMaxSize(1)
  @Type(() => ItemOrderDTO)
  itensOrder: ItemOrderDTO[];
}
