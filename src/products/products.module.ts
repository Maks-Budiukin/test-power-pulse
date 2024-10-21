import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PaginationService } from 'src/pagination/pagination.service';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, PaginationService, ProfileService],
})
export class ProductsModule {}
