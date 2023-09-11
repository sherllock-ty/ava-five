import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { GuardModule } from './common/guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { KafkaModule } from './kafka/kafka.module';
import { OrderConsumer } from './orders.consumer';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    password: 'password',
    username: 'user',
    entities: [Product],
    database: 'ecommerce',
    synchronize: true,
    logging: true,
  }),ProductsModule,GuardModule,KafkaModule],
  controllers: [],
  providers: [OrderConsumer],
})
export class AppModule {}
