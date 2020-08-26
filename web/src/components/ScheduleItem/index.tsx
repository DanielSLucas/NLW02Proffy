import React, { useMemo } from 'react';

import './styles.css';
import convertMinutesToHour from '../../utils/convertMinutesToHour';

interface ScheduleItemProps {
  daySchedule: {
    available: boolean;
    week_day: number;
    from: number;
    to: number;
    class_id: number;
  } 
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ daySchedule }) => {

  const weekDayName = useMemo(() => {
    switch (daySchedule.week_day) {
      case 1:
        return 'Segunda'
        break;
      case 2:
        return 'Terça'
        break;
      case 3:
        return 'Quarta'
        break;
      case 4:
        return 'Quinta'
        break;
      case 5:
        return 'Sexta'
        break;
      default:
        break;
    }
  }, [daySchedule.week_day]);

  const convertedScheduleTime = useMemo(() => {
    const convertedFrom = convertMinutesToHour(daySchedule.from);
    const convertedTo = convertMinutesToHour(daySchedule.to);

    return convertedFrom + " - " + convertedTo;
  }, [daySchedule.from, daySchedule.to]);

  return (
    <div className={!daySchedule.available ? "schedule-item disabled" : "schedule-item"}>
      <div className="day">
        <span>Dia</span>
        <strong>{weekDayName}</strong>
      </div>

      <div className="time">
        <span>Horário</span>
        <strong>{convertedScheduleTime}</strong>
      </div>
    </div>
  );
}

export default ScheduleItem;