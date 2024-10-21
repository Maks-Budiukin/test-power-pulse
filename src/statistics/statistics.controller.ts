import { Controller, Get, HttpCode } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @HttpCode(200)
  async getAll(){
    return await this.statisticsService.getAllInfo()
  }
}
