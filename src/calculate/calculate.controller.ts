import {
  Controller,
  Get,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { ProfileService } from 'src/profile/profile.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { DailyActivitiesService } from 'src/daily-activities/daily-activities.service';
import { CalculateDto } from './dto/calculate.dto';

@Controller('calculate')
export class CalculateController {
  constructor(
    private readonly calculateService: CalculateService,
    readonly profileService: ProfileService,
    readonly dailyActivitiesService: DailyActivitiesService,
  ) {}

  @Get('bmr')
  @HttpCode(200)
  @Auth()
  async getCalculateBmr(@CurrentUser('id') id: string) {
    const { id: profileId } =
      await this.profileService.getProfileIdByUserId(id);
    return await this.calculateService.bmrProfile(profileId);
  }

  @Get('current-day')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Auth()
  async getCurrentDay(@Query() query: CalculateDto,
    @CurrentUser('id') id: string) {
    const { id: profileId } =
      await this.profileService.getProfileIdByUserId(id);
     return await this.calculateService.currentDay(query.date, profileId)
  }
}
