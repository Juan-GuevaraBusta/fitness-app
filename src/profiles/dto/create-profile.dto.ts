import { IsString, IsEmail, IsNumber, IsNotEmpty, Min, Max, IsEnum } from 'class-validator';
import{ Transform, Type } from 'class-transformer';
import { profileGoal, activityLevel } from '../entities/profile.entity';

export class CreateProfileDto {
    @IsEnum(profileGoal, {
        message: 'El objetivo debe ser un objetivo valido'
    })
    goal: profileGoal;

    @IsEnum(activityLevel, {
        message: 'El nivel de actividad debe ser un nivel de actividad valido'
    })
    activityLevel: activityLevel;

    @IsNumber({}, {message: 'El userId debe ser un numero'})
    @Type(() => Number)
    @IsNotEmpty({message: 'El userId es requerido'})
    userId: number;

}
