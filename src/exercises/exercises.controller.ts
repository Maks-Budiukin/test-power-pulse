import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesDto } from './dto/exercises.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Auth()
  @Get('')
  @HttpCode(200)
  async getAll(@Query() queryDto: ExercisesDto){
return await this.exercisesService.getAll(queryDto)
  }

  @Post('import')
  async importExercises(@Body() data: any){
    return await this.exercisesService.importExercises(data)
  }
}
