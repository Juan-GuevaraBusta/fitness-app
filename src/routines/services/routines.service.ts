import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineEntity } from '../entities/routine.entity';
import { ExerciseEntity } from '../../exercises/entities/exercise.entity';
import { CreateRoutineDto } from '../dto/create-routine.dto';
import { UpdateRoutineDto } from '../dto/update-routine.dto';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(RoutineEntity) private readonly routinesRepo: Repository<RoutineEntity>,
    @InjectRepository(ExerciseEntity) private readonly exercisesRepo: Repository<ExerciseEntity>,
  ) {}

  async create(dto: CreateRoutineDto) {
    const routine = this.routinesRepo.create(dto);
    return this.routinesRepo.save(routine);
  }

  async findAll(filters?: any) {
    return this.routinesRepo.find({ 
      where: filters, 
      relations: ['exercises'] 
    });
  }

  async findOne(id: number, options?: { withExercises?: boolean }) {
    const routine = await this.routinesRepo.findOne({
      where: { id },
      relations: options?.withExercises ? ['exercises'] : [],
    });
    if (!routine) throw new NotFoundException('Routine not found');
    return routine;
  }

  async update(id: number, dto: UpdateRoutineDto) {
    const routine = await this.findOne(id);
    Object.assign(routine, dto);
    return this.routinesRepo.save(routine);
  }

  async remove(id: number) {
    const result = await this.routinesRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Routine not found');
  }

  async markComplete(id: number) {
    const routine = await this.findOne(id);
    routine.completed = true;
    return this.routinesRepo.save(routine);
  }

  async addExercise(routineId: number, exerciseId: number) {
    const routine = await this.findOne(routineId, { withExercises: true });
    const exercise = await this.exercisesRepo.findOne({ where: { id: exerciseId } });
    if (!exercise) throw new NotFoundException('Exercise not found');
    
    // Evitar duplicados
    if (!routine.exercises.find(ex => ex.id === exerciseId)) {
      routine.exercises.push(exercise);
      return this.routinesRepo.save(routine);
    }
    return routine;
  }

  async removeExercise(routineId: number, exerciseId: number) {
    const routine = await this.findOne(routineId, { withExercises: true });
    routine.exercises = routine.exercises.filter((ex) => ex.id !== exerciseId);
    return this.routinesRepo.save(routine);
  }
}
