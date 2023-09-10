import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GuardModule } from './common/guard/guard.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'password',
    username: 'user',
    entities: [User],
    database: 'ecommerce',
    synchronize: true,
    logging: true,
  }),UsersModule,GuardModule,AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
