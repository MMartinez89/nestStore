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
  //Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';
//import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productServive: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts() //@Query('limit') limit = 100,
  //@Query('offset') offset = 0,
  //@Query('brand') brand: string,
  {
    //return {
    //  message: `product limit => ${limit} offset => ${offset} brand ${brand}`,
    //};
    return this.productServive.findAll();
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
    //return {
    //  message: 'accion de crear',
    //  payload,
    //};
    return this.productServive.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productServive.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productServive.remove(+id);
  }
}
