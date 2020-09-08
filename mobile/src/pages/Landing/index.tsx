import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api, { baseURL } from '../../services/api';
import { useAuth } from '../../hooks/auth';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import signOutImg from '../../assets/images/icons/Sair.png';

const Landing: React.FC = () => {
  const navigation = useNavigation();
  const { signOut, user } = useAuth();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => setTotalConnections(response.data.total));
  }, [totalConnections]);

  const handleNavigateToGiveClassesPage = useCallback(() => {
    navigation.navigate('GiveClasses')
  }, [navigation])

  const handleNavigateToStudy = useCallback(() => {
    navigation.navigate('Study')
  }, [navigation]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return ( 
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.head}>
          <TouchableWithoutFeedback >
            <View style={styles.user}>
              <Image
                source={{ uri: baseURL + '/files' + `/${user.avatar}` }}
                style={styles.avatar}
              />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Image source={signOutImg} />
          </TouchableOpacity>
        </View>
        <Image source={landingImg} style={styles.banner} />
      </View>

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold} >O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudy}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText} >Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClassesPage}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText} >Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;