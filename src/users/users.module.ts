import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { UserController } from './controllers/user.controller';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';
import { ProductsModule } from 'src/products/products.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [CustomerController, UserController],
  providers: [CustomerService, UserService],
})
export class UsersModule {}
