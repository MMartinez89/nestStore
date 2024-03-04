import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  finAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`The order ${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new Order();
    if (data.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: data.customerId },
      });
      newOrder.customer = customer;
    }
    return this.orderRepository.save(newOrder);
  }

  async update(id: number, change: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`The order ${id} not found`);
    }
    if (change.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: change.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepository.save(order);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
