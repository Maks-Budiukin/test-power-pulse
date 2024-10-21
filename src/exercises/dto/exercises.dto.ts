import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';

export class ExercisesDto extends PaginationDto {
  @IsOptional()
  @IsString()
  bodyPart: string;

  @IsOptional()
  @IsString()
  muscles: string;

  @IsOptional()
  @IsString()
  equipment: string;
}
