import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(readonly prisma: PrismaService) {}


  async getAll(){
    return await this.prisma.category.findMany()
  }
  
  async create() {
    
    const products = await this.prisma.products.findMany({
      select: {
        category: true,
      },
    });
    const uniqueCategories = new Set(products.map(product => product.category));
    const categoriesArray = Array.from(uniqueCategories);
    for (const category of categoriesArray) {
      if (category) {
        await this.prisma.category.create({
          data: {
            name: category,
            slug: category.toLowerCase().replace(/\s+/g, '-')
          },
        });
      }
    }
  }
}
