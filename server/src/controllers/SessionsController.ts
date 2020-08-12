import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { User } from './UsersController';
import db from '../database/connection';

import authConfig from '../config/auth';

export default class SessionsController {
  async create(request: Request, response: Response) {
    try {
      const { email, password, rememberMe } = request.body;

      const findUser = await db('users').where({ email, });
      const user: User = findUser[0];

      if (!user) {
        throw new Error("Incorrect email/password combination");
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        throw new Error("Incorrect email/password combination");
      }

      delete user.password;

      const expiresIn = rememberMe ? '30d' : '1d';

      const token = sign({}, authConfig.jwt.secret, {
        subject: user.id,
        expiresIn,
      });

      return response.json({ user, token })
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
