import { Controller, Get, Post, Body, Patch, Param, Put, Delete, HttpCode, ParseIntPipe, Query, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import { RoutinesService } from '../services/routines.service';
import { CreateRoutineDto } from '../dto/create-routine.dto';
import { UpdateRoutineDto } from '../dto/update-routine.dto';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  async create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @Get()
  async findAll(
    @Query('dayOfWeek') dayOfWeek?: string,
    @Query('completed', new DefaultValuePipe(undefined), ParseBoolPipe) completed?: boolean,
    @Query('userId', new DefaultValuePipe(undefined), ParseIntPipe) userId?: number,
  ) {
    const filters: any = {};
    if (dayOfWeek) filters.dayOfWeek = dayOfWeek;
    if (typeof completed === 'boolean') filters.completed = completed;
    if (typeof userId === 'number') filters.userId = userId;
    return this.routinesService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoutineDto: UpdateRoutineDto,
  ) {
    return this.routinesService.update(id, updateRoutineDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.routinesService.remove(id);
  }

  @Patch(':id/complete')
  async markComplete(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.markComplete(id);
  }

  @Post(':routineId/exercises')
  async addExerciseToRoutine(
    @Param('routineId', ParseIntPipe) routineId: number,
    @Body('exerciseId', ParseIntPipe) exerciseId: number,
  ) {
    return this.routinesService.addExercise(routineId, exerciseId);
  }

  @Delete(':routineId/exercises/:exerciseId')
  @HttpCode(204)
  async removeExerciseFromRoutine(
    @Param('routineId', ParseIntPipe) routineId: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
  ) {
    await this.routinesService.removeExercise(routineId, exerciseId);
  }
}
