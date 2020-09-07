import React, { useCallback } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';

import successBackground from '../../assets/images/success-background.png';
import doneIcon from '../../assets/images/icons/Feito.png';

import styles from './styles';

const RedefinitionSent: React.FC = () => {
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
          Redefinição {'\n'}
          enviada!
        </Text>
        <Text style={styles.description}>
          Boa, agora é só checar o e-mail que foi {'\n'}
          enviado para você, redefinir sua senha {'\n'}
          e aproveitar os estudos.
        </Text>
      </ImageBackground>
      <Button
        enabled
        style={styles.button}
        onPress={handleSignIn}
      >
        Voltar ao login
      </Button>
    </View>
  );
}

export default RedefinitionSent;