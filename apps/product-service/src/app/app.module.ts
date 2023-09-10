import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { GuardModule } from './common/guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'password',
    username: 'user',
    entities: [Product],
    database: 'ecommerce',
    synchronize: true,
    logging: true,
  }),ProductsModule,GuardModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
