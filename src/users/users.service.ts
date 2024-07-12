import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Task } from '../tasks/task.entity';
import { FindOneOptions } from 'typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    @InjectRepository(Task)
    private tasksRepository: MongoRepository<Task>,
  ) {}

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ _id: id });
  }

  async updateUser(id: string, updateUserDto: any): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async findUserTasks(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({ where: { userId } });
  }
}
