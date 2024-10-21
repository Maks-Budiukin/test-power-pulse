import { CreateLookupDto } from './dto/create-lookup.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
export declare class LookupService {
    readonly prisma: PrismaService;
    readonly paginationService: PaginationService;
    constructor(prisma: PrismaService, paginationService: PaginationService);
    getAll(dto: CreateLookupDto): Promise<{
        lookups: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            filter: string;
            name: string;
            imgURL: string;
        }[];
        page: number;
    }>;
    importLookup(data: any): Promise<void>;
}
