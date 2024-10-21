import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-product.dto';
import { ProfileService } from 'src/profile/profile.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private profileService: ProfileService) {}

  @HttpCode(200)
  @Get('')
  @Auth()
  async getAll(@Query() queryDto: ProductDto, @CurrentUser('id') id: string) {
    const {id: profileId} = await this.profileService.getProfileIdByUserId(id);

    return await this.productsService.getAll(queryDto, profileId);
  }

  @Post('import')
  async importFoods(@Body() data: any) {
    await this.productsService.importFoods(data);
    return { message: 'Foods imported successfully' };
  }
  
}
