import { Injectable } from '@nestjs/common';
import { IOrder } from '../common/interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderModel: Repository<Order>,

  ){}
  async create(createOrdertDto: CreateOrderDto) {
    const queryBuilder = this.orderModel.createQueryBuilder()
    .insert()
    .into(Order)
    .values({...createOrdertDto})
    .returning('*');

    try {
      const createdOrder = await queryBuilder.execute();
      if (createdOrder.raw.length === 0) {
        return null; 
      }

      return createdOrder.raw[0]; 
    } catch (error) {
      throw new Error();
    }
  }

  async findAll() {
    let orders: IOrder[];
    try {
      orders = await this.orderModel.find()
    } catch (error) {
        return null;
    }
    return orders;
  }

  async findOne(id) {
    let order: IOrder;
    try {
      order = await this.orderModel.findOneBy(id);
      if(!order){
          return null;
      }
  } catch (error) {
      return null;
  }
  return order;
  }

  async update(id, updateOrderDto: UpdateOrderDto) {
    const queryBuilder = this.orderModel.createQueryBuilder()
    .update(Order)
    .set({ ...updateOrderDto })
    .where('id = :id', { id })
    .returning('*'); 

    try {
      const updatedOrder = await queryBuilder.execute();
      if (updatedOrder.raw.length === 0) {
        return null; 
      }
      return updatedOrder.raw[0];    
    } catch (error) {
      throw new Error()
    }



  }

  async remove(id) {
    const orderToRemove = await this.findOne(id);

    if (!orderToRemove) {
      return null;
    }
    try {
      await this.orderModel.delete(id); 
    } catch (error) {
      throw new Error();
    }

    return orderToRemove; 
  }
}
