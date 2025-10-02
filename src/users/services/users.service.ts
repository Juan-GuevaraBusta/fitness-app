import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from '../entities/user.entity';
import { ProfileEntity, profileGoal, activityLevel } from '../../profiles/entities/profile.entity';
import { RoutineEntity } from '../../routines/entities/routine.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(userEntity) private readonly usersRepo: Repository<userEntity>,
    @InjectRepository(ProfileEntity) private readonly profilesRepo: Repository<ProfileEntity>,
    @InjectRepository(RoutineEntity) private readonly routinesRepo: Repository<RoutineEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.usersRepo.create(dto);
    await user.hashPassword(); // Encriptar contraseña
    const savedUser = await this.usersRepo.save(user);
    
    // Crear perfil por defecto
    const profile = this.profilesRepo.create({
      userId: savedUser.id,
      goal: profileGoal.MAINTAIN,
      activityLevel: activityLevel.SEDENTARY,
    });
    await this.profilesRepo.save(profile);
    
    return savedUser;
  }

  async findAll() {
    return this.usersRepo.find();
  }

  async findOne(id: number, options?: { withProfile?: boolean }) {
    const user = await this.usersRepo.findOne({
      where: { id },
      relations: options?.withProfile ? ['profile'] : [],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    
    // Si se actualiza la contraseña, encriptarla
    if (dto.password) {
      user.password = dto.password;
      await user.hashPassword();
    }
    
    Object.assign(user, dto);
    await this.usersRepo.save(user);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
  }

  async getRoutines(id: number) {
    return this.routinesRepo.find({ 
      where: { userId: id }, 
      relations: ['exercises'] 
    });
  }
}
