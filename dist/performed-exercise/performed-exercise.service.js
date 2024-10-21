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
exports.PerformedExerciseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PerformedExerciseService = class PerformedExerciseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPerformedExercise(dto, profileId) {
        const { exerciseId, time, calories } = dto;
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        const roundedTime = parseFloat(time.toFixed(2));
        const formattedDate = date.toISOString();
        return await this.prisma.performedExercise.create({
            data: {
                exerciseId,
                date: formattedDate,
                time: roundedTime,
                calories,
                profileId,
            },
        });
    }
    async delete(id) {
        await this.prisma.performedExercise.delete({
            where: { id },
        });
        return { data: 'Success delete' };
    }
};
exports.PerformedExerciseService = PerformedExerciseService;
exports.PerformedExerciseService = PerformedExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PerformedExerciseService);
//# sourceMappingURL=performed-exercise.service.js.map