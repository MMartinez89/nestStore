import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { UserController } from './controllers/user.controller';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';
import { ProductsModule } from 'src/products/products.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrdersItemService } from './services/orders-item.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [
    CustomerController,
    UserController,
    OrdersController,
    OrderItemController,
  ],
  providers: [CustomerService, UserService, OrdersService, OrdersItemService],
})
export class UsersModule {}
