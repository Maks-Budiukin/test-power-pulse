import { Injectable } from '@nestjs/common';
import { ExercisesDto } from './dto/exercises.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(
    readonly prisma: PrismaService,
    readonly paginationService: PaginationService,
  ) {}

  async getAll(dto: ExercisesDto) {
    const { bodyPart, muscles, equipment } = dto;
    const { skip, page, perPage } = await this.paginationService.getPagination(dto);

    let whereClause: Prisma.ExerciseWhereInput = {};

    if (bodyPart) {
        whereClause.bodyPart = bodyPart.replace(/-/g, ' ');
    } else if (muscles) {
        whereClause.target = muscles.replace(/-/g, ' '); 
    } else if (equipment) {
        whereClause.equipment = equipment.replace(/-/g, ' '); 
    }

    const exercises = await this.prisma.exercise.findMany({
        skip,
        take: perPage,
        where: whereClause,
    });

    const total = await this.prisma.exercise.count({
      where: whereClause,
  });

    return {
        exercises,
        page,
        total,
    };
  }

  async importExercises(data: any) {
    for (const item of data) {
      // Удаляем _id перед вставкой
      delete item._id;

      // Вставляем запись в базу данных
      await this.prisma.exercise.create({
        data: item,
      });
    }
  }
}
