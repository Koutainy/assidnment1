// user.entity.ts
import {  Prop, Schema, SchemaFactory, OneToMany } from '@nestjs/mongoose';
import { Task } from '../tasks/task.entity';
import { Document } from 'mongoose';


export type UserDocument = User & Document;
@Schema()
 export class User {
  id: ObjectID;

   @Prop({ required: true })
  username: string;

  @Column()
  password: string;

   @Column()
  email: string;

   @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'user'], default: 'user' })
  role: string;


  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
export const UserSchema = SchemaFactory.createForClass(User);