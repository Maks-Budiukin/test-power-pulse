import { DailyActivitiesService } from './daily-activities.service';
import { ProfileService } from 'src/profile/profile.service';
import { DailyActivitiesDto } from './dto/daily-activities.dto';
export declare class DailyActivitiesController {
    private readonly dailyActivitiesService;
    readonly profileService: ProfileService;
    constructor(dailyActivitiesService: DailyActivitiesService, profileService: ProfileService);
    getDailyActivities(query: DailyActivitiesDto, id: string): Promise<{
        date: Date;
        bloodProfile: import(".prisma/client").$Enums.Blood;
        profileId: string;
        consumedProducts: {
            id: any;
            createdAt: any;
            updatedAt: any;
            date: any;
            amount: any;
            calories: any;
            productId: any;
            product: {
                id: any;
                title: any;
                category: any;
                groupBloodNotAllowed: any;
                calories: any;
                weight: any;
            };
        }[];
        performedExercises: {
            id: any;
            createdAt: any;
            updatedAt: any;
            date: any;
            time: any;
            calories: any;
            exerciseId: any;
            exercise: {
                id: any;
                createdAt: any;
                updatedAt: any;
                bodyPart: any;
                equipment: any;
                gifUrl: any;
                name: any;
                target: any;
                burnedCalories: any;
                time: any;
            };
        }[];
    }>;
}
