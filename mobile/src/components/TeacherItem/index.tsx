import React, { useCallback, useState, useMemo } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import ScheduleItem from '../ScheduleItem';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api, { baseURL } from '../../services/api';

export interface ScheduleItem {
  week_day: number;
  from: number;
  to: number;
  class_id: number;
}
export interface Teacher {
  id: number;
  avatar: string;
  avatar_url: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  schedule: ScheduleItem[];
}

interface TeacherItemProps {
  favorited: boolean;
  teacher: Teacher;
  schedule: ScheduleItem[];
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited, schedule }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsapp = useCallback(() => {
    api.post('connections', {
      user_id: teacher.id,
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }, [teacher.id]);

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

  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id
      });

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }, [isFavorited]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: baseURL + '/files' + `/${teacher.avatar}` }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.weekSchedule}>
        <View style={styles.weekScheduleHeader}>
          <Text style={styles.weekScheduleHeaderText}>Dia</Text>
          <Text style={styles.weekScheduleHeaderText}>Horário</Text>
        </View>
        {daysSchedule.map( daySchedule => { 
          return <ScheduleItem  key={daySchedule.week_day} daySchedule={daySchedule}/>
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}
            ]}
          >
            {isFavorited
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }


          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;