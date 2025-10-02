import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { RoutineEntity } from '../../routines/entities/routine.entity';

@Entity('exercises')
export class ExerciseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    name: string

    @Column({type: 'int'})
    reps: number

    @Column({type: 'varchar', length: 255, nullable: true})
    imageUrl: string

    @ManyToMany(() => RoutineEntity, (routine) => routine.exercises)
    @JoinTable({name: 'routine_exercises'})
    routines: RoutineEntity[]

    constructor(partial: Partial<ExerciseEntity> = {}) {
        Object.assign(this, partial);
    }
}
