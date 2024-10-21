"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyActivitiesModule = void 0;
const common_1 = require("@nestjs/common");
const daily_activities_service_1 = require("./daily-activities.service");
const daily_activities_controller_1 = require("./daily-activities.controller");
const profile_service_1 = require("../profile/profile.service");
const prisma_service_1 = require("../prisma.service");
let DailyActivitiesModule = class DailyActivitiesModule {
};
exports.DailyActivitiesModule = DailyActivitiesModule;
exports.DailyActivitiesModule = DailyActivitiesModule = __decorate([
    (0, common_1.Module)({
        controllers: [daily_activities_controller_1.DailyActivitiesController],
        providers: [daily_activities_service_1.DailyActivitiesService, prisma_service_1.PrismaService, profile_service_1.ProfileService],
    })
], DailyActivitiesModule);
//# sourceMappingURL=daily-activities.module.js.map