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
import { CreateCategoryDto, updateCategoryDto } from './../dtos/category.dto';
import { CategoriesService } from './../services/categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':categorieId')
  getCategory(@Param('categorieId', ParseIntPipe) categorieId: number) {
    return this.categoriesService.findOne(+categorieId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':idCategory')
  updateCategory(
    @Param('idCategory', ParseIntPipe) idCategory: number,
    @Body() payload: updateCategoryDto,
  ) {
    return this.categoriesService.update(idCategory, payload);
  }

  @Delete(':id')
  datete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
