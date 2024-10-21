import { PrismaService } from 'src/prisma.service';
export declare class DailyActivitiesService {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    getDailyActivities(date: Date, profileId: string): Promise<{
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
