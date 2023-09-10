import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { GuardModule } from './common/guard/guard.module';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'password',
    username: 'user',
    entities: [Order],
    database: 'ecommerce',
    synchronize: true,
    logging: true,
  }),OrdersModule,GuardModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}