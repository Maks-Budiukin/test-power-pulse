import {
  Controller,
  Get,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { DailyActivitiesService } from './daily-activities.service';
import { ProfileService } from 'src/profile/profile.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { DailyActivitiesDto } from './dto/daily-activities.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('daily-activities')
export class DailyActivitiesController {
  constructor(
    private readonly dailyActivitiesService: DailyActivitiesService,
    readonly profileService: ProfileService,
  ) {}

  @Get('')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Auth()
  async getDailyActivities(
    @Query() query: DailyActivitiesDto,
    @CurrentUser('id') id: string,
  ) {
    const { id: profileId } =
      await this.profileService.getProfileIdByUserId(id);
    return await this.dailyActivitiesService.getDailyActivities(
      query.date,
      profileId,
    );
  }
}
