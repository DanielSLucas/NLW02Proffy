import React, { useCallback, useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import './styles.css';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

function TeacherForm() {
  const { user } = useAuth();
  const history = useHistory();

  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');


  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: 1, from: '', to: '' }
  ]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }, [scheduleItems]);

  const setScheduleItemValue = useCallback((position: number, field: string, value: string) => {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updateScheduleItems);
  }, [scheduleItems]);

  const handleCreateClass = useCallback((e: FormEvent) => {
    e.preventDefault();

    api.post('classes', {
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro');
    });

  }, [whatsapp, bio, subject, cost, scheduleItems, history]);

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
        icon={rocketIcon}
        span="Prepare-se! vai ser o máximo."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="form-firt-row">
              <img src={user.avatar} alt={user.name} />
              <strong>{user.name}</strong>

              <Input
                name="whatsapp"
                label="Whatsapp"
                value={whatsapp}
                isTel
                placeholder="( ) _ ____ ____"
                onChange={e => setWhatsapp(e.target.value)}
              />
            </div>

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              maxLength={300}
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

export default TeacherForm;