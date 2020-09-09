import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';

import convertMinutesToHour from '../../utils/convertMinutesToHour';

import arrowRightIcon from '../../assets/images/icons/seta.png';

import styles from './styles';


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
      case 2:
        return 'Terça'
      case 3:
        return 'Quarta'
      case 4:
        return 'Quinta'
      case 5:
        return 'Sexta'
      default:
        break;
    }
  }, [daySchedule.week_day]);
  
  const convertedScheduleTime = useMemo(() => {
    const convertedFrom = convertMinutesToHour(daySchedule.from);
    const convertedTo = convertMinutesToHour(daySchedule.to);

    return convertedFrom + " - " + convertedTo;
  }, [daySchedule.from, daySchedule.to]);

  return(
    <View style={[styles.container, !daySchedule.available ? styles.disabled : {}]}>
      <Text style={styles.text}>
        {weekDayName}
      </Text>

      <Image source={arrowRightIcon} />

      <Text style={styles.text}>
        {convertedScheduleTime}
      </Text>
    </View>
  );
}

export default ScheduleItem;