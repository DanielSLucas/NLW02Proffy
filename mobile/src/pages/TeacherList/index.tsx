import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
// import RNPickerSelect from 'react-native-picker-select';
// import { Picker } from '@react-native-community/picker';
import DropDownPicker from 'react-native-dropdown-picker';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible(!isFiltersVisible)
  }, [isFiltersVisible]);

  const handleFiltersSubmit = useCallback(async () => {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);

  }, [week_day, subject, time]);

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const parsedFavorites = JSON.parse(response);
        const favoritedTeachersIds = parsedFavorites.map((teacher: Teacher) => {
          return teacher.id;
        });

        setFavorites(favoritedTeachersIds)
      }
    });
  }, [favorites]);

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader
        title={`Proffys ${'\n'}Disponíveis`}
        page="Estudar"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >

        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <DropDownPicker
              style={styles.input}
              containerStyle={{ height: 74 }}
              dropDownStyle={styles.dropDownStyle}
              placeholderStyle={styles.placeholderStyle}
              labelStyle={styles.optionLabel}
              itemStyle={styles.option}
              activeItemStyle={styles.activeOption}
              items={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' },
                { value: 'Física', label: 'Física' },
              ]}
              placeholder="Selecione"
              defaultValue={subject}
              onChangeItem={item => setSubject(item.value)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <DropDownPicker
                  style={styles.input}
                  containerStyle={{ height: 74 }}
                  dropDownStyle={styles.dropDownStyle}
                  placeholderStyle={styles.placeholderStyle}
                  labelStyle={styles.optionLabel}
                  itemStyle={styles.option}
                  activeItemStyle={styles.activeOption}
                  items={[
                    { label: 'Segunda', value: 1 },
                    { label: 'Terça', value: 2 },
                    { label: 'Quarta', value: 3 },
                    { label: 'Quinta', value: 4 },
                    { label: 'Sexta', value: 5 },
                  ]}
                  placeholder="Selecione"
                  defaultValue={week_day}
                  onChangeItem={item => setWeek_day(item.value)}
                />

              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <DropDownPicker
                  style={styles.input}
                  containerStyle={{ height: 74 }}
                  dropDownStyle={styles.dropDownStyle}
                  placeholderStyle={styles.placeholderStyle}
                  labelStyle={styles.optionLabel}
                  itemStyle={styles.option}
                  activeItemStyle={styles.activeOption}
                  items={[
                    { label: '00h', value: "00:00" },
                    { label: '01h', value: "01:00" },
                    { label: '02h', value: "02:00" },
                    { label: '03h', value: "03:00" },
                    { label: '05h', value: "05:00" },
                    { label: '06h', value: "06:00" },
                    { label: '07h', value: "07:00" },
                    { label: '08h', value: "08:00" },
                    { label: '09h', value: "09:00" },
                    { label: '10h', value: "10:00" },
                    { label: '11h', value: "11:00" },
                    { label: '12h', value: "12:00" },
                    { label: '13h', value: "13:00" },
                    { label: '14h', value: "14:00" },
                    { label: '15h', value: "15:00" },
                    { label: '16h', value: "16:00" },
                    { label: '17h', value: "17:00" },
                    { label: '18h', value: "18:00" },
                    { label: '19h', value: "19:00" },
                    { label: '20h', value: "20:00" },
                    { label: '21h', value: "21:00" },
                    { label: '22h', value: "22:00" },
                    { label: '23h', value: "23:00" },
                  ]}
                  placeholder="Selecione"
                  defaultValue={time}
                  onChangeItem={item => setTime(item.value)}
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              favorited={favorites.includes(teacher.id)}
              teacher={teacher}
              schedule={teacher.schedule}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TeacherList;