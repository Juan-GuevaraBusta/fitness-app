import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesService } from './services/exercises.service';
import { ExercisesController } from './controllers/exercises.controller';
import { ExerciseEntity } from './entities/exercise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseEntity])
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
