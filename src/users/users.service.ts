import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Task } from '../tasks/task.entity';
import { FindOneOptions } from 'typeorm';
import { MongoRepository } from 'typeorm';
import { LoggerService } from '../logger.service'; // استيراد خدمة السجلات
@Injectable()
export class UsersService {
  constructor(
    private readonly logger: LoggerService
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    @InjectRepository(Task)
    private tasksRepository: MongoRepository<Task>,
  ) {}

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ _id: id });
  }

  async updateUser(id: string, updateUserDto: any): Promise<User> {
    this.logger.log('Fetching updateUser user ');
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async findUserTasks(userId: string): Promise<Task[]> {
    this.logger.log('findUserTasks ');
    return this.tasksRepository.find({ where: { userId } });
  }
}
