import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { User } from './User';

export class Meme {
  @prop({ required: true })
  title!: string; // عنوان یا کپشن میم

  @prop({ required: true })
  imageUrl!: string; // لینک تصویر یا گیف

  @prop({ ref: () => User, required: true })
  uploader!: Ref<User>; // کاربری که میم را آپلود کرده

  @prop({ default: 0 })
  likesCount?: number; // تعداد لایک‌ها

  @prop({ default: Date.now })
  createdAt?: Date; // تاریخ آپلود

  @prop({ default: Date.now })
  updatedAt?: Date; // تاریخ آخرین تغییر
}

export const MemeModel = getModelForClass(Meme);
