import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { User } from './User';
import { Meme } from './Meme';

export class Comment {
  @prop({ ref: () => User, required: true })
  user!: Ref<User>; // کاربری که کامنت گذاشته

  @prop({ ref: () => Meme, required: true })
  meme!: Ref<Meme>; // میم مربوطه

  @prop({ required: true })
  content!: string; // متن کامنت

  @prop({ default: Date.now })
  createdAt?: Date; // زمان ارسال کامنت
}

export const CommentModel = getModelForClass(Comment);
