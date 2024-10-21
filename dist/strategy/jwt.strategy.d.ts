import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userServive;
    constructor(configService: ConfigService, userServive: UserService);
    validate({ id }: Pick<User, 'id'>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        name: string;
        password: string;
        avatarPath: string;
    }>;
}
export {};
