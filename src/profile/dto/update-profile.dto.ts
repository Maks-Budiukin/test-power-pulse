import { IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';
import { Blood, LevelActivity, Sex } from '@prisma/client';
import { Type } from 'class-transformer';

// export enum Blood {
//   FIRST_1 = 1,
//   SECOND_2 = 2,
//   THIRD_3 = 3,
//   FOURTH_4 = 4,
// }

// export enum Sex {
//   MALE = 'male',
//   FEMALE = 'female',
// }

// export enum LevelActivity {
//   ONE = 1,
//   TWO = 2,
//   THREE = 3,
//   FOUR = 4,
//   FIVE = 5,
// }

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  height?: string;

  @IsOptional()
  @IsInt()
  @Min(35)
  currentWeight?: string;

  @IsOptional()
  @IsInt()
  @Min(35)
  desiredWeight?: string;

  @IsOptional()
  @IsString()
  avatarPath?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday?: Date;

  @IsOptional()
  @IsEnum(Blood)
  blood?: Blood;

  @IsOptional()
  @IsEnum(Sex)
  sex?: Sex;

  @IsOptional()
  @IsEnum(LevelActivity)
  levelActivity?: LevelActivity;
}
