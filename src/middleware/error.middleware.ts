// error.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service'; // يجب استيراد هذه الوحدة من الخطوة الثانية

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(err: any, req: Request, res: Response, next: NextFunction) {
    // Log the error
    this.logger.error(`Error occurred: ${err.message}`, err.stack);

    // Handle the error (customize as needed)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
