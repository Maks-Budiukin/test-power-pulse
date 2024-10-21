import { Module } from '@nestjs/common';
import { DailyActivitiesService } from './daily-activities.service';
import { DailyActivitiesController } from './daily-activities.controller';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DailyActivitiesController],
  providers: [DailyActivitiesService, PrismaService, ProfileService],
})
export class DailyActivitiesModule {}
