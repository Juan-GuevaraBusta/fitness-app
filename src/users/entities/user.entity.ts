import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ProfileEntity } from '../../profiles/entities/profile.entity';
import { RoutineEntity } from '../../routines/entities/routine.entity';
import {scrypt, randomBytes} from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

@Entity('users')
export class userEntity{

    /*Clave primaria, auto-incremental, identificador unico de cada usuario */
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 60 })
    name:string

    @Column({type: 'varchar', length: 60 })
    email:string

    @Column({type: 'varchar', length: 60 })
    password:string

    @Column({type: 'int'})
    age:number

    @Column({type: 'float'})
    weight:number

    @Column({type: 'float'})
    height:number

    /*Relacion 1:1 con ProfileEntity */
    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    @JoinColumn({name: 'profile_id'})
    profile: ProfileEntity

    @OneToMany(() => RoutineEntity, (routine) => routine.user)
    routines: RoutineEntity[]

    /*Constructor de la entidad, permite inicializar una instancia con valores iniciales*/

    constructor() {}

    async hashPassword(): Promise<void>{
        const salt = randomBytes(16).toString('hex')
        const hashedPassword = await scryptAsync(this.password, salt, 64) as Buffer
        this.password = `${salt}.${hashedPassword.toString('hex')}`
    }

    async validatePassword(password: string): Promise<boolean>{
        const [salt, hashedPassword] = this.password.split('.')
        const hashedBuffer = await scryptAsync(password, salt, 64) as Buffer
        return hashedBuffer.toString('hex') == hashedPassword;
    }


}
