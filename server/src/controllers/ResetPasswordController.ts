import { Request, Response } from 'express';
import { User } from './UsersController';
import { uuid } from 'uuidv4';
import nodemailer, { Transporter } from 'nodemailer';
import { isAfter, addHours, parseISO } from 'date-fns';

import db from '../database/connection';
import { compare, hash } from 'bcryptjs';

interface UserToken {
  id: number;
  token: string;
  user_id: string;
  created_at: string;
}

export default class ResetPasswordController {

  async update(request: Request, response: Response) {
    try {
      const { password, confirm_password, token } = request.body;

      const userToken: UserToken[] = await db('user_tokens').where({ token, });
      const userTokenExists = userToken[0];

      if (!userTokenExists) {
        throw new Error("User token does not exists");
      }

      const user = await db('users').where({ id: userTokenExists.user_id });
      const userExists = user[0];

      if (!userExists) {
        throw new Error("User does not exists");
      }

      const tokenCreatedAt = parseISO(userTokenExists.created_at);
      const compareDate = addHours(tokenCreatedAt, 2);

      if (isAfter(Date.now(), compareDate)) {
        throw new Error("Token expired");
      }

      const newPassword = await hash(password, 8);

      const updatedUser = await db('users').where({ id: userTokenExists.user_id }).update({ password: newPassword, })

      return response.json({ message: 'Updated!' })
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response) {
    let mailClient: Transporter;

    const account = await nodemailer.createTestAccount();

    mailClient = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    try {
      //requisção feita com o email no corpo
      const { email } = request.body;

      //buscar algum usuário com o email recebido
      const user: User[] = await db('users').where({ email, });
      const userExists = user[0];

      if (!userExists) {
        //se não existir será retornado um erro
        throw new Error("User email doesn`t exists");
      }
      //se existir 

      //será gerado um token (uuid) para recuperação de senha
      const token = uuid();

      //será criado um novo registro na tabela user_token, relecionado o token com o usuário que fez o pedido de recuperação de senha 
      await db('user_tokens').insert({
        user_id: userExists.id,
        token,
      });

      //um email deve ser enviado ao usuário com um link que contém seu token de recuperação de senha nos parâmetros
      const message = await mailClient.sendMail({
        from: 'ProffyApp <app@proffy.com>',
        to: email,
        subject: 'Recuperação de Senha',
        text:
          `Para recuperar sua senha acesse: 
          http://localhost:3000/reset_password?token=${token}`
      });

      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

      delete userExists.password;

      return response.json({ message: "done!" });
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}
