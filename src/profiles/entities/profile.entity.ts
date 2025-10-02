import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { userEntity } from '../../users/entities/user.entity';

export enum profileGoal{
    LOSE_WEIGHT = 'LOSE_WEIGHT',
    GAIN_MUSCLE = 'GAIN_MUSCLE',
    MAINTAIN = 'MAINTAIN'
}

export enum activityLevel{
    SEDENTARY = 'SEDENTARY',
    LIGHT = 'LIGHT',
    MODERATE = 'MODERATE',
    ACTIVE = 'ACTIVE',
    VERY_ACTIVE = 'VERY_ACTIVE'
}

@Entity('profiles')
export class ProfileEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'enum', enum: profileGoal})
    goal: profileGoal

    @Column({type: 'enum', enum: activityLevel})
    activityLevel: activityLevel

    @Column({type: 'int'})
    userId: number

    @OneToOne(() => userEntity, (user) => user.profile)
    @JoinColumn({name: 'user_id'})
    user: userEntity

    constructor() {}
}