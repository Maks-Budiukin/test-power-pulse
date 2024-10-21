import { Injectable } from '@nestjs/common';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LookupService {
  constructor(
    readonly prisma: PrismaService,
    readonly paginationService: PaginationService,
  ) {}

  async getAll(dto: CreateLookupDto) {
    const { skip, perPage, page } =
      await this.paginationService.getPagination(dto);
    const lookups = await this.prisma.lookup.findMany({
      skip,
      take: perPage,
    });
    return {
      lookups,
      page,
    };
  }

  async importLookup(data: any) {
    for (const item of data) {
      // Удаляем _id перед вставкой
      delete item._id;

      // Вставляем запись в базу данных
      await this.prisma.lookup.create({
        data: item,
      });
    }
  }
}
