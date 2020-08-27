import React, { useCallback, useState, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import './styles.css';
import convertMinutesToHour from '../../utils/convertMinutesToHour';

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

function Profile() {
  const { user } = useAuth();
  const history = useHistory();

  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    user: {
      id: '',
      name: '',
      email: '',
      avatar: '',
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
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  useEffect(() => { 
    api.get<ProfileInfo>('logged-user').then(response => setProfileInfo(response.data));
  }, [])

  useEffect(() => {
    setName(profileInfo.user.name);
    setAvatar(profileInfo.user.avatar);
    setEmail(profileInfo.user.email);
    setWhatsapp(profileInfo.user.whatsapp);
    setBio(profileInfo.user.bio);
    setSubject(profileInfo.user_class.subject);
    setCost(profileInfo.user_class.cost.toString());

    const formattedSchedule = profileInfo.class_schedule.map( scheduleItem => {
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

    const newScheduleItems = scheduleItems.filter( scheduleItem => scheduleItem.id !== id);

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

  const handleUpdateProfile = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      avatar,
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
        avatar: Yup.string(),
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


      await api.put('profile', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      });

      alert('Perfil atualizado com sucesso!');

      history.push('/');
    } catch (err) {
      alert(err.message);
    }
  }, [name, avatar, email, whatsapp, bio, subject, cost, scheduleItems, history]);

  return (
    <div id="page-profile" className="container">
      <PageHeader>
        <div className="profile-header">
          <img src={profileInfo.user.avatar} alt={profileInfo.user.name} />
          <strong>{profileInfo.user.name}</strong>
          <p>{profileInfo.user_class.subject}</p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleUpdateProfile}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
            />

            <div className="email-wpp">
              <div>
                <Input
                  name="email"
                  label="E-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Input
                  name="whatsapp"
                  label="Whatsapp"
                  value={whatsapp}
                  isTel
                  placeholder="( ) _ ____ ____"
                  onChange={e => setWhatsapp(e.target.value)}
                />
              </div>
            </div>

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />

          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <div className="about-class">
              <div className="select-container">
                <Select
                  name="subject"
                  label="Matéria"
                  placeholder="Selecione qual você quer ensinar"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  options={[
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
                />
              </div>
              <div className="cost-input">
                <Input
                  name="cost"
                  label="Custo da sua hora por aula"
                  value={cost}
                  onChange={e => setCost(e.target.value)}
                />
              </div>
            </div>

          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
            </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={index} className="schedule-item-form">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                  options={[
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                />

                <div className="remove-button">
                  <div className="line" />
                  <button type="button" onClick={() => removeScheduleItem(scheduleItem.id)}>
                    Excluir horário
                  </button>
                  <div className="line" />
                </div>
              </div>
            ))}


          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante <br />
            Preencha todos os dados
          </p>
            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Profile;