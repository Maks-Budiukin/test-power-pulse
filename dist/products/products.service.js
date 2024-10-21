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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("../pagination/pagination.service");
const prisma_service_1 = require("../prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma, paginationService) {
        this.prisma = prisma;
        this.paginationService = paginationService;
    }
    async getAll(dto, profileId) {
        const profile = await this.prisma.profile.findUnique({
            where: { id: profileId },
        });
        const profileBlood = await this.getBloodGroupNumber(profile.blood);
        const filters = this.createFilter(dto, profileBlood);
        const { skip, page, perPage } = await this.paginationService.getPagination(dto);
        const products = await this.prisma.products.findMany({
            where: filters,
            take: perPage,
            skip,
        });
        return {
            products,
            page,
            length: await this.prisma.products.count({
                where: filters,
            }),
        };
    }
    async importFoods(data) {
        for (const item of data) {
            delete item._id;
            await this.prisma.products.create({
                data: item,
            });
        }
    }
    createFilter(dto, profileBlood) {
        const filters = [];
        if (dto?.searchTerm) {
            filters.push(this.getSearchTermFilter(dto.searchTerm));
        }
        if (dto?.category) {
            filters.push(this.getCategoryFilter(dto.category));
        }
        if (dto?.allowed !== undefined && profileBlood !== null) {
            filters.push(this.getBloodGroupFilter(dto.allowed, profileBlood));
        }
        return filters.length ? { AND: filters } : {};
    }
    getSearchTermFilter(searchTerm) {
        const formattedSearch = searchTerm.replace(/-/g, ' ');
        return {
            OR: [
                {
                    title: {
                        contains: formattedSearch,
                        mode: 'insensitive',
                    },
                },
            ],
        };
    }
    getCategoryFilter(category) {
        const formattedCategory = category.replace(/-/g, ' ');
        return {
            OR: [
                {
                    category: {
                        contains: formattedCategory,
                        mode: 'insensitive',
                    },
                },
            ],
        };
    }
    getBloodGroupFilter(allowed, profileBlood) {
        return {
            groupBloodNotAllowed: {
                path: [profileBlood.toString()],
                equals: allowed === 'true',
            },
        };
    }
    async getBloodGroupNumber(bloodType) {
        switch (bloodType) {
            case 'FIRST_1':
                return 1;
            case 'SECOND_2':
                return 2;
            case 'THIRD_3':
                return 3;
            case 'FOURTH_4':
                return 4;
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pagination_service_1.PaginationService])
], ProductsService);
//# sourceMappingURL=products.service.js.map