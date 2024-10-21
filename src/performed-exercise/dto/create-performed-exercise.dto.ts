import { IsInt, IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreatePerformedExerciseDto {

    @IsNumber()
    @IsPositive()  
    @Min(0) 
    time: number

    @IsInt()
    @Min(1)
    calories: number

    @IsString()
    exerciseId: string

}