import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class AuthDtoRegister extends AuthDto {
  @IsString()
  name: string;
}
