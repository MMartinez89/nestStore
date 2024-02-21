import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDtop, UpdateBrandDto } from './../dtos/brand.dto';
import { Brand } from './../entities/brand.entity';

@Injectable()
export class BrandService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'jdcnnkdc',
    },
  ];

  getAll() {
    return this.brands;
  }

  getOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDtop) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.getOne(id);
    if (brand) {
      const index = this.brands.findIndex((item) => item.id === id);
      this.brands[index] = {
        ...brand,
        ...payload,
      };
      return this.brands[index];
    }
    return false;
  }

  remove(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
