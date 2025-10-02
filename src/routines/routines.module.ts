import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesService } from './services/routines.service';
import { RoutinesController } from './controllers/routines.controller';
import { RoutineEntity } from './entities/routine.entity';
import { ExerciseEntity } from '../exercises/entities/exercise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutineEntity, ExerciseEntity])
  ],
  controllers: [RoutinesController],
  providers: [RoutinesService],
  exports: [RoutinesService],
})
export class RoutinesModule {}
