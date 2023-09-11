import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../../common/enum/order-status.enum';
import { IUpdateOrderDto } from '../../common/interfaces/update-order-dto.interface';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    status?: OrderStatus
}
