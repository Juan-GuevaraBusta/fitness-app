import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe} from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  async findAll() {
    return this.profilesService.findAll();
  }

  @Get(':userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.profilesService.findByUserId(userId);
  }

  @Put(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateByUserId(userId, updateProfileDto);
  }
}

