import { Injectable } from '@nestjs/common';
import { CreateConsumendProductDto } from './dto/create-consumend-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConsumedProductService {
  constructor(readonly prisma: PrismaService) {}

  async createConsumedProduct(
    dto: CreateConsumendProductDto,
    profileId: string,
  ) {
    const { productId, amount, calories } = dto;
    const date = new Date();
  
  date.setUTCHours(0, 0, 0, 0);
  
  const formattedDate = date.toISOString();
    return await this.prisma.consumedProduct.create({
      data: {
        productId,
        date: formattedDate,
        amount,
        calories,
        profileId,
      },
    });
  }

  async delete(id: string, date: string) {
    const isoDate = new Date(date).toISOString();
    const record = await this.prisma.consumedProduct.findFirst({
      where: {
        id: id,
        date: {
          equals: isoDate,
        },
      },
    });
  
    if (record) {
      await this.prisma.consumedProduct.delete({
        where: {
          id: id,
        },
      });
      return { data: 'Success delete' };
    } else {
      throw new Error('Record not found');
    }
  }
}
