import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(page: number, limit: number): Promise<Task[]> {
    return this.tasksRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne(id);
  }

  create(task: Partial<Task>, user: User): Promise<Task> {
    const newTask = this.tasksRepository.create({ ...task, user });
    return this.tasksRepository.save(newTask);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(id, task);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async markAsCompleted(id: number): Promise<Task> {
    await this.tasksRepository.update(id, { status: 'completed' });
    return this.findOne(id);
  }

  async filterByStatus(status: string, page: number, limit: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { status },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}