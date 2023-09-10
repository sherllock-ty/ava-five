import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { GuardModule } from './common/guard/guard.module';
import { ProductEntry } from './orders/entities/product-entry.entity';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'password',
    username: 'user',
    entities: [Order,ProductEntry],
    database: 'ecommerce',
    synchronize: true,
    logging: true,
  }),OrdersModule,GuardModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}