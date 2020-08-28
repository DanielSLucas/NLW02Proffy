import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import uploadConfig from '../config/upload';

import { ScheduleItem } from './ClassesController';
import { User } from './UsersController';

export default class ProfileController {
  async update(request: Request, response: Response) {
    const {
      name,
      avatar,
      email,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
    const user_id = request.user.id;

    const user = await db('users').where('id', user_id).first();
    if (!user) {
      throw new Error("User not found");
    }

    const trx = await db.transaction();

    try {
      await trx('users')
        .where({ id: user_id })
        .update({
          name,
          avatar,
          email,
          whatsapp,
          bio,
        });

      let class_id: Number;
      const classItem = await trx('classes').where({ user_id }).first();

      if (classItem) {
        class_id = classItem.id;
        if (classItem.cost !== cost || classItem.subject !== subject) {
          await trx('classes').where('user_id', user_id).update({
            cost,
            subject,
          });
        }
        await trx('class_schedule').where('class_id', classItem.id).delete();
      } else {
        const [classItemId] = await trx('classes').insert({
          user_id,
          cost,
          subject,
        });
        class_id = classItemId;
      }


      const classSchedule: ScheduleItem[] = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).json({ message: "updated!" });
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }

  async updateAvatar(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const file = request.file;

      const user: User = await db('users').where({ id, }).first();

      if (!user) {
        throw new Error("User doesn`t exists");
      }

      if (user.avatar) {
        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      }

      user.avatar = file.filename;

      await db('users').where({ id, }).update({
        avatar: file.filename,
      });

      delete user.password;

      const toBeReturnedUser = {
        ...user,
        avatar_url: `http://localhost:3333/files/${user.avatar}`
      }

      return response.json({user: toBeReturnedUser});
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
