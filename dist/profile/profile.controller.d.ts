import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProgileById(userId: string): Promise<{
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
    getAvatarProgileById(userId: string): Promise<{
        email: string;
        name: string;
        avatarPath: string;
        userId: string;
    }>;
    updateProfile(userId: string, data: UpdateProfileDto): Promise<{
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
    updateAvatar(userId: string, data: UpdateAvatarDto): Promise<{
        avatarPath: string;
    }>;
}
