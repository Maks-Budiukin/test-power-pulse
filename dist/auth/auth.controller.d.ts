/// <reference types="cookie-parser" />
import { AuthService } from './auth.service';
import { AuthDto, AuthDtoRegister } from './dto/auth.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: AuthDto, res: Response): Promise<{
        accessToken: string;
        user: {
            avatarPath: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            name: string;
        };
    }>;
    register(dto: AuthDtoRegister, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            name: string;
            avatarPath: string;
        };
    }>;
    logout(res: Response): Promise<boolean>;
    getNewTokens(req: Request, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            avatarPath: string;
        };
    }>;
}
