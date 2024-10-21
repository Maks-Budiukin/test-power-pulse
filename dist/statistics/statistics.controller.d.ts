import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getAll(): Promise<{
        totalVideoWorkouts: number;
        totalCaloriesBurned: number;
        totalUsers: number;
        totalHoursSpent: number;
        totalWorkoutsCompleted: number;
    }>;
}
