import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create-product.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    readonly prisma: PrismaService,
    readonly paginationService: PaginationService,
  ) {}

  async getAll(dto?: ProductDto, profileId?: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });

    const profileBlood = await this.getBloodGroupNumber(profile.blood);

    const filters = this.createFilter(dto, profileBlood);

    const { skip, page, perPage } =
      await this.paginationService.getPagination(dto);

    const products = await this.prisma.products.findMany({
      where: filters,
      take: perPage,
      skip,
    });

    return {
      products,
      page,
      length: await this.prisma.products.count({
        where: filters,
      }),
    };
   
  }

  async importFoods(data: any) {
    for (const item of data) {
      delete item._id;

      await this.prisma.products.create({
        data: item,
      });
    }
  }
  private createFilter(
    dto?: ProductDto,
    profileBlood?: number,
  ): Prisma.ProductsWhereInput {
    const filters: Prisma.ProductsWhereInput[] = [];

    if (dto?.searchTerm) {
      filters.push(this.getSearchTermFilter(dto.searchTerm));
    }

    if (dto?.category) {
      filters.push(this.getCategoryFilter(dto.category));
    }

    if (dto?.allowed !== undefined && profileBlood !== null) {
      filters.push(this.getBloodGroupFilter(dto.allowed, profileBlood));
    }

    return filters.length ? { AND: filters } : {};
  }

  private getSearchTermFilter(searchTerm: string): Prisma.ProductsWhereInput {
    const formattedSearch = searchTerm.replace(/-/g, ' ');
    return {
      OR: [
        {
          title: {
            contains: formattedSearch,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  private getCategoryFilter(category: string): Prisma.ProductsWhereInput {
    const formattedCategory = category.replace(/-/g, ' ');
  return {
    OR: [
      {
        category: {
          contains: formattedCategory,
          mode: 'insensitive',
        },
      },
    ],
  };
}

  private getBloodGroupFilter(
    allowed: string,
    profileBlood: number,
  ): Prisma.ProductsWhereInput {
    return {
      groupBloodNotAllowed: {
        path: [profileBlood.toString()],
        equals: allowed === 'true',
      },
    };
  }

  private async getBloodGroupNumber(bloodType: string): Promise<number> {
    switch (bloodType) {
      case 'FIRST_1':
        return 1;
      case 'SECOND_2':
        return 2;
      case 'THIRD_3':
        return 3;
      case 'FOURTH_4':
        return 4;
    }
  }
}
