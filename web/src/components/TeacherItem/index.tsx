import React, { useCallback, useMemo } from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css'
import ScheduleItem from '../ScheduleItem';

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

  console.log({teacher, schedule})

  const daysSchedule = useMemo(() => {
    const weekDays = [1,2,3,4,5];

    const weekAvailability = weekDays.map(weekDay => {
      
      const foundDaySchedule = schedule
        .find(daysSchedule => daysSchedule.week_day === weekDay);
      
      if (foundDaySchedule) {
        return {
          ...foundDaySchedule,
          available: true
        };
      } else {
        return { 
          from: 0,
          to: 0,
          class_id: 0,
          week_day: weekDay, 
          available: false
        }
      }
    });

    return weekAvailability;
  }, [schedule])

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
        {daysSchedule.map( daySchedule => { 
          return <ScheduleItem  key={daySchedule.week_day} daySchedule={daySchedule}/>
        })}
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