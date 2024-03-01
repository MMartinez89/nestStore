import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDtop, UpdateBrandDto } from './../dtos/brand.dto';
import { Brand } from './../entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  getAll() {
    return this.brandRepo.find();
  }

  async getOne(id: number) {
    const brand = await this.brandRepo.findOne({
      relations: ['products'],
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDtop) {
    const newBrand = this.brandRepo.create(payload);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, change: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    this.brandRepo.merge(brand, change);
    return this.brandRepo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return this.brandRepo.delete(id);
  }
}
