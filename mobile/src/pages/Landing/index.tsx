import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import signOutImg from '../../assets/images/icons/Sair.png';

const Landing: React.FC = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();

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
          <View style={styles.user}>
            <Image 
              source={{uri: "https://scontent-gru2-2.xx.fbcdn.net/v/t1.0-9/22490118_1492632757482874_519952030961978183_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_eui2=AeFR2_41a-VUUtBqh3YXq06S_23SIe29XZz_bdIh7b1dnJcDm7PCgxNXZ8dmdQpYoyiWSpegWXpgiJB3DeevtutE&_nc_ohc=cD4j0UO1kJUAX9fd-Gp&_nc_ht=scontent-gru2-2.xx&oh=aab783d7d4f0d3d5740f307dc4dbc4f8&oe=5F7CBBD5"}} 
              style={styles.avatar}
            />
            <Text style={styles.userName}>Daniel Lucas</Text>
          </View>

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