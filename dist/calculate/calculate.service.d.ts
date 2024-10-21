import { DailyActivitiesService } from 'src/daily-activities/daily-activities.service';
import { PrismaService } from 'src/prisma.service';
export declare class CalculateService {
    readonly prisma: PrismaService;
    readonly dailyActivitiesService: DailyActivitiesService;
    constructor(prisma: PrismaService, dailyActivitiesService: DailyActivitiesService);
    currentDay(date: Date, profileId: string): Promise<{
        caloriesConsumed: number;
        caloriesBurned: number;
        caloriesRemaining: number;
        exerciseTimeRemaining: number;
    }>;
    bmrProfile(profileId: string): Promise<{
        profileId: string;
        dailyCalories: number;
        exerciseTime: number;
    }>;
    private calculateAge;
    private getActivityLevelCoefficient;
}
