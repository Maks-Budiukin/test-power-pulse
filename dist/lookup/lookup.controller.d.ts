import { LookupService } from './lookup.service';
import { CreateLookupDto } from './dto/create-lookup.dto';
export declare class LookupController {
    private readonly lookupService;
    constructor(lookupService: LookupService);
    getAll(queryParam: CreateLookupDto): Promise<{
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
