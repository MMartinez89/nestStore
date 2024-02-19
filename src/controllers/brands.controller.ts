import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDtop, UpdateBrandDto } from 'src/dtos/brand.dto';
import { BrandService } from 'src/services/brand/brand.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandService) {}

  @Get()
  findAll() {
    return this.brandsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateBrandDtop) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payLoad: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payLoad);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(id);
  }
}
