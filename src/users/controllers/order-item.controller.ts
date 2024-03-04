import { Body, Controller, Post } from '@nestjs/common';
import { OrdersItemService } from '../services/orders-item.service';
import { CretaeOrderItemDto } from '../dtos/order-items.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrdersItemService) {}

  @Post()
  create(@Body() data: CretaeOrderItemDto) {
    return this.orderItemService.create(data);
  }
}
