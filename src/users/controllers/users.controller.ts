import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, HttpCode} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Crea usuario y crea el profile por defecto desde el servicio
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    // Podría ser soft-delete/desactivar según la implementación del servicio
    await this.usersService.remove(id);
  }

  @Get(':id/routines')
  async getRoutines(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getRoutines(id);
  }
}
