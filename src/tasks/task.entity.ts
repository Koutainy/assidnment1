// task.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User, UserDocument  } from './users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'pending' })
  status: string;
  
 @Column()
  userId: string; 

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
