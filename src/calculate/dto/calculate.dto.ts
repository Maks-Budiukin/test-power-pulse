import { Transform } from "class-transformer";
import { IsDate } from "class-validator";

export class CalculateDto {
    @Transform(({ value }) => {
      const [day, month, year] = value.split('.').map(Number);
      return new Date(Date.UTC(year, month - 1, day));
    })
    @IsDate()
    date: Date;
  
  }
  