import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'login user' })
    @ApiResponse({ status: 200, description: 'Returns access token and user info' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}