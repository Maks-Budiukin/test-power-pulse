import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { CalculateModule } from './calculate/calculate.module';
import { ProductsModule } from './products/products.module';
import { PaginationModule } from './pagination/pagination.module';
import { CategoryModule } from './category/category.module';
import { ExercisesModule } from './exercises/exercises.module';
import { LookupModule } from './lookup/lookup.module';
import { ConsumedProductModule } from './consumed-product/consumed-product.module';
import { PerformedExerciseModule } from './performed-exercise/performed-exercise.module';
import { DailyActivitiesModule } from './daily-activities/daily-activities.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProfileModule,
    CalculateModule,
    ProductsModule,
    PaginationModule,
    CategoryModule,
    ExercisesModule,
    LookupModule,
    ConsumedProductModule,
    PerformedExerciseModule,
    DailyActivitiesModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
