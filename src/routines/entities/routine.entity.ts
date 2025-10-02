import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { userEntity } from '../../users/entities/user.entity';
import { ExerciseEntity } from '../../exercises/entities/exercise.entity';

export enum dayOfWeek{
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
}
@Entity('weekly_routines')
export class RoutineEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'enum', enum: dayOfWeek})
    dayOfWeek: dayOfWeek

    @Column({type: 'boolean'})
    completed: boolean

    

    @Column({type: 'varchar', length: 255, default: '' })
    notes: string

    @Column({type: 'int'})
    userId: number

    @ManyToOne(() => userEntity, (user) => user.routines)
    @JoinColumn({name: 'user_id'})
    user: userEntity

    @ManyToMany(() => ExerciseEntity, (exercise) => exercise.routines)
    exercises: ExerciseEntity[]

    constructor(partial: Partial<RoutineEntity> = {}) {
        Object.assign(this, partial);
    }
}
