import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/StatusPedido.enum';

export class UpdateOrderDto {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
