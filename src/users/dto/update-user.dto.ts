import { IsString, IsEmail, IsNumber, IsNotEmpty, Min, Max, IsOptional, MinLength, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'El email debe ser un email válido' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial'
    })
    password?: string;

    @IsOptional()
    @IsNumber({}, { message: 'La edad debe ser un número' })
    @Min(18, { message: 'La edad debe ser mayor a 18 años' })
    @Max(100, { message: 'La edad debe ser menor a 100 años' })
    age?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El peso debe ser un número' })
    @Min(30, { message: 'El peso debe ser mayor a 30 kg' })
    @Max(200, { message: 'El peso debe ser menor a 200 kg' })
    weight?: number;

    @IsOptional()
    @IsNumber({}, { message: 'La altura debe ser un número' })
    @Min(100, { message: 'La altura debe ser mayor a 100 cm' })
    @Max(250, { message: 'La altura debe ser menor a 250 cm' })
    height?: number;
}