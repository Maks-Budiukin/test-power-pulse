import { ExercisesService } from './exercises.service';
import { ExercisesDto } from './dto/exercises.dto';
export declare class ExercisesController {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    getAll(queryDto: ExercisesDto): Promise<{
        exercises: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bodyPart: string;
            equipment: string;
            gifUrl: string;
            name: string;
            target: string;
            burnedCalories: number;
            time: number;
        }[];
        page: number;
        total: number;
    }>;
    importExercises(data: any): Promise<void>;
}
