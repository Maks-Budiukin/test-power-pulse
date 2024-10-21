import { CreatePerformedExerciseDto } from './dto/create-performed-exercise.dto';
import { PrismaService } from 'src/prisma.service';
export declare class PerformedExerciseService {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    createPerformedExercise(dto: CreatePerformedExerciseDto, profileId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        time: number;
        calories: number;
        profileId: string;
        exerciseId: string;
    }>;
    delete(id: string): Promise<{
        data: string;
    }>;
}
