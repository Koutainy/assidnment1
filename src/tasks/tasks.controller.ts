import { Controller, Get, Post, Param, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../users/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Task[]> {
    return this.tasksService.findAll(Number(page), Number(limit));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() task: Partial<Task>, @Body('user') user: User): Promise<Task> {
    return this.tasksService.create(task, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/completed')
  markAsCompleted(@Param('id') id: number): Promise<Task> {
    return this.tasksService.markAsCompleted(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/:status')
  filterByStatus(
    @Param('status') status: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Task[]> {
    return this.tasksService.filterByStatus(status, Number(page), Number(limit));
  }
}