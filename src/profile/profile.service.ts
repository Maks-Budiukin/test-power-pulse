import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(userId, data: CreateProfileDto) {
    const createdProfile = await this.prisma.profile.create({
      data: {
        user: { connect: { id: userId } },
        name: data.name,
        email: data.email,
        height: null,
        currentWeight: null,
        desiredWeight: null,
        birthday: null,
        avatarPath: null,
        blood: null,
        sex: null,
        levelActivity: null,
      },
    });
    return createdProfile;
  }

  async updateProfile(id: string, data: UpdateProfileDto) {
    const {
      name,
      email,
      height,
      currentWeight,
      desiredWeight,
      avatarPath,
      birthday,
      blood,
      sex,
      levelActivity,
    } = data;
    return await this.prisma.profile.update({
      where: { userId: id },
      data: {
        name,
        email,
        height,
        currentWeight:
          currentWeight !== null ? parseFloat(currentWeight) : null,
        desiredWeight:
          desiredWeight !== null ? parseFloat(desiredWeight) : null,
        avatarPath,
        birthday,
        blood: blood || null,
        levelActivity: levelActivity || null,
        sex: sex || null,
      },
    });
  }

  async updateAvatar(id: string, avatarPath: string) {
    const updatedProfile = await this.prisma.profile.update({
      where: { userId: id },
      data: { avatarPath },
    });

    return { avatarPath: updatedProfile.avatarPath };
  }

  async getAvatarProfileIdByUserId(userId: string) {
    return await this.prisma.profile.findUnique({
      where: { userId },
      select: {
        avatarPath: true,
        name: true,
        email: true,
        userId: true,
      },
    });
    
  }

  async getProfileIdByUserId(userId: string) {
    return await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        calculate: true,
        consumedProduct: true,
        performedExercise: true,
      },
    });
  }
}
