import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CretateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dto';
import { CustomerService } from 'src/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  findAll() {
    return this.customerService.getAll();
  }

  @Get(':id')
  finOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getOne(id);
  }

  @Post()
  create(@Body() payload: CretateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}
