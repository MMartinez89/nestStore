import { Injectable, NotFoundException } from '@nestjs/common';
import { CretateCustomerDto, UpdateCustomerDto } from './../dtos/customer.dto';
import { Customer } from './../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  getAll() {
    return this.customerRepository.find();
  }

  async getOne(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    // if (!customer) {
    //  return new NotFoundException(`Customer ${id} not found`);
    // }
    return customer;
  }

  create(payLoad: CretateCustomerDto) {
    const newCustomer = this.customerRepository.create(payLoad);
    return this.customerRepository.save(newCustomer);
  }

  async update(id: number, change: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      return new NotFoundException(`Customer ${id} not found`);
    }
    this.customerRepository.merge(customer, change);
    return this.customerRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      return new NotFoundException(`Customer ${id} not found`);
    }
    return this.customerRepository.delete(id);
  }
}
