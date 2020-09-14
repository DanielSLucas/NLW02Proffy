import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '../../hooks/auth';
import api, { baseURL } from '../../services/api';
import convertMinutesToHour from '../../utils/convertMinutesToHour';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import warningIcon from '../../assets/images/icons/warning.png';
import profileBackgroundImg from '../../assets/images/profile-background.png';
import cameraIcon from '../../assets/images/icons/camera.png';

import styles from './styles';

interface ScheduleItem {
  id: number;
  week_day: number;
  from: string;
  to: string;
}

interface ProfileInfo {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    avatar_url: string;
    whatsapp: string;
    bio: string;
  },
  user_class: {
    id: number;
    subject: string;
    cost: number;
    user_id: string;
  },
  class_schedule: ScheduleItem[];
}

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateUser } = useAuth();

  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    user: {
      id: '',
      name: '',
      email: '',
      avatar: '',
      avatar_url: '',
      whatsapp: '',
      bio: '',
    },
    user_class: {
      id: 0,
      subject: '',
      cost: 0,
      user_id: '',
    },
    class_schedule: [
      {
        id: 0,
        week_day: 0,
        from: '',
        to: '',
      }
    ]
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  //Carregar todas as informações do usuário
  useEffect(() => {
    api.get<ProfileInfo>('logged-user').then(response => setProfileInfo(response.data));
  }, [])
  //Setar  estados de acordo com as informações carregadas
  useEffect(() => {
    setName(profileInfo.user.name);
    setEmail(profileInfo.user.email);
    setWhatsapp(profileInfo.user.whatsapp);
    setBio(profileInfo.user.bio);
    setSubject(profileInfo.user_class.subject);
    setCost(profileInfo.user_class.cost.toString());

    const formattedSchedule = profileInfo.class_schedule.map(scheduleItem => {
      return {
        ...scheduleItem,
        from: convertMinutesToHour(Number(scheduleItem.from)),
        to: convertMinutesToHour(Number(scheduleItem.to)),
      }
    })

    setScheduleItems(formattedSchedule);
  }, [profileInfo])

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { id: 0, week_day: 0, from: '', to: '' }
  ]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems([
      ...scheduleItems,
      { id: 0, week_day: 1, from: '', to: '' }
    ])
  }, [scheduleItems]);

  const removeScheduleItem = useCallback(async (id: number) => {
    await api.delete(`/schedule-item/${id}`);

    const newScheduleItems = scheduleItems.filter(scheduleItem => scheduleItem.id !== id);

    setScheduleItems(newScheduleItems);
  }, [scheduleItems])

  const setScheduleItemValue = useCallback((position: number, field: string, value: string) => {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updateScheduleItems);
  }, [scheduleItems]);

  const handleUpdateProfile = useCallback(async () => {
    const data = {
      name,
      email,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        whatsapp: Yup.string().required('Whatsapp obrigatório'),
        bio: Yup.string(),
        subject: Yup.string().required('Matéria obrigatória'),
        cost: Yup.number().required('Custo/aula obrigatório'),
        schedule: Yup.array().of(Yup.object().shape({
          id: Yup.number(),
          week_day: Yup.number(),
          from: Yup.string(),
          to: Yup.string(),
        }))
      });

      await schema.validate(data, {
        abortEarly: false,
      });


      await api.put('profile', data);

      updateUser({
        id: profileInfo.user.id,
        name,
        avatar: profileInfo.user.avatar,
        avatar_url: profileInfo.user.avatar_url,
        whatsapp,
        bio,
        email,
      });

      Alert.alert('Perfil atualizado com sucesso!');

    } catch (err) {
      Alert.alert(err.message);
    }
  }, [name, email, whatsapp, bio, subject, cost, scheduleItems, updateUser, profileInfo.user.id, profileInfo.user.avatar, profileInfo.user.avatar_url]);

  const handleUpdateAvatar = useCallback(async () => {

    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão para acessar o rolo da câmera necessária');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (pickerResult.cancelled === true) {
      return;
    }

    const data = new FormData();

    data.append('avatar', {
      type: 'Image/jpeg',
      uri: pickerResult.uri,
      name: `${user.id}.jpg`,
    });

    api.patch('avatar', data).then(apiResponse => {
      updateUser(apiResponse.data.user)
    });
  }, [updateUser, user.id])

  return (
    <View style={styles.container}>
      <PageHeader
        page="Meu perfil"
        background
      >
        <ImageBackground
          source={profileBackgroundImg}
          resizeMode="center"
          style={styles.headerBackground}
        >
          <View style={styles.intro}>
            <View>
              <Image
                style={styles.avatar}
                source={{ uri: baseURL + '/files' + `/${user.avatar}` }}
              />

              <TouchableOpacity onPress={handleUpdateAvatar} style={styles.uploadButton}>
                <Image style={styles.uploadButtonIcon} source={cameraIcon} />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName} >{name}</Text>
            <Text style={styles.userSubject} >{subject}</Text>
          </View>
        </ImageBackground>
      </PageHeader>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView style={styles.giveClassesForm}>
          <View style={styles.giveClassesFormContent}>
            <View style={[styles.legendContainer, { marginBottom: 5, }]}>
              <Text style={styles.legend}>
                Seus dados
              </Text>
            </View>

            <Input
              label='Nome'
              value={name}
              onChangeText={text => setName(text)}
            />

            <Input
              label='E-mail'
              value={email}
              onChangeText={text => setEmail(text)}
            />

            <Input
              isTel
              label="Whatsapp"
              value={whatsapp}
              onChangeText={text => setWhatsapp(text)}
            />

            <Input
              label="Biografia"
              style={styles.textArea}
              multiline
              numberOfLines={10}
              maxLength={300}
              textAlignVertical="top"
              value={bio}
              onChangeText={text => setBio(text)}
            />

            <View style={styles.legendContainer}>
              <Text style={styles.legend}>
                Sobre a aula
              </Text>
            </View>

            <Select
              label="Matéria"
              labelStyles={styles.labelStyle}
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

            <Input
              label="Custo hora/aula"
              value={cost}
              onChangeText={text => setCost(text)}
            />

            <View style={styles.timeLegendContainer}>
              <Text style={styles.legend}>
                Horários disponíveis
              </Text>
              <TouchableOpacity
                onPress={addNewScheduleItem}
                style={styles.addNewButton}
              >
                <Text style={styles.addNewButtonText}>+ Novo</Text>
              </TouchableOpacity>
            </View>

            {/* {scheduleItems.map((scheduleItem, index) => (
              <View key={index} style={styles.scheduleItem}>
                <Select
                  label="Dia da semana"
                  labelStyles={styles.labelStyle}
                  items={[
                    { label: 'Segunda', value: 1 },
                    { label: 'Terça', value: 2 },
                    { label: 'Quarta', value: 3 },
                    { label: 'Quinta', value: 4 },
                    { label: 'Sexta', value: 5 },
                  ]}
                  placeholder="Selecione"
                  defaultValue={scheduleItem.week_day}
                  onChangeItem={item => setScheduleItemValue(index, 'week_day', item.value)}
                />

                <View style={styles.scheduleItemTime}>
                  <View style={styles.timeItem}>
                    <Select
                      label="Das"
                      labelStyles={styles.labelStyle}
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
                      defaultValue={scheduleItem.from}
                      onChangeItem={item => setScheduleItemValue(index, 'from', item.value)}
                    />
                  </View>
                  <View style={styles.timeItem}>
                    <Select
                      label="Até"
                      labelStyles={styles.labelStyle}
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
                      defaultValue={scheduleItem.to}
                      onChangeItem={item => setScheduleItemValue(index, 'to', item.value)}
                    />
                  </View>
                </View>
                <View style={styles.removeButtonContainer}>
                  <View style={styles.line} />
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => {removeScheduleItem(scheduleItem.id)}}
                  >
                    <Text style={styles.removeButtonText}>Excluir horário</Text>
                  </TouchableOpacity>
                  <View style={styles.line} />
                </View>
              </View>
            ))} */}


          </View>
          <View style={styles.giveClassesFormFooter}>
            <View style={styles.giveClassesFormContent}>
              <Button
                enabled
                onPress={handleUpdateProfile}
              >
                Salvar cadastro
              </Button>

              <View style={styles.warningContainer}>
                <Image source={warningIcon} />
                <View style={styles.warningTextContainer}>
                  <Text style={styles.warningTitle}>
                    Importante!
                  </Text>
                  <Text style={styles.warningDescription}>
                    Preencha todos os dados
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Profile;