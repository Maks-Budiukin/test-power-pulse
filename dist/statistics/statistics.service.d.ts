import { PrismaService } from 'src/prisma.service';
export declare class StatisticsService {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    getAllInfo(): Promise<{
        totalVideoWorkouts: number;
        totalCaloriesBurned: number;
        totalUsers: number;
        totalHoursSpent: number;
        totalWorkoutsCompleted: number;
    }>;
    private getAllVideo;
    private getAllUser;
    private getTotalCaloriesBurned;
    private getTotalHoursSpent;
    private getTotalWorkoutsCompleted;
}
