import { IsEmail, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
