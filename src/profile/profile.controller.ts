import {
  Controller,
  HttpCode,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  @HttpCode(200)
  @Auth()
  async getProgileById(@CurrentUser('id') userId: string) {
    return await this.profileService.getProfileIdByUserId(userId);
  }

  @Get('avatar')
  @HttpCode(200)
  @Auth()
  async getAvatarProgileById(@CurrentUser('id') userId: string) {
    return await this.profileService.getAvatarProfileIdByUserId(userId);
  }


  @Put('')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() data: UpdateProfileDto,
  ) {
    
    return await this.profileService.updateProfile(userId, data);
  }

  @Put('avatar')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateAvatar(@CurrentUser('id') userId: string, @Body() data: UpdateAvatarDto){
    return await this.profileService.updateAvatar(userId, data.avatarPath)
  }
}
