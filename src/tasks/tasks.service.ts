import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { FindOneOptions } from 'typeorm';
import { MongoRepository } from 'typeorm';
import { LoggerService } from '../logger.service';
import { EmailService } from '../mail/email.service';
@Injectable()
export class TasksService {
constructor(
  private readonly logger: LoggerService
    @InjectRepository(Task)
    private tasksRepository: MongoRepository<Task>,
    private emailService: EmailService,
  ) {}

  findAll(page: number, limit: number): Promise<Task[]> {
    return this.tasksRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number): Promise<Task> {
      const options: FindOneOptions<Task> = {
    where: { id },
  };
  return this.tasksRepository.findOne(options);
  }


  create(task: Partial<Task>, user: User): Promise<Task> {
    this.logger.log('Fetching create User ');
    const newTask = this.tasksRepository.create({ ...task, user });
    return this.tasksRepository.save(newTask);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
     this.logger.log('Fetching update User');
    await this.tasksRepository.update(id, task);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async markAsCompleted(id: number): Promise<Task> {
     this.logger.log('Fetching markAsCompleted');
    await this.tasksRepository.update(id, { status: 'completed' });
    return this.findOne(id);
  }

  async filterByStatus(status: string, page: number, limit: number): Promise<Task[]> {
         this.logger.log('Fetching filterByStatus');
    return this.tasksRepository.find({
      where: { status },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async createTask(task: Task): Promise<Task> {
     this.logger.log('Fetching createTask');
    const newTask = await this.tasksRepository.save(task);
    await this.emailService.sendEmail(
      task.userId, // assuming userId is an email address for this example
      'Task Assigned',
      `A new task has been assigned to you: ${task.title}`,
      `<p>A new task has been assigned to you: <strong>${task.title}</strong></p>`
    );
    return newTask;
  }

  async updateTaskStatus(id: string, status: string): Promise<Task> {
         this.logger.log('Fetching updateTaskStatus');
    const task = await this.tasksRepository.findOneBy({ _id: id });
    task.status = status;
    await this.tasksRepository.save(task);
    if (status === 'completed') {
      await this.emailService.sendEmail(
        task.userId, // assuming userId is an email address for this example
        'Task Completed',
        `The task "${task.title}" has been completed.`,
        `<p>The task "<strong>${task.title}</strong>" has been completed.</p>`
      );
    }
    return task;
  }
}
