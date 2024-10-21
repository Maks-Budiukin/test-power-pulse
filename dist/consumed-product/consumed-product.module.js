"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumedProductModule = void 0;
const common_1 = require("@nestjs/common");
const consumed_product_service_1 = require("./consumed-product.service");
const consumed_product_controller_1 = require("./consumed-product.controller");
const profile_service_1 = require("../profile/profile.service");
const prisma_service_1 = require("../prisma.service");
let ConsumedProductModule = class ConsumedProductModule {
};
exports.ConsumedProductModule = ConsumedProductModule;
exports.ConsumedProductModule = ConsumedProductModule = __decorate([
    (0, common_1.Module)({
        controllers: [consumed_product_controller_1.ConsumedProductController],
        providers: [consumed_product_service_1.ConsumedProductService, prisma_service_1.PrismaService, profile_service_1.ProfileService],
    })
], ConsumedProductModule);
//# sourceMappingURL=consumed-product.module.js.map