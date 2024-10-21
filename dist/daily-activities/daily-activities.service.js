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
exports.DailyActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DailyActivitiesService = class DailyActivitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDailyActivities(date, profileId) {
        const profile = await this.prisma.profile.findUnique({
            where: { id: profileId },
        });
        const consumedProducts = await this.prisma.consumedProduct.findMany({
            where: {
                profileId,
                date: {
                    equals: date,
                },
            },
            include: {
                product: true,
            },
        });
        const aggregatedProducts = consumedProducts.reduce((acc, item) => {
            const existingProduct = acc.find((p) => p.productId === item.productId);
            if (existingProduct) {
                existingProduct.amount += item.amount;
                existingProduct.calories += item.calories;
            }
            else {
                acc.push({
                    ...item,
                    amount: item.amount,
                    calories: item.calories,
                });
            }
            return acc;
        }, []);
        const performedExercises = await this.prisma.performedExercise.findMany({
            where: {
                profileId,
                date: {
                    equals: date,
                },
            },
            include: {
                exercise: true,
            },
        });
        const aggregatedExercises = performedExercises.reduce((acc, item) => {
            const existingExercise = acc.find((p) => p.exerciseId === item.exerciseId);
            if (existingExercise) {
                existingExercise.time += item.time;
                existingExercise.calories += item.calories;
            }
            else {
                acc.push({
                    ...item,
                    time: item.time,
                    calories: item.calories,
                });
            }
            return acc;
        }, []);
        return {
            date,
            bloodProfile: profile.blood,
            profileId,
            consumedProducts: aggregatedProducts.map((product) => ({
                id: product.id,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                date: product.date,
                amount: product.amount,
                calories: product.calories,
                productId: product.productId,
                product: {
                    id: product.product.id,
                    title: product.product.title,
                    category: product.product.category,
                    groupBloodNotAllowed: product.product.groupBloodNotAllowed,
                    calories: product.product.calories,
                    weight: product.product.weight,
                },
            })),
            performedExercises: aggregatedExercises.map((exercise) => ({
                id: exercise.id,
                createdAt: exercise.createdAt,
                updatedAt: exercise.updatedAt,
                date: exercise.date,
                time: exercise.time,
                calories: exercise.calories,
                exerciseId: exercise.exerciseId,
                exercise: {
                    id: exercise.exercise.id,
                    createdAt: exercise.exercise.createdAt,
                    updatedAt: exercise.exercise.updatedAt,
                    bodyPart: exercise.exercise.bodyPart,
                    equipment: exercise.exercise.equipment,
                    gifUrl: exercise.exercise.gifUrl,
                    name: exercise.exercise.name,
                    target: exercise.exercise.target,
                    burnedCalories: exercise.exercise.burnedCalories,
                    time: exercise.exercise.time,
                },
            })),
        };
    }
};
exports.DailyActivitiesService = DailyActivitiesService;
exports.DailyActivitiesService = DailyActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DailyActivitiesService);
//# sourceMappingURL=daily-activities.service.js.map