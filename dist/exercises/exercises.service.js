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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("../pagination/pagination.service");
const prisma_service_1 = require("../prisma.service");
let ExercisesService = class ExercisesService {
    constructor(prisma, paginationService) {
        this.prisma = prisma;
        this.paginationService = paginationService;
    }
    async getAll(dto) {
        const { bodyPart, muscles, equipment } = dto;
        const { skip, page, perPage } = await this.paginationService.getPagination(dto);
        let whereClause = {};
        if (bodyPart) {
            whereClause.bodyPart = bodyPart.replace(/-/g, ' ');
        }
        else if (muscles) {
            whereClause.target = muscles.replace(/-/g, ' ');
        }
        else if (equipment) {
            whereClause.equipment = equipment.replace(/-/g, ' ');
        }
        const exercises = await this.prisma.exercise.findMany({
            skip,
            take: perPage,
            where: whereClause,
        });
        const total = await this.prisma.exercise.count({
            where: whereClause,
        });
        return {
            exercises,
            page,
            total,
        };
    }
    async importExercises(data) {
        for (const item of data) {
            delete item._id;
            await this.prisma.exercise.create({
                data: item,
            });
        }
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pagination_service_1.PaginationService])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map