// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;

   @Column()
  email: string;

  @Column()
  roles: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}