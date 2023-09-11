import { Injectable } from '@nestjs/common';
import { IOrder } from '../common/interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from '../common/enum/order-status.enum';
import { ProducerService } from '../kafka/producer.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderModel: Repository<Order>,
    private producerService: ProducerService,

  ){}
  async create(createOrdertDto: CreateOrderDto) {
    const queryBuilder = this.orderModel.createQueryBuilder()
    .insert()
    .into(Order)
    .values({...createOrdertDto,status:OrderStatus.PENDING})
    .returning('*');

    try {
      const createdOrder = await queryBuilder.execute();
      if (createdOrder.raw.length === 0) {
        return null; 
      }
      await this.producerService.produce('order-pending', {
        value: 'orderId',
      });

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
      order = await this.orderModel.findOneBy({id:id});
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
  

  async confirmOrder(id) {
    if (id !== 'orderId'){
    const updated = this.update(id,{status:OrderStatus.VALIDATED});
    await this.producerService.produce('order-valid', {
      value: 'orderId',
    });
  } else {
    console.log('Order Confirmed');
  }
  }

  async cancelOrder(id) {
    if (id !== 'orderId'){
      const updated = this.update(id,{status:OrderStatus.VALIDATED});
      await this.producerService.produce('order-valid', {
        value: 'orderId',
      });
    } else {
      console.log('Order Canceled');
    }
  }

  async remove(id) {
    const orderToRemove = await this.orderModel.findOneBy({id:id});

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
