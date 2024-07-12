import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
iimport { User, UserDocument  } from './user.entity';
import { Task } from '../tasks/task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
   @ApiOperation({ summary: 'Get user by id' })
    @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiParam({ name: 'id', type: String })
  updateUser(@Param('id') id: string, @Body() updateUserDto: any): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get(':id/tasks')
  @ApiOperation({ summary: 'find user task by ID' })
  @ApiParam({ name: 'id', type: String })
  findUserTasks(@Param('id') id: string): Promise<Task[]> {
    return this.usersService.findUserTasks(id);
  }
}
