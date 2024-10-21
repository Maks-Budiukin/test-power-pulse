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
exports.CalculateService = void 0;
const common_1 = require("@nestjs/common");
const daily_activities_service_1 = require("../daily-activities/daily-activities.service");
const prisma_service_1 = require("../prisma.service");
let CalculateService = class CalculateService {
    constructor(prisma, dailyActivitiesService) {
        this.prisma = prisma;
        this.dailyActivitiesService = dailyActivitiesService;
    }
    async currentDay(date, profileId) {
        const data = await this.dailyActivitiesService.getDailyActivities(date, profileId);
        const bmr = await this.bmrProfile(profileId);
        let caloriesConsumed = 0;
        let caloriesBurned = 0;
        let exerciseTimeSpent = 0;
        caloriesConsumed = data.consumedProducts.reduce((total, product) => {
            return total + product.calories;
        }, 0);
        caloriesBurned = data.performedExercises.reduce((total, exercise) => {
            exerciseTimeSpent += exercise.time;
            return total + exercise.calories;
        }, 0);
        const caloriesRemaining = bmr.dailyCalories - caloriesConsumed;
        const exerciseTimeRemaining = bmr.exerciseTime - exerciseTimeSpent;
        return {
            caloriesConsumed,
            caloriesBurned,
            caloriesRemaining,
            exerciseTimeRemaining
        };
    }
    async bmrProfile(profileId) {
        const profile = await this.prisma.profile.findUnique({
            where: { id: profileId },
        });
        if (!profile.birthday ||
            !profile.height ||
            !profile.currentWeight ||
            !profile.sex ||
            !profile.levelActivity) {
            return {
                profileId: profile.id,
                dailyCalories: 0,
                exerciseTime: 0,
            };
        }
        const age = this.calculateAge(profile.birthday);
        const heightCm = parseFloat(profile.height);
        const currentWeightKg = profile.currentWeight;
        const activityLevelCoefficient = this.getActivityLevelCoefficient(profile.levelActivity);
        let bmr;
        if (profile.sex === 'MALE') {
            bmr =
                (10 * currentWeightKg + 6.25 * heightCm - 5 * age + 5) *
                    activityLevelCoefficient;
        }
        else if (profile.sex === 'FEMALE') {
            bmr =
                (10 * currentWeightKg + 6.25 * heightCm - 5 * age - 161) *
                    activityLevelCoefficient;
        }
        else {
            return {
                profileId: profile.id,
                dailyCalories: 0,
                exerciseTime: 0,
            };
        }
        const exerciseTime = 110;
        await this.prisma.calculate.upsert({
            where: { profileId },
            update: {
                dailyCalories: Math.round(bmr),
                exerciseTime: exerciseTime,
            },
            create: {
                profile: { connect: { id: profileId } },
                dailyCalories: Math.round(bmr),
                exerciseTime: exerciseTime,
            },
        });
        return {
            profileId: profile.id,
            dailyCalories: Math.round(bmr),
            exerciseTime: exerciseTime,
        };
    }
    calculateAge(birthday) {
        if (!birthday) {
            return 0;
        }
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    getActivityLevelCoefficient(levelActivity) {
        const coefficients = {
            ONE: 1.2,
            TWO: 1.375,
            THREE: 1.55,
            FOUR: 1.725,
            FIVE: 1.9,
        };
        return coefficients[levelActivity] || 1.2;
    }
};
exports.CalculateService = CalculateService;
exports.CalculateService = CalculateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, daily_activities_service_1.DailyActivitiesService])
], CalculateService);
//# sourceMappingURL=calculate.service.js.map