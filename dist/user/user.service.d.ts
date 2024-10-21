import { AuthDtoRegister } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { ProfileService } from 'src/profile/profile.service';
export declare class UserService {
    private prisma;
    private profileService;
    constructor(prisma: PrismaService, profileService: ProfileService);
    getById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        name: string;
        password: string;
        avatarPath: string;
    }>;
    getByEmail(email: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        name: string;
        password: string;
        avatarPath: string;
    }>;
    create(dto: AuthDtoRegister): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        name: string;
        password: string;
        avatarPath: string;
    }>;
}
