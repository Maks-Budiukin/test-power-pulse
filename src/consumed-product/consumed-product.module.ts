import { Module } from '@nestjs/common';
import { ConsumedProductService } from './consumed-product.service';
import { ConsumedProductController } from './consumed-product.controller';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ConsumedProductController],
  providers: [ConsumedProductService, PrismaService, ProfileService],
})
export class ConsumedProductModule {}
