
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const result = super.canActivate(context);
    // يمكنك إضافة منطق إضافي هنا إذا لزم الأمر
    return result;
  }
}
