import { Type } from "class-transformer";
import { IsDate, IsInt, IsString, Min } from "class-validator";

export class CreateConsumendProductDto {

    @IsInt()
    @Min(1)
    amount: number

    @IsInt()
    @Min(1)
    calories: number

    @IsString()
    productId: string
}