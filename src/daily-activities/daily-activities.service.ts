import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DailyActivitiesService {
  constructor(readonly prisma: PrismaService) {}

  async getDailyActivities(date: Date, profileId: string) {
 
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });


    const consumedProducts = await this.prisma.consumedProduct.findMany({
      where: {
        profileId,
        date: {
          equals: date,
        },
      },
      include: {
        product: true,
      },
    });
    const aggregatedProducts = consumedProducts.reduce((acc, item) => {
      const existingProduct = acc.find((p) => p.productId === item.productId);

      if (existingProduct) {
        existingProduct.amount += item.amount;
        existingProduct.calories += item.calories;
      } else {
        acc.push({
          ...item,
          amount: item.amount,
          calories: item.calories,
        });
      }

      return acc;
    }, []);

    const performedExercises = await this.prisma.performedExercise.findMany({
      where: {
        profileId,
        date: {
          equals: date,
        },
      },
      include: {
        exercise: true,
      },
    });

    const aggregatedExercises = performedExercises.reduce((acc, item) => {
      const existingExercise = acc.find((p) => p.exerciseId === item.exerciseId);

      if (existingExercise) {
        existingExercise.time += item.time;
        existingExercise.calories += item.calories;
      } else {
        acc.push({
          ...item,
          time: item.time,
          calories: item.calories,
        });
      }

      return acc;
    }, []);

    return {
      date,
      bloodProfile: profile.blood,
      profileId,
      consumedProducts: aggregatedProducts.map((product) => ({
        id: product.id,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        date: product.date,
        amount: product.amount,
        calories: product.calories,
        productId: product.productId,
        product: {
          id: product.product.id,
          title: product.product.title,
          category: product.product.category,
          groupBloodNotAllowed: product.product.groupBloodNotAllowed,
          calories: product.product.calories,
          weight: product.product.weight,
        },
      })),
      performedExercises: aggregatedExercises.map((exercise) => ({
        id: exercise.id,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
        date: exercise.date,
        time: exercise.time,
        calories: exercise.calories,
        exerciseId: exercise.exerciseId,
        exercise: {
          id: exercise.exercise.id,
          createdAt: exercise.exercise.createdAt,
          updatedAt: exercise.exercise.updatedAt,
          bodyPart: exercise.exercise.bodyPart,
          equipment: exercise.exercise.equipment,
          gifUrl: exercise.exercise.gifUrl,
          name: exercise.exercise.name,
          target: exercise.exercise.target,
          burnedCalories: exercise.exercise.burnedCalories,
          time: exercise.exercise.time,
        },
      })),
    };
  }
}
