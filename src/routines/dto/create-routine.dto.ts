import { IsString, IsEmail, IsNumber, IsNotEmpty, Min, Max, IsEnum, IsBoolean, IsOptional} from 'class-validator';
import{ Transform, Type } from 'class-transformer';
import { dayOfWeek } from '../entities/routine.entity';

export class CreateRoutineDto {
    @IsEnum(dayOfWeek, {
        message: 'El dia de la semana debe ser un dia valido'
    })
    dayOfWeek: dayOfWeek;

    @IsBoolean({ message: 'El estado debe ser un booleano' })
    completed: boolean;

    @IsOptional()
    @IsString({ message: 'Las notas deben ser un texto' })
    notes?: string;

    @IsNumber({}, {message: 'El userId debe ser un numero'})
    @Type(() => Number)
    @IsNotEmpty({message: 'El userId es requerido'})
    userId: number;
}
