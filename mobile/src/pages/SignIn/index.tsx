import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import CustomizedInput from '../../components/CustomizedInput';
import Button from '../../components/Button';

import signInBackground from '../../assets/images/signIn-background.png';
import introImg from '../../assets/images/Intro.png';

import styles from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  
  const passwordInputRef = useRef<TextInput>(null);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (!!email && !!password) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [email, password]);

  const handleSignUp = useCallback(() => {
    navigation.navigate('SignUp')
  }, [navigation])
  
  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword')
  }, [navigation])

  const handleSignIn = useCallback(async () => {
    const data = {
      email,
      password,
      rememberMe
    };

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'A senha deve ter no mínimo 6 dígitos'),
        rememberMe: Yup.boolean(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      navigation.navigate('Landing')
    } catch (err) {
      Alert.alert("Erro no login, tente novamente");
    }
  }, [email, navigation, password, rememberMe, signIn ])

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
              <View style={styles.intro}>
                <Image style={styles.logo} source={introImg} />
              </View>
            </ImageBackground>
          </View>

          <View style={styles.form}>
            <View style={styles.formHeader}>
              <Text style={styles.title}>Fazer login</Text>
              <TouchableOpacity 
                onPress={handleSignUp}
                style={styles.signUpButton}
              >
                <Text style={styles.signUpButtonText}>
                  Criar uma conta
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputsContainer}>
              <CustomizedInput
                first                  
                value={email}
                placeholder="E-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={text => setEmail(text)}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <CustomizedInput
                last
                ref={passwordInputRef}
                placeholder="Senha"
                isPassword
                value={password}
                onChangeText={text => setPassword(text)}
                onSubmitEditing={handleSignIn}
              />
            </View>

            <View style={styles.formFooter}>
              <View style={styles.rememberMe}>
                <CheckBox  
                  checked={rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                  containerStyle={styles.checkbox}
                  checkedColor="#04D361"
                  checkedIcon="check"
                />
                <Text style={styles.formFooterText}>Lembrar-me</Text>
              </View>
              <TouchableOpacity 
                style={styles.forgotPasswordButton}
                onPress={handleForgotPassword}
              >
                <Text style={styles.formFooterText}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>
            </View>

            <Button 
              enabled={isButtonEnabled}
              onPress={handleSignIn}
            >
              Entrar
            </Button>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignIn;