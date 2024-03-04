import { Injectable } from '@nestjs/common';
import { CretaeOrderItemDto } from '../dtos/order-items.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/products.entity';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrdersItemService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
  ) {}

  async create(data: CretaeOrderItemDto) {
    const order = await this.orderRepo.findOne({
      where: { id: data.orderId },
    });

    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });

    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.orderItemRepo.save(item);
  }
}
