import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';

import { Product } from '../entities/products.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

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
  ) {}

  findAll() {
    //return this.products;

    // FORMA CON TYPEORM
    return this.productRepo.find();
  }

  async findOne(id: number) {
    //const product = this.products.find((item) => item.id === id);

    //FORMA CON TYPEORM
    const product = await this.productRepo.findOne({ where: { id } });
    console.log(product);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
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
    const newProduct = this.productRepo.create(payload);
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
    //actualiza la informacion con base al producto
    this.productRepo.merge(product, change);
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
