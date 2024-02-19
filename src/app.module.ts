import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products/products.service';
import { BrandService } from './services/brand/brand.service';
import { CategoriesService } from './services/categories/categories/categories.service';
import { BrandsController } from './controllers/brands.controller';
import { CustomerService } from './services/customer/customer.service';
import { CustomerController } from './controllers/customer.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    BrandsController,
    CustomerController,
  ],
  providers: [
    AppService,
    ProductsService,
    BrandService,
    CategoriesService,
    CustomerService,
  ],
})
export class AppModule {}
