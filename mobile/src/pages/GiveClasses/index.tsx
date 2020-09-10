import React from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { baseURL } from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import warningIcon from '../../assets/images/icons/warning.png';

import styles from './styles';


const GiveClasses: React.FC = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <PageHeader
        title="Que incrível que você quer dar aulas."
        page="Dar aulas"
      >
        <Text style={styles.headerDescription}>
          O primeiro passo, é preencher esse {'\n'}
          formulário de inscrição.
        </Text>
      </PageHeader>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{flex: 1}}
      >
        <ScrollView style={styles.giveClassesForm}>
          <View style={styles.giveClassesFormContent}>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>
                Seus dados
          </Text>
            </View>

            <View style={styles.user}>
              <Image
                style={styles.userAvatar}
                source={{ uri: baseURL + '/files' + `/${user.avatar}` }}
              />
              <Text style={styles.userName}>{user.name}</Text>
            </View>

            <Input
              label="Whatsapp"
            />

            <Input
              label="Biografia"
              style={styles.textArea}
              multiline
              numberOfLines={10}
              maxLength={300}
              textAlignVertical="top"
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
            // defaultValue={subject}
            // onChangeItem={item => setSubject(item.value)}
            />

            <Input
              label="Custo hora/aula"
            />

            <View style={styles.timeLegendContainer}>
              <Text style={styles.legend}>
                Horários disponíveis
          </Text>
              <TouchableOpacity style={styles.addNewButton}>
                <Text style={styles.addNewButtonText}>+ Novo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.scheduleItem}>
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
              // defaultValue={week_day}
              // onChangeItem={item => setWeek_day(item.value)}
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
                  // defaultValue={time}
                  // onChangeItem={item => setTime(item.value)}
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
                  // defaultValue={time}
                  // onChangeItem={item => setTime(item.value)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.giveClassesFormFooter}>
            <View style={styles.giveClassesFormContent}>
              <Button enabled>
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

export default GiveClasses;