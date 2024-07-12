import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { ConfigEnvironmentModule } from './config/config.module';
import { EmailModule } from './mail/email.module';
import { LoggerModule } from './logger/logger.module'; // إضافة وحدة التسجيل
import { ErrorMiddleware } from '.middleware/error.middleware'; 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
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