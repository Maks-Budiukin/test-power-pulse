import { Blood, LevelActivity, Sex } from '@prisma/client';
export declare class UpdateProfileDto {
    name?: string;
    email?: string;
    height?: string;
    currentWeight?: string;
    desiredWeight?: string;
    avatarPath?: string;
    birthday?: Date;
    blood?: Blood;
    sex?: Sex;
    levelActivity?: LevelActivity;
}
