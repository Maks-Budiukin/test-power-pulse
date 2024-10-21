import { Injectable } from '@nestjs/common';
import { CreatePerformedExerciseDto } from './dto/create-performed-exercise.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PerformedExerciseService {
    constructor(readonly prisma: PrismaService){}

    async createPerformedExercise(dto: CreatePerformedExerciseDto, profileId: string){
      const { exerciseId, time, calories } = dto;
      const date = new Date();
    
    date.setUTCHours(0, 0, 0, 0);
    const roundedTime = parseFloat(time.toFixed(2))
    const formattedDate = date.toISOString();
      return await this.prisma.performedExercise.create({
        data: {
          exerciseId,
          date: formattedDate,
          time: roundedTime,
          calories,
          profileId,
        },
      });
    }
    

    async delete(id: string) {
         await this.prisma.performedExercise.delete({
          where: { id },
        });
        return { data: 'Success delete' };
    }
    
}
