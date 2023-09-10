import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrder } from '../common/interfaces/order.interface';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) : Promise<IOrder>{
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() : Promise<IOrder[]>{
    return this.ordersService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id) : Promise<IOrder>{
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateOrderDto: UpdateOrderDto) : Promise<IOrder>{
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id) : Promise<IOrder>{
    return this.ordersService.remove(id);
  }
}
