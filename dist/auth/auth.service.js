"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const argon2_1 = require("argon2");
const profile_service_1 = require("../profile/profile.service");
let AuthService = class AuthService {
    constructor(jwt, userService, profileService) {
        this.jwt = jwt;
        this.userService = userService;
        this.profileService = profileService;
        this.EXPIRE_DAY_REFRESH_TOKEN = 1;
        this.REFRESH_TOKEN_NAME = 'refreshToken';
    }
    async login(dto) {
        const { password, ...user } = await this.validateUser(dto);
        const tokens = await this.issueTokens(user.id);
        const profile = await this.profileService.getProfileIdByUserId(user.id);
        return {
            user: {
                ...user,
                avatarPath: profile.avatarPath || null
            },
            ...tokens,
        };
    }
    async register(dto) {
        const oldUser = await this.userService.getByEmail(dto.email);
        if (oldUser)
            throw new common_1.BadRequestException('User already exists');
        const { password, ...user } = await this.userService.create(dto);
        const tokens = await this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const { password, ...user } = await this.userService.getById(result.id);
        const tokens = await this.issueTokens(user.id);
        return {
            user: await this.returnUserFields(user),
            ...tokens,
        };
    }
    async returnUserFields(user) {
        const profile = await this.profileService.getProfileIdByUserId(user.id);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarPath: profile.avatarPath,
        };
    }
    async issueTokens(userId) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    async validateUser(dto) {
        const user = await this.userService.getByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid password');
        return user;
    }
    addRefreshTokenToResponse(res, refreshToken) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: process.env.ADD_REFRESH_TOKEN_TO_RESPONSE_DOMAIN,
            expires: expiresIn,
            secure: true,
            sameSite: 'none',
        });
    }
    removeRefreshTokenFromResponse(res) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: process.env.ADD_REFRESH_TOKEN_TO_RESPONSE_DOMAIN,
            expires: new Date(0),
            secure: true,
            sameSite: 'none',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        profile_service_1.ProfileService])
], AuthService);
//# sourceMappingURL=auth.service.js.map