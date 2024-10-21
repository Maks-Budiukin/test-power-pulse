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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProfile(userId, data) {
        const createdProfile = await this.prisma.profile.create({
            data: {
                user: { connect: { id: userId } },
                name: data.name,
                email: data.email,
                height: null,
                currentWeight: null,
                desiredWeight: null,
                birthday: null,
                avatarPath: null,
                blood: null,
                sex: null,
                levelActivity: null,
            },
        });
        return createdProfile;
    }
    async updateProfile(id, data) {
        const { name, email, height, currentWeight, desiredWeight, avatarPath, birthday, blood, sex, levelActivity, } = data;
        return await this.prisma.profile.update({
            where: { userId: id },
            data: {
                name,
                email,
                height,
                currentWeight: currentWeight !== null ? parseFloat(currentWeight) : null,
                desiredWeight: desiredWeight !== null ? parseFloat(desiredWeight) : null,
                avatarPath,
                birthday,
                blood: blood || null,
                levelActivity: levelActivity || null,
                sex: sex || null,
            },
        });
    }
    async updateAvatar(id, avatarPath) {
        const updatedProfile = await this.prisma.profile.update({
            where: { userId: id },
            data: { avatarPath },
        });
        return { avatarPath: updatedProfile.avatarPath };
    }
    async getAvatarProfileIdByUserId(userId) {
        return await this.prisma.profile.findUnique({
            where: { userId },
            select: {
                avatarPath: true,
                name: true,
                email: true,
                userId: true,
            },
        });
    }
    async getProfileIdByUserId(userId) {
        return await this.prisma.profile.findUnique({
            where: { userId },
            include: {
                calculate: true,
                consumedProduct: true,
                performedExercise: true,
            },
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map