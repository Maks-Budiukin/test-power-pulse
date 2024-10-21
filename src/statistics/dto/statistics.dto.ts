import { IsInt } from 'class-validator';

export class Statistics {
  @IsInt()
  totalVideoWorkouts: number;

  @IsInt()
  totalCaloriesBurned: number;

  @IsInt()
  totalUsers: number;

  @IsInt()
  totalHoursSpent: number;

  @IsInt()
  totalWorkoutsCompleted: number;
}
