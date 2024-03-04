import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from '../entities/products.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { BrandService } from './brand.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  /* private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'description',
      price: 123,
      stock: 12,
      image: 'askmdsldk',
    },
  ];*/

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    private brandService: BrandService,
  ) {}

  findAll() {
    //return this.products;

    // FORMA CON TYPEORM
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    //const product = this.products.find((item) => item.id === id);

    //FORMA CON TYPEORM
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    /*this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;*/

    //forma de hacerlo por cassa campo
    //const newProduct = new Product();
    //newProduct.name = payload.name;

    // FORMA CON TYPEORM
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, change: UpdateProductDto) {
    /*const product = this.findOne(+id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === +id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;*/
    // FORMA CON TYPEORM
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    if (change.brandId) {
      const brand = await this.brandService.getOne(change.brandId);
      product.brand = brand;
    }
    if (change.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(change.categoriesIds),
      });
      product.categories = categories;
    }
    //actualiza la informacion con base al producto
    this.productRepo.merge(product, change);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    //con js
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number){
    // eslint-disable-next-line prettier/prettier
    const product = await this.productRepo.findOne({ where: { id: productId } ,relations: ['categories']});
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    /*const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    this.products.splice(index, 1);
    return true;*/

    // FORMA CON TYPEORM
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`No existe`);
    }
    return this.productRepo.delete(id);
  }
}
