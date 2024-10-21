import { ConsumedProductService } from './consumed-product.service';
import { CreateConsumendProductDto } from './dto/create-consumend-product.dto';
import { ProfileService } from 'src/profile/profile.service';
export declare class ConsumedProductController {
    private readonly consumedProductService;
    readonly profileService: ProfileService;
    constructor(consumedProductService: ConsumedProductService, profileService: ProfileService);
    createConsumedProduct(data: CreateConsumendProductDto, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        amount: number;
        calories: number;
        profileId: string;
        productId: string;
    }>;
    deleteConsumedProduct(id: string, date: string): Promise<{
        data: string;
    }>;
}
