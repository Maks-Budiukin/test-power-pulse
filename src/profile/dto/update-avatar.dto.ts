import { IsString } from 'class-validator';

export class UpdateAvatarDto {
  @IsString()
  avatarPath?: string | null;
}
