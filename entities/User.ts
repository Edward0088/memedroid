import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Meme } from './Meme';

export class User {
  // فیلدهای پایه
  @prop({ required: true, unique: true })
  username!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  passwordHash!: string;

  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: Date.now })
  updatedAt?: Date;

  // فیلدهای اختیاری برای MVP
  @prop()
  avatarUrl?: string; // عکس پروفایل

  @prop({ default: 'user' })
  role?: 'user' | 'admin'; // نقش کاربر

  @prop({ default: false })
  isVerified?: boolean; // تایید ایمیل یا حساب

  @prop({ default: 0 })
  followersCount?: number; // تعداد دنبال‌کننده‌ها

  @prop({ default: 0 })
  followingCount?: number; // تعداد دنبال‌شدگان

  @prop({ ref: () => Meme, default: [] })
  likedMemes?: Ref<Meme>[]; // آرایه ID میم‌های لایک شده

  @prop()
  bio?: string; // بیوگرافی کوتاه
}

export const UserModel = getModelForClass(User);
