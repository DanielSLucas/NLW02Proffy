import React, { useRef, useCallback, useState } from 'react';
import { View, KeyboardAvoidingView, Image, Text, StatusBar, Platform, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import * as Yup from 'yup';

import CustomizedInput from '../../components/CustomizedInput';

import backIcon from '../../assets/images/icons/Voltar.png';

import styles from './styles';
import Button from '../../components/Button';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const swiper = useRef<Swiper>(null);
  const navigation = useNavigation();

  const passwordInputRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = useCallback(() => {
    if (swiper.current) {
      swiper.current.scrollBy(1);
    }
  }, [swiper, swiper.current]);

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation]);

  const handleSignUp = useCallback(async () => {
    const data = {
      name,
      email,
      password,
    };

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('users', data);

      navigation.navigate('SignUpSuccess')
    } catch (err) {
      Alert.alert(err.message);
    }
  }, [name, email, password, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity 
        onPress={handleGoBack}
        style={[styles.header, {marginTop: 50}]}
      >
        <Image style={{}} source={backIcon} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.pageIntro}>
          <Text style={styles.introTitle}>
            Crie sua {'\n'}
            conta gratuíta
          </Text>
          <Text style={styles.introDescription}>
            Basta preencher esses dados {'\n'}
            e você estará conosco.
          </Text>
        </View>


        <Swiper
          ref={swiper}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          paginationStyle={styles.pagination}
          loop={false}
          style={styles.wrapper}
        >
          <View style={styles.slide}>
            <View style={styles.form}>
              <Text style={styles.formTitle}>
                01. Quem é você?
              </Text>

              <View style={styles.inputsContainer}>
                <CustomizedInput
                  first
                  last
                  placeholder="Nome"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>
            </View>

            <Button
              enabled
              onPress={handleNext}
              style={{ backgroundColor: '#8257E5', }}
            >
              Proxímo
            </Button>
          </View>

          <View style={[styles.slide, {marginTop: 60}]}>
            <View style={styles.form}>
              <Text style={styles.formTitle}>
                02. E-mail e Senha
              </Text>

              <View style={styles.inputsContainer}>
                <CustomizedInput
                  first
                  placeholder="E-mail"
                  value={email}
                  autoCapitalize="none"
                  onChangeText={text => setEmail(text)}
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus()
                  }}
                />

                <CustomizedInput
                  last
                  isPassword
                  ref={passwordInputRef}
                  placeholder="Senha"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  onSubmitEditing={handleSignUp}
                />
              </View>
            </View>

            <Button
              enabled
              onPress={handleSignUp}
            >
              Concluir cadastro
            </Button>
          </View>
        </Swiper>

      </KeyboardAvoidingView>

    </View>
  );
}

export default SignUp;