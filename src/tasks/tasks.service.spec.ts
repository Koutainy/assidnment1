import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.interface';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tasks', async () => {
    const tasks: Task[] = [{ id: 1, title: 'Task 1', description: 'Description 1' }];
    jest.spyOn(repository, 'find').mockResolvedValue(tasks);

    expect(await service.findAll()).toBe(tasks);
  });

  it('should return a task by id', async () => {
    const task: Task = { id: 1, title: 'Task 1', description: 'Description 1' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(task);

    expect(await service.findOne(1)).toBe(task);
  });

  it('should create a new task', async () => {
    const newTask: Task = { title: 'New Task', description: 'New Description' };
    const savedTask: Task = { id: 1, ...newTask };
    jest.spyOn(repository, 'save').mockResolvedValue(savedTask);

    expect(await service.create(newTask)).toBe(savedTask);
  });
});
