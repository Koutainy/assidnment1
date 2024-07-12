
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // هنا يمكنك التحقق من صحة المستخدم من قاعدة البيانات
    const user = { username, roles: ['user'] }; // مثال على مستخدم وهمي
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
