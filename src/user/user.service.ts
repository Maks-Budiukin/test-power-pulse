import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDtoRegister } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private profileService: ProfileService,
  ) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      
    });
  }

  async create(dto: AuthDtoRegister) {
    const user = {
      email: dto.email,
      password: await hash(dto.password),
      name: dto.name,
    };

    const result = await this.prisma.user.create({
      data: user,
    });
    await this.profileService.createProfile(result.id, result);

    return result;
  }
}
