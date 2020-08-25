import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

export interface ScheduleItem {
  id: number;
  week_day: number;
  from: string;
  to: string;
  class_id: number;
}

interface Class {
  id: number;
  subject: string;
  cost: number;
  user_id: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;


    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes: Class[] = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select([
        'classes.*', 
        'users.name', 'users.whatsapp', 'users.avatar', 'users.bio',
      ]);

    const classesIds = classes.map( classItem => classItem.id);

    const schedules: ScheduleItem[] = await db('class_schedule')
      .whereIn('class_id', classesIds)
      .select('week_day', 'from', 'to', 'class_id');

    const formatedClasses = classes.map( classItem => {
      const classSchedule = schedules.filter( schedule => schedule.class_id === classItem.id);

      return {
        ...classItem,
        schedule: classSchedule, 
      }
    });
    

    return response.json(formatedClasses);
  }

  async create(request: Request, response: Response) {
    const {
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
          avatar,
          whatsapp,
          bio,
        });

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).json({ message: "done" });
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }
}
