import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntry } from './entities/product-entry.entity';
import { ProducerService } from '../kafka/producer.service';

@Module({
  imports:[  TypeOrmModule.forFeature([Order,ProductEntry])],

  controllers: [OrdersController],
  providers: [OrdersService,ProducerService],
  exports: [OrdersService]
})
export class OrdersModule {}
