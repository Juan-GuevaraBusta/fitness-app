import { IsEnum, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { profileGoal, activityLevel } from '../entities/profile.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsOptional()
    @IsEnum(profileGoal, {
        message: 'El objetivo debe ser un objetivo valido'
    })
    goal?: profileGoal;

    @IsOptional()
    @IsEnum(activityLevel, {
        message: 'El nivel de actividad debe ser un nivel de actividad valido'
    })
    activityLevel?: activityLevel;
}
