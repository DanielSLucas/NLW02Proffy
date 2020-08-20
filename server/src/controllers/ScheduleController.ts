import { Request, Response } from 'express';
import db from '../database/connection';

export default class ScheduleController {

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      await db('class_schedule').where('class_schedule.id', '=', id).del();

      return response.json({ messagem: 'deleted' });
    } catch (error) {
      return response.status(400).json({ err: err.message });
    }
  }
}
