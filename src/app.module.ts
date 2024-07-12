import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { User, UserDocument  } from './user.entity';
import { Task } from './tasks/task.entity';
import { ConfigEnvironmentModule } from './config/config.module';
import { EmailModule } from './mail/email.module';
import { LoggerModule } from './logger/logger.module'; // إضافة وحدة التسجيل
import { ErrorMiddleware } from './middleware/error.middleware';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'; 
@Module({
  imports: [
     MongooseModule.forRoot('mongodb://localhost:27017/nestjs-app'),
         useNewUrlParser: true,
      useUnifiedTopology: true,
    TasksModule,
    UsersModule,
    ConfigEnvironmentModule,
    EmailModule,
  ],
   providers: [
    LoggerService, // تسجيل خدمة السجلات
    {
      provide: APP_FILTER,
      useClass: ErrorMiddleware, // استخدام Middleware لإدارة الأخطاء كـ APP_FILTER
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes('*'); // تطبيق Middleware لإدارة الأخطاء على جميع الطرق
  }
}