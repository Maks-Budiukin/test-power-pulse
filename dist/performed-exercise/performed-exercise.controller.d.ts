import { PerformedExerciseService } from './performed-exercise.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreatePerformedExerciseDto } from './dto/create-performed-exercise.dto';
export declare class PerformedExerciseController {
    private readonly performedExerciseService;
    readonly profileService: ProfileService;
    constructor(performedExerciseService: PerformedExerciseService, profileService: ProfileService);
    createConsumedProduct(data: CreatePerformedExerciseDto, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        time: number;
        calories: number;
        profileId: string;
        exerciseId: string;
    }>;
    deleteConsumedProduct(id: string): Promise<{
        data: string;
    }>;
}
