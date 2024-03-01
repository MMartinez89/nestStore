import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './../entities/category.entity';
import { CreateCategoryDto, updateCategoryDto } from '../dtos/category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, change: updateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    this.categoryRepo.merge(category, change);
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return this.categoryRepo.delete(id);
  }
}
