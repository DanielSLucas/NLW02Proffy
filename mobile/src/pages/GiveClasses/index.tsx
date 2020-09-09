import React from 'react';
import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { useAuth } from '../../hooks/auth';
import { baseURL } from '../../services/api';

import PageHeader from '../../components/PageHeader';

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

      <ScrollView style={styles.giveClassesForm}>
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Whatsapp</Text>
          <TextInput
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Biografia</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={10}
            maxLength={300}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.legendContainer}>
          <Text style={styles.legend}>
            Sobre a aula
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Matéria</Text>
          <View style={styles.input}>
            <RNPickerSelect
              onValueChange={() => { }}
              useNativeAndroidPickerStyle
              placeholder={{ label: "Qual a matéria?" }}
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
            />
          </View>
        </View>


      </ScrollView>
    </View>
  );
}

export default GiveClasses;