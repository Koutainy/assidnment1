import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // أو نوع قاعدة البيانات التي تستخدمها
      database: 'db.sqlite',
      entities: [User, Task],
      synchronize: true,
    }),
    AuthModule,
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
