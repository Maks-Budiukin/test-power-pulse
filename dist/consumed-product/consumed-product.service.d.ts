import { CreateConsumendProductDto } from './dto/create-consumend-product.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ConsumedProductService {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    createConsumedProduct(dto: CreateConsumendProductDto, profileId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        amount: number;
        calories: number;
        profileId: string;
        productId: string;
    }>;
    delete(id: string, date: string): Promise<{
        data: string;
    }>;
}
