import React, { useCallback } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import successBackground from '../../assets/images/success-background.png';
import doneIcon from '../../assets/images/icons/Feito.png';

import Button from '../../components/Button';

import styles from './styles';

const ClassCreated: React.FC = () => {
  const navigation = useNavigation();

  const handleFinished = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'Landing' }],
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
          Salvo!
        </Text>
        <Text style={styles.description}>
          Tudo certo, seu cadastro está{'\n'}
          na nossa lista de professores. Agora é{'\n'}
          só ficar de olho no seu WhatsApp.
        </Text>
      </ImageBackground>
      <Button
        enabled
        style={styles.button}
        onPress={handleFinished}
      >
        Concluído
      </Button>
    </View>
  );
}

export default ClassCreated;