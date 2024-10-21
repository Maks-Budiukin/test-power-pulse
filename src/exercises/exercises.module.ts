import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, PrismaService, PaginationService],
})
export class ExercisesModule {}
