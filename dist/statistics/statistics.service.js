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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StatisticsService = class StatisticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllInfo() {
        const totalVideoWorkouts = await this.getAllVideo();
        const totalCaloriesBurned = await this.getTotalCaloriesBurned();
        const totalUsers = await this.getAllUser();
        const totalHoursSpent = await this.getTotalHoursSpent();
        const totalWorkoutsCompleted = await this.getTotalWorkoutsCompleted();
        return {
            totalVideoWorkouts,
            totalCaloriesBurned,
            totalUsers,
            totalHoursSpent,
            totalWorkoutsCompleted
        };
    }
    async getAllVideo() {
        return await this.prisma.exercise.count();
    }
    async getAllUser() {
        return await this.prisma.user.count();
    }
    async getTotalCaloriesBurned() {
        let totalCaloriesBurned = 0;
        const consumedProducts = await this.prisma.consumedProduct.findMany({});
        for (const product of consumedProducts) {
            totalCaloriesBurned += product.calories;
        }
        return totalCaloriesBurned;
    }
    async getTotalHoursSpent() {
        let totalHoursSpent = 0;
        const performedExercise = await this.prisma.performedExercise.findMany({});
        for (const timeExercise of performedExercise) {
            totalHoursSpent += timeExercise.time / 3600;
        }
        return totalHoursSpent;
    }
    async getTotalWorkoutsCompleted() {
        return await this.prisma.performedExercise.count({});
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map