import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

import signInBackground from '../../assets/images/signIn-background.png';
import introImg from '../../assets/images/Intro.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import CustomizedInput from '../../components/CustomizedInput';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
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
              <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>
                  Criar uma conta
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputsContainer}>
              <CustomizedInput
                first
                placeholder="E-mail"
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <CustomizedInput
                last
                placeholder="Senha"
                isPassword
                value={password}
                onChangeText={text => setPassword(text)}
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
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.formFooterText}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>
            </View>

            <Button enabled={isButtonEnabled}>
              Entrar
            </Button>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignIn;