import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { GuardModule } from './common/guard/guard.module';
import { ProductEntry } from './orders/entities/product-entry.entity';
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
    entities: [Order,ProductEntry],
    database: 'ecommerce',
    synchronize: true,
    logging: true,
  }),OrdersModule,GuardModule,KafkaModule],
  controllers: [],
  providers: [OrderConsumer],
})
export class AppModule {}