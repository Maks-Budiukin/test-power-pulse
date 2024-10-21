import { PaginationDto } from "src/pagination/dto/pagination.dto";
export declare class ProductDto extends PaginationDto {
    allowed?: string;
    searchTerm?: string;
    category?: string;
}
