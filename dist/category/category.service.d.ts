import { PrismaService } from 'src/prisma.service';
export declare class CategoryService {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
    }[]>;
    create(): Promise<void>;
}
