import { IsBoolean, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/pagination/dto/pagination.dto";

export class ProductDto extends PaginationDto {
    @IsString()
    @IsOptional()
    allowed?: string

    @IsString()
    @IsOptional()
    searchTerm?: string

    @IsString()
    @IsOptional()
    category?: string
}
