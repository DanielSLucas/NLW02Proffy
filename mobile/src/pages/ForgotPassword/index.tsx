import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import CustomizedInput from '../../components/CustomizedInput';
import Button from '../../components/Button';

import signInBackground from '../../assets/images/signIn-background.png';
import introImg from '../../assets/images/Intro.png';
import backIcon from '../../assets/images/icons/Voltar.png';

import styles from './styles';
import api from '../../services/api';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); 
  
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!!email) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [email]);

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation]);

  const handleSubmit = useCallback(async () => {

    const data = {
      email,
    };

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      api.post('forgot-password', data);

      navigation.navigate('RedefinitionSent')
    } catch (err) {
      alert(err.message);
    }
  }, [email, navigation])

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        enabled
      >
        <ScrollView 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.header}>
            <ImageBackground
              source={signInBackground}
              resizeMode="center"
              style={styles.headerBackground}
            >
              <View>
                <Image source={introImg} />
              </View>
            </ImageBackground>
          </View>

          <View style={styles.form}>
            <View style={styles.formHeader}>
              <TouchableOpacity
                onPress={handleGoBack}
              >
                <Image style={styles.backIcon} source={backIcon} />
              </TouchableOpacity>

              <Text style={styles.title}>Esqueceu sua senha?</Text>
              <Text style={styles.description}>
                Não esquenta, {'\n'}
                vamos dar um jeito nisso.
              </Text>
            </View>

            <View style={styles.inputsContainer}>
              <CustomizedInput
                first
                last 
                autoCapitalize="none"
                placeholder="E-mail"
                value={email}
                onChangeText={text => setEmail(text)}
                onSubmitEditing={handleSubmit}
              />
            </View>

            <Button 
              enabled={isButtonEnabled}
              onPress={handleSubmit}
            >
              Enviar
            </Button>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignIn;