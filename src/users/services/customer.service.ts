import { Injectable, NotFoundException } from '@nestjs/common';
import { CretateCustomerDto, UpdateCustomerDto } from './../dtos/customer.dto';
import { Customer } from './../entities/customer.entity';

@Injectable()
export class CustomerService {
  private counterId = 1;
  private customer: Customer[] = [
    {
      id: 1,
      name: 'Manuel',
      lastname: 'Martinez',
      phone: '1234356',
    },
  ];

  getAll() {
    return this.customer;
  }

  getOne(id: number) {
    const customer = this.customer.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  create(payLoad: CretateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payLoad,
    };
    this.customer.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.getOne(id);
    if (customer) {
      const index = this.customer.findIndex((item) => item.id === id);
      this.customer[index] = {
        ...customer,
        ...payload,
      };
      return this.customer[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.customer.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    this.customer.splice(index, 1);
    return true;
  }
}
