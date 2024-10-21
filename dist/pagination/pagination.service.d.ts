import { PaginationDto } from './dto/pagination.dto';
export declare class PaginationService {
    getPagination(dto: PaginationDto, defaultPerPage?: number): {
        page: number;
        perPage: number;
        skip: number;
    };
}
