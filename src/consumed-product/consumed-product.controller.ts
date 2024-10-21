import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConsumedProductService } from './consumed-product.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateConsumendProductDto } from './dto/create-consumend-product.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ProfileService } from 'src/profile/profile.service';

@Controller('consumed-product')
export class ConsumedProductController {
  constructor(
    private readonly consumedProductService: ConsumedProductService,
    readonly profileService: ProfileService,
  ) {}

  @Post('')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth()
  async createConsumedProduct(
    @Body() data: CreateConsumendProductDto,
    @CurrentUser('id') id: string,
  ) {
    const { id: profileId } =
      await this.profileService.getProfileIdByUserId(id);
      return await this.consumedProductService.createConsumedProduct(data, profileId)
  }


  @Delete(':id')
  @HttpCode(200)
  @Auth()
  async deleteConsumedProduct(@Param('id') id: string, @Query('date') date: string,){
    return await this.consumedProductService.delete(id, date)
  }

}
