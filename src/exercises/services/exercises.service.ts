import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from '../entities/exercise.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExerciseEntity) private readonly exercisesRepo: Repository<ExerciseEntity>,
  ) {}

  async create(dto: CreateExerciseDto) {
    const exercise = this.exercisesRepo.create(dto);
    return this.exercisesRepo.save(exercise);
  }

  async findAll() {
    return this.exercisesRepo.find();
  }

  async findOne(id: number) {
    const exercise = await this.exercisesRepo.findOne({ where: { id } });
    if (!exercise) throw new NotFoundException('Exercise not found');
    return exercise;
  }

  async update(id: number, dto: UpdateExerciseDto) {
    const exercise = await this.findOne(id);
    Object.assign(exercise, dto);
    return this.exercisesRepo.save(exercise);
  }

  async remove(id: number) {
    const result = await this.exercisesRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Exercise not found');
  }
}
