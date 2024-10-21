import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (params.model === 'Profile' && params.action === 'update') {
        const updatedProfile = await next(params);

        if (params.args.data.email) {
          await this.user.update({
            where: { id: updatedProfile.userId },
            data: {
              email: params.args.data.email,
              name: params.args.data.name,
            },
          });
        }

        return updatedProfile;
      }

      return next(params);
    });
  }
}
