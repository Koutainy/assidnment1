import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { EmailModule } from '../mail/email.module';
@Module({
  imports: [TypeOrmModule.forFeature([Task]), EmailModule],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
