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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const daily_activities_service_1 = require("./daily-activities.service");
const profile_service_1 = require("../profile/profile.service");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const daily_activities_dto_1 = require("./dto/daily-activities.dto");
const user_decorator_1 = require("../auth/decorators/user.decorator");
let DailyActivitiesController = class DailyActivitiesController {
    constructor(dailyActivitiesService, profileService) {
        this.dailyActivitiesService = dailyActivitiesService;
        this.profileService = profileService;
    }
    async getDailyActivities(query, id) {
        const { id: profileId } = await this.profileService.getProfileIdByUserId(id);
        return await this.dailyActivitiesService.getDailyActivities(query.date, profileId);
    }
};
exports.DailyActivitiesController = DailyActivitiesController;
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [daily_activities_dto_1.DailyActivitiesDto, String]),
    __metadata("design:returntype", Promise)
], DailyActivitiesController.prototype, "getDailyActivities", null);
exports.DailyActivitiesController = DailyActivitiesController = __decorate([
    (0, common_1.Controller)('daily-activities'),
    __metadata("design:paramtypes", [daily_activities_service_1.DailyActivitiesService,
        profile_service_1.ProfileService])
], DailyActivitiesController);
//# sourceMappingURL=daily-activities.controller.js.map