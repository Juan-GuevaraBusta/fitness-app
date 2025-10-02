import { IsString, IsEmail, IsNumber, IsNotEmpty, Min, Max, IsEnum, IsBoolean, IsOptional} from 'class-validator';
import{ Transform, Type } from 'class-transformer';
import { dayOfWeek } from '../entities/routine.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';

export class UpdateRoutineDto extends PartialType(CreateRoutineDto) {
    @IsOptional()
    @IsEnum(dayOfWeek, {
        message: 'El dia de la semana debe ser un dia valido'
    })
    dayOfWeek?: dayOfWeek;

    @IsOptional()
    @IsBoolean({ message: 'El estado debe ser un booleano' })
    completed?: boolean;

    @IsOptional()
    @IsString({ message: 'Las notas deben ser un texto' })
    notes?: string;

    @IsOptional()
    @IsNumber({}, {message: 'El userId debe ser un numero'})
    @Type(() => Number)
    userId?: number;
}
