import React, { useCallback } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import successBackground from '../../assets/images/success-background.png';
import doneIcon from '../../assets/images/icons/Feito.png';

import styles from './styles';
import Button from '../../components/Button';

const SignUpSuccess: React.FC = () => {
  const navigation = useNavigation();

  const handleSignIn = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'SignIn' }],
      index: 0,
    });
  }, [navigation]);

  return(
    <View style={styles.container}>
      <ImageBackground 
        resizeMode="center"
        source={successBackground} 
        style={styles.background}
      >
        <Image source={doneIcon} style={styles.icon}/>
        <Text style={styles.title}>
          Cadastro {'\n'}
          concluído!
        </Text>
        <Text style={styles.description}>
          Agora você faz parte da {'\n'}
          plataforma Proffy
        </Text>
      </ImageBackground>
      <Button
        enabled
        style={styles.button}
        onPress={handleSignIn}
      >
        Fazer Login
      </Button>
    </View>
  );
}

export default SignUpSuccess;