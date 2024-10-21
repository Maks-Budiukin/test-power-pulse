import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticsService {
    constructor(readonly prisma: PrismaService){}


    async getAllInfo(){
        const totalVideoWorkouts =  await this.getAllVideo()
        const totalCaloriesBurned =  await this.getTotalCaloriesBurned()
        const totalUsers =  await this.getAllUser()
        const totalHoursSpent =  await this.getTotalHoursSpent()
        const totalWorkoutsCompleted =  await this.getTotalWorkoutsCompleted()
    return {
        totalVideoWorkouts,
        totalCaloriesBurned,
        totalUsers,
        totalHoursSpent,
        totalWorkoutsCompleted
    }
    }

    private async getAllVideo(){
        return await this.prisma.exercise.count()
    }

    private async getAllUser(){
        return await this.prisma.user.count()
    }

    private async getTotalCaloriesBurned(){
        let totalCaloriesBurned = 0;

     const consumedProducts = await this.prisma.consumedProduct.findMany({})    
  

    for (const product of consumedProducts) {
        totalCaloriesBurned += product.calories;
      }
  
      return totalCaloriesBurned;  
    }
    private async getTotalHoursSpent(){
        let totalHoursSpent = 0
        
        const performedExercise = await this.prisma.performedExercise.findMany({})
        for(const timeExercise of performedExercise){
            totalHoursSpent += timeExercise.time / 3600
        }
        return totalHoursSpent;
    }
    private async getTotalWorkoutsCompleted(){
      return await this.prisma.performedExercise.count({})
    }
}
