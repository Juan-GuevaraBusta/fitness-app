import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
    @IsOptional()
    @IsString({ message: 'El nombre del ejercicio debe ser un texto' })
    name?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Las repeticiones deben ser un número' })
    @Min(1, { message: 'Las repeticiones deben ser al menos 1' })
    @Max(100, { message: 'Las repeticiones deben ser máximo 100' })
    @Type(() => Number)
    reps?: number;

    @IsOptional()
    @IsString({ message: 'La URL de la imagen debe ser un texto' })
    imageUrl?: string;
}