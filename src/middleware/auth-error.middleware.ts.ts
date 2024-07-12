// auth-error.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectLogger } from 'nest-winston';

@Injectable()
export class AuthErrorMiddleware implements NestMiddleware {
  constructor(@InjectLogger() private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (res.locals.error instanceof UnauthorizedException) {
      this.logger.error(`Unauthorized access: ${res.locals.error.message}`);
      res.status(403).json({
        statusCode: 403,
        message: 'Access Forbidden. You do not have sufficient permissions.',
      });
    } else {
      next();
    }
  }
}
