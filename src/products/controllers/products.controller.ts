import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  //Query,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  Query,
  //Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from './../dtos/products.dto';
//import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productServive: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductDto) {
    return this.productServive.findAll(params);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  //getOne(@Res() response: Response, @Param('productId') productId: string) {
  //response.status(200).send({
  //  message: `product ${productId}`,
  //});
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productServive.findOne(productId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto) {
    return this.productServive.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productServive.update(id, payload);
  }

  @Put(':id/category/:idCategories')
  addCatehoriesToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('idCategories', ParseIntPipe) idCategories: number,
  ) {
    return this.productServive.addCategoryToProduct(id, idCategories);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productServive.remove(+id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productServive.removeCategoryByProduct(id, categoryId);
  }
}
