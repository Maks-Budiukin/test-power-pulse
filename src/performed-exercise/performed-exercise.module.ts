import { Module } from '@nestjs/common';
import { PerformedExerciseService } from './performed-exercise.service';
import { PerformedExerciseController } from './performed-exercise.controller';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PerformedExerciseController],
  providers: [PerformedExerciseService, PrismaService, ProfileService],
})
export class PerformedExerciseModule {}
