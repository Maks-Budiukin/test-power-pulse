import { Injectable } from '@nestjs/common';
import { LevelActivity } from '@prisma/client';
import { DailyActivitiesService } from 'src/daily-activities/daily-activities.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CalculateService {
  constructor(readonly prisma: PrismaService, readonly dailyActivitiesService: DailyActivitiesService) {}

async currentDay(date: Date,profileId: string){
const data = await this.dailyActivitiesService.getDailyActivities(date, profileId)
const bmr = await this.bmrProfile(profileId)

let caloriesConsumed = 0;
  let caloriesBurned = 0;
  let exerciseTimeSpent = 0;


  caloriesConsumed = data.consumedProducts.reduce((total, product) => {
    return total + product.calories; 
  }, 0);


  caloriesBurned = data.performedExercises.reduce((total, exercise) => {
    exerciseTimeSpent += exercise.time;
    return total + exercise.calories; 
  }, 0);

 
  const caloriesRemaining = bmr.dailyCalories - caloriesConsumed;


  const exerciseTimeRemaining = bmr.exerciseTime - exerciseTimeSpent;


  return {
    caloriesConsumed,    // caloriesConsumed
    caloriesBurned,      // caloriesBurned
    caloriesRemaining,   // caloriesRemaining
    exerciseTimeRemaining  // exerciseTimeRemaining
  };
}

  async bmrProfile(profileId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });
    
    if (
      !profile.birthday ||
      !profile.height ||
      !profile.currentWeight ||
      !profile.sex ||
      !profile.levelActivity
    ) {
      return {
        profileId: profile.id,
        dailyCalories: 0,
        exerciseTime: 0,
      };
    }

    const age = this.calculateAge(profile.birthday);
    const heightCm = parseFloat(profile.height);
    const currentWeightKg = profile.currentWeight;
    const activityLevelCoefficient = this.getActivityLevelCoefficient(
      profile.levelActivity,
    );

    let bmr: number;
    if (profile.sex === 'MALE') {
      bmr =
        (10 * currentWeightKg + 6.25 * heightCm - 5 * age + 5) *
        activityLevelCoefficient;
    } else if (profile.sex === 'FEMALE') {
      bmr =
        (10 * currentWeightKg + 6.25 * heightCm - 5 * age - 161) *
        activityLevelCoefficient;
    } else {
      return {
        profileId: profile.id,
        dailyCalories: 0,
        exerciseTime: 0,
      };
    }

    const exerciseTime = 110;

    await this.prisma.calculate.upsert({
      where: { profileId },
      update: {
        dailyCalories: Math.round(bmr),
        exerciseTime: exerciseTime,
      },
      create: {
        profile: { connect: { id: profileId } },
        dailyCalories: Math.round(bmr),
        exerciseTime: exerciseTime,
      },
    });

    return {
      profileId: profile.id,
      dailyCalories: Math.round(bmr),
      exerciseTime: exerciseTime,
    };
  }

  private calculateAge(birthday?: Date): number {
    if (!birthday) {
      return 0; 
    }

    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  private getActivityLevelCoefficient(levelActivity: LevelActivity): number {
    const coefficients = {
      ONE: 1.2,
      TWO: 1.375,
      THREE: 1.55,
      FOUR: 1.725,
      FIVE: 1.9,
    };
    return coefficients[levelActivity] || 1.2;
  }
}
