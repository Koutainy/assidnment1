import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
  title: string;

  @ApiProperty({ example: 'Task Description', description: 'The description of the task', required: false })
  description?: string;

  @ApiProperty({ example: false, description: 'The completion status of the task', default: false })
  completed?: boolean;
}
