import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

import { User } from './users/entity/User';
import { Orders } from './order/entity/Order';
import { CartItems } from './cart/entity/CartItems';
import { Carts } from './cart/entity/Carts';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const postgresConfig: PostgresConnectionOptions = {
  database:  process.env.POSTGRES_DATABASE,
  entities: [Carts, CartItems, Orders, User],
  host:  process.env.POSTGRES_HOST,
  logging: true,
  migrations: [],
  password: process.env.POSTGRES_PASSWORD,
  port: +process.env.POSTGRES_PORT,
  synchronize: true,
  subscribers: [],
  ssl: { rejectUnauthorized: false },
  type: 'postgres',
  username: process.env.POSTGRES_USERNAME,
};

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot(postgresConfig),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
