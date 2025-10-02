import { IsString, IsEmail, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import{ Transform, Type } from 'class-transformer';

export class CreateUserDto {
    @IsString({message: 'El nombre debe ser un texto'})
    @IsNotEmpty({message: 'El nombre es requerido'})
    name:string

    @IsEmail({}, {message: 'El email debe ser un email valido'})
    @IsNotEmpty({message: 'El email es requerido'})
    email:string

    @IsString({message: 'La contraseña debe ser un texto'})
    @IsNotEmpty({message: 'La contraseña es requerida'})
    @Min(8, {message: 'La contraseña debe tener al menos 8 caracteres'})
    password:string

    @IsNumber({}, {message: 'La edad debe ser un numero'})
    @IsNotEmpty({message: 'La edad es requerida'})
    @Min(15, {message: 'La edad debe ser mayor a 18'})
    @Max(100, {message: 'La edad debe ser menor a 100'})
    age:number

    @IsNumber({}, {message: 'El peso debe ser un numero'})
    @IsNotEmpty({message: 'El peso es requerido'})
    @Min(30, {message: 'El peso debe ser mayor a 30'})
    @Max(150, {message: 'El peso debe ser menor a 150'})
    weight:number

    @IsNumber({}, {message: 'La altura debe ser un numero'})
    @IsNotEmpty({message: 'La altura es requerida'})
    @Min(70, {message: 'La altura debe ser mayor a 70 centimetros'})
    @Max(250, {message: 'La altura debe ser menor a 250 centimetros'})
    height:number

}
