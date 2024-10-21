import { Module } from '@nestjs/common';
import { LookupService } from './lookup.service';
import { LookupController } from './lookup.controller';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LookupController],
  providers: [LookupService, PrismaService, PaginationService],
})
export class LookupModule {}
