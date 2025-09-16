import { prop, Ref, getModelForClass, index } from '@typegoose/typegoose';
import { User } from './User';
import { Meme } from './Meme';

// Index ترکیبی برای جلوگیری از چند لایک یک کاربر روی یک میم
@index({ user: 1, meme: 1 }, { unique: true })
export class Like {
  @prop({ ref: () => User, required: true })
  user!: Ref<User>;

  @prop({ ref: () => Meme, required: true })
  meme!: Ref<Meme>;

  @prop({ default: Date.now })
  createdAt?: Date;
}

export const LikeModel = getModelForClass(Like);
