import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { User } from './../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigType } from '@nestjs/config';
import config from './../../config';

@Injectable()
export class UserService {
  constructor(
    private productsService: ProductsService,
    //private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  private counterId = 1;
  private user: User[] = [
    {
      id: 1,
      email: 'manuel@manuel.com',
      password: '1234',
      role: 'admin',
    },
  ];

  getAll() {
    //const apiKey = this.configService.get('API_KEY');
    //const dataBase = this.configService.get('DATA_BASE');
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    console.log(apiKey, ' ', name);
    return this.user;
  }

  getOne(id: number) {
    const user = this.user.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(payLoad: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payLoad,
    };
    this.user.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.getOne(id);
    if (user) {
      const index = this.user.findIndex((user) => user.id === id);
      this.user[index] = {
        ...user,
        ...payload,
      };
      return this.user[index];
    }
    return null;
  }

  remove(id: number) {
    const user = this.user.findIndex((user) => user.id === id);
    if (user === -1) {
      throw new NotFoundException(`User ${user} not found`);
    }
    this.user.splice(user, 1);
    return true;
  }

  getOrdersByUser(id: number): Order {
    const user = this.getOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
