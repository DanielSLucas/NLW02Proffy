import React, { useCallback } from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css'

interface TeacherItemProps {
  teacher: Teacher;
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  week_day: number;
  from: number;
  to: number;
  class_id: number;
}

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  schedule: ScheduleItem[];
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, schedule }) => {

  const createNewConnection = useCallback(() => {
    api.post('connections', {
      user_id: teacher.id,
    });
  }, [teacher.id]);

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.bio}
      </p>

      <div className="week-schedule">
        <div className="schedule-item">
          <div className="day">
            <span>Dia</span>
            <strong>Segunda</strong>
          </div>
          
          <div className="time">
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </div>

        <div className="schedule-item">
          <div className="day">
            <span>Dia</span>
            <strong>Segunda</strong>
          </div>
          
          <div className="time">
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </div>

        <div className="schedule-item">
          <div className="day">
            <span>Dia</span>
            <strong>Segunda</strong>
          </div>
          
          <div className="time">
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </div>

        <div className="schedule-item">
          <div className="day">
            <span>Dia</span>
            <strong>Segunda</strong>
          </div>
          
          <div className="time">
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </div>

        <div className="schedule-item">
          <div className="day">
            <span>Dia</span>
            <strong>Segunda</strong>
          </div>
          
          <div className="time">
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </div>
      </div>
      

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;