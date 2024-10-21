import { Controller, HttpCode, Post, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Post()
  @HttpCode(200)
  async create() {
    return await this.categoryService.create();
  }

  
}
