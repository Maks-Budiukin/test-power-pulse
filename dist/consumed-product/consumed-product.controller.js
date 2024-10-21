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
exports.ConsumedProductController = void 0;
const common_1 = require("@nestjs/common");
const consumed_product_service_1 = require("./consumed-product.service");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const create_consumend_product_dto_1 = require("./dto/create-consumend-product.dto");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const profile_service_1 = require("../profile/profile.service");
let ConsumedProductController = class ConsumedProductController {
    constructor(consumedProductService, profileService) {
        this.consumedProductService = consumedProductService;
        this.profileService = profileService;
    }
    async createConsumedProduct(data, id) {
        const { id: profileId } = await this.profileService.getProfileIdByUserId(id);
        return await this.consumedProductService.createConsumedProduct(data, profileId);
    }
    async deleteConsumedProduct(id, date) {
        return await this.consumedProductService.delete(id, date);
    }
};
exports.ConsumedProductController = ConsumedProductController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consumend_product_dto_1.CreateConsumendProductDto, String]),
    __metadata("design:returntype", Promise)
], ConsumedProductController.prototype, "createConsumedProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConsumedProductController.prototype, "deleteConsumedProduct", null);
exports.ConsumedProductController = ConsumedProductController = __decorate([
    (0, common_1.Controller)('consumed-product'),
    __metadata("design:paramtypes", [consumed_product_service_1.ConsumedProductService,
        profile_service_1.ProfileService])
], ConsumedProductController);
//# sourceMappingURL=consumed-product.controller.js.map