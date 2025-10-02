import { IsString, IsNumber, IsNotEmpty, Min, Max, IsOptional} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateExerciseDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @IsNumber({}, { message: 'El numero de repeticiones debe ser un numero' })
    @IsNotEmpty({ message: 'El numero de repeticiones es requerido' })
    @Min(1, { message: 'El numero de repeticiones debe ser mayor a 1' })
    @Max(100, { message: 'El numero de repeticiones debe ser menor a 100' })
    @Type(() => Number)
    reps: number;
    
    @IsOptional()
    @IsString({ message: 'La url de la imagen debe ser un texto' })
    imageUrl?: string;
}
