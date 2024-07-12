import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { EmailModule } from '../mail/email.module';
import * as mongoose from 'mongoose';
@Module({
  MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
