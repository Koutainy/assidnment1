
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // تعديل المسار
import { RolesGuard } from '../roles/roles.guard'; // تعديل المسار
import { Roles } from '../auth/roles.decorator'; // تعديل المسار


@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  getAdminData() {
    return 'Admin data';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return 'User profile data';
  }
}
