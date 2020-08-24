import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import { ScheduleItem } from './ClassesController';

export default class ProfileController {
  async update(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
    const user_id = request.user.id;

    const trx = await db.transaction();

    try {
      await trx('users')
        .where({ id: user_id })
        .update({
          name,
          avatar,
          whatsapp,
          bio,
        });

      await trx('classes')
        .where({ user_id })
        .update({
          subject,
          cost,
        });

      const classesArray = await trx('classes').where({ user_id });
      const class_id = classesArray[0];

      const classSchedule: ScheduleItem[] = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id,
        };
      });

      async function insertOrUpdate(scheduleItem: ScheduleItem): Promise<void> {
        const findScheduleItem = await trx('class_schedule')
          .where({
            week_day: scheduleItem.week_day,
            class_id,
          });
        const foundScheduleItem: ScheduleItem = findScheduleItem[0];

        if (foundScheduleItem) {
          await trx('class_schedule').where({ id: foundScheduleItem.id, })
            .update(scheduleItem)
        } else {
          await trx('class_schedule').insert(scheduleItem);
        }
      }

      classSchedule.forEach(async scheduleItem => {
        await insertOrUpdate(scheduleItem);
      });


      await trx.commit();

      return response.status(201).json({ message: "updated!" });
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }
}
