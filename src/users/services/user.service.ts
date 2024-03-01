import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { User } from './../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
//import { ConfigType } from '@nestjs/config';
//import config from './../../config';
//import { ClientBase } from 'pg';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
@Injectable()
export class UserService {
  constructor(
    private productsService: ProductsService,
    private customerService: CustomerService,
    //private configService: ConfigService,
    //@Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.userRepository.find({
      relations: ['customer'],
    });
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`NOt found user ${id}`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    if (data.customerID) {
      const customer = await this.customerService.getOne(data.customerID);
      newUser.customer = customer;
    }
    return this.userRepository.save(newUser);
  }

  async update(id: number, change: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    this.userRepository.merge(user, change);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return new NotFoundException(`User ${id} not founf`);
    }
    return this.userRepository.delete(id);
  }

  async getOrdersByUser(id: number): Promise<Order> {
    const user = this.userRepository.findOne({ where: { id } });
    return {
      date: new Date(),
      user: await user,
      products: await this.productsService.findAll(),
    };
  }

  /*getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPostgres.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }*/
}
