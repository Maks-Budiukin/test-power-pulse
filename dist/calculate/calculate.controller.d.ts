import { CalculateService } from './calculate.service';
import { ProfileService } from 'src/profile/profile.service';
import { DailyActivitiesService } from 'src/daily-activities/daily-activities.service';
import { CalculateDto } from './dto/calculate.dto';
export declare class CalculateController {
    private readonly calculateService;
    readonly profileService: ProfileService;
    readonly dailyActivitiesService: DailyActivitiesService;
    constructor(calculateService: CalculateService, profileService: ProfileService, dailyActivitiesService: DailyActivitiesService);
    getCalculateBmr(id: string): Promise<{
        profileId: string;
        dailyCalories: number;
        exerciseTime: number;
    }>;
    getCurrentDay(query: CalculateDto, id: string): Promise<{
        caloriesConsumed: number;
        caloriesBurned: number;
        caloriesRemaining: number;
        exerciseTimeRemaining: number;
    }>;
}
