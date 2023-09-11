import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../../common/enum/order-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    status?: OrderStatus
}
