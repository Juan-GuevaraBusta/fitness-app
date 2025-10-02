import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity) private readonly profilesRepo: Repository<ProfileEntity>,
  ) {}

  async create(dto: CreateProfileDto) {
    const profile = this.profilesRepo.create(dto);
    return this.profilesRepo.save(profile);
  }

  async findAll() {
    return this.profilesRepo.find();
  }

  async findOne(id: number) {
    const profile = await this.profilesRepo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async findByUserId(userId: number) {
    const profile = await this.profilesRepo.findOne({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async update(id: number, dto: UpdateProfileDto) {
    const profile = await this.findOne(id);
    Object.assign(profile, dto);
    return this.profilesRepo.save(profile);
  }

  async updateByUserId(userId: number, dto: UpdateProfileDto) {
    const profile = await this.findByUserId(userId);
    Object.assign(profile, dto);
    return this.profilesRepo.save(profile);
  }

  async remove(id: number) {
    const result = await this.profilesRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Profile not found');
  }
}
