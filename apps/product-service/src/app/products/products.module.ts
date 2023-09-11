import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from '../kafka/producer.service';

@Module({
  imports:[  TypeOrmModule.forFeature([Product]),ProductsModule],
  controllers: [ProductsController],
  providers: [ProductsService,ProducerService],
  exports:[ProductsService]
})
export class ProductsModule {}
