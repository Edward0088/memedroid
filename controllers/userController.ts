import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../entities/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey'; // بهتر است در env ذخیره شود

export class UserController {
  // ثبت نام کاربر
  static async signup(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // چک وجود کاربر
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'کاربر با این ایمیل وجود دارد' });
      }

      // هش کردن رمز عبور
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // ساخت کاربر جدید
      const newUser = await UserModel.create({ username, email, passwordHash });
      res.status(201).json({
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطا در ثبت نام' });
    }
  }

  // ورود کاربر
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'کاربر یافت نشد' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: 'رمز عبور اشتباه است' });
      }

      // ایجاد JWT
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        token,
        user: { id: user._id, username: user.username, email: user.email }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطا در ورود' });
    }
  }
}
