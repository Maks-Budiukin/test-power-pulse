import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-product.dto';
import { ProfileService } from 'src/profile/profile.service';
export declare class ProductsController {
    private readonly productsService;
    private profileService;
    constructor(productsService: ProductsService, profileService: ProfileService);
    getAll(queryDto: ProductDto, id: string): Promise<{
        products: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: number;
            calories: number;
            category: string;
            title: string;
            groupBloodNotAllowed: import(".prisma/client").Prisma.JsonValue;
            categoryId: string;
        }[];
        page: number;
        length: number;
    }>;
    importFoods(data: any): Promise<{
        message: string;
    }>;
}
