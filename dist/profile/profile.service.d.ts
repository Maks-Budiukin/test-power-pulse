import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProfile(userId: any, data: CreateProfileDto): Promise<{
        userId: string;
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        height: string;
        currentWeight: number;
        desiredWeight: number;
        birthday: Date;
        avatarPath: string;
        blood: import(".prisma/client").$Enums.Blood;
        sex: import(".prisma/client").$Enums.Sex;
        levelActivity: import(".prisma/client").$Enums.LevelActivity;
    }>;
    updateProfile(id: string, data: UpdateProfileDto): Promise<{
        userId: string;
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        height: string;
        currentWeight: number;
        desiredWeight: number;
        birthday: Date;
        avatarPath: string;
        blood: import(".prisma/client").$Enums.Blood;
        sex: import(".prisma/client").$Enums.Sex;
        levelActivity: import(".prisma/client").$Enums.LevelActivity;
    }>;
    updateAvatar(id: string, avatarPath: string): Promise<{
        avatarPath: string;
    }>;
    getAvatarProfileIdByUserId(userId: string): Promise<{
        email: string;
        name: string;
        avatarPath: string;
        userId: string;
    }>;
    getProfileIdByUserId(userId: string): Promise<{
        calculate: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            dailyCalories: number;
            exerciseTime: number;
        };
        consumedProduct: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            date: Date;
            amount: number;
            calories: number;
            profileId: string;
            productId: string;
        }[];
        performedExercise: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            date: Date;
            time: number;
            calories: number;
            profileId: string;
            exerciseId: string;
        }[];
    } & {
        userId: string;
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        height: string;
        currentWeight: number;
        desiredWeight: number;
        birthday: Date;
        avatarPath: string;
        blood: import(".prisma/client").$Enums.Blood;
        sex: import(".prisma/client").$Enums.Sex;
        levelActivity: import(".prisma/client").$Enums.LevelActivity;
    }>;
}
