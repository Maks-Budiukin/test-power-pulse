import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PerformedExerciseService } from './performed-exercise.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ProfileService } from 'src/profile/profile.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CreatePerformedExerciseDto } from './dto/create-performed-exercise.dto';

@Controller('performed-exercise')
export class PerformedExerciseController {
  constructor(
    private readonly performedExerciseService: PerformedExerciseService,
    readonly profileService: ProfileService,
  ) {}

  @Post('')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth()
  async createConsumedProduct(
    @Body() data: CreatePerformedExerciseDto,
    @CurrentUser('id') id: string,
  ) {
    const { id: profileId } =
      await this.profileService.getProfileIdByUserId(id);
    return await this.performedExerciseService.createPerformedExercise(
      data,
      profileId,
    );
  }


  @Delete(':id')
  @HttpCode(200)
  @Auth()
  async deleteConsumedProduct(@Param('id') id: string){
    return await this.performedExerciseService.delete(id)
  }

}
