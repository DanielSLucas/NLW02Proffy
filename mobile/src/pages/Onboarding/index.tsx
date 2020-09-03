import React, { useCallback, useRef, useEffect } from 'react';
import { View, Image, Text, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

import nextIcon from '../../assets/images/icons/next.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import onboardingBackground from '../../assets/images/onboarding-background.png';
import onboarding2Background from '../../assets/images/onboarding-2background.png';

import styles from './styles';

const Onboarding: React.FC = () => {
  const swiper = useRef<Swiper>(null);
  const navigation = useNavigation();

  const handleNext = useCallback(() => {
    if (swiper.current) {
      swiper.current.scrollBy(1);
    }
  }, [swiper, swiper.current]);

  const handleNextPage = useCallback(() => {
    navigation.navigate('SignIn')
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('isFirstTime', "false");
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Swiper 
        ref={swiper}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={styles.pagination}
        loop={false}
        style={styles.wrapper}
      >
        <View style={styles.slide}>

          <View style={styles.header}>
            <ImageBackground
              resizeMode="center"
              source={onboardingBackground}
              style={styles.headerBackground}
            >
              <Image style={styles.pageIcon} source={studyIcon} />
            </ImageBackground>
          </View>


          <View style={styles.main}>
            <Text style={styles.pageNumber}>
              01.
            </Text>
            <Text style={styles.description}>
              Encontre vários {'\n'}
              professores para {'\n'}
              ensinar você
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Image source={nextIcon} />
          </TouchableOpacity>

        </View>

        <View style={styles.slide}>

          <View style={[styles.header, {backgroundColor: "#04D361"}]}>
            <ImageBackground
              resizeMode="center"
              source={onboarding2Background}
              style={styles.headerBackground}
            >
              <Image style={styles.pageIcon} source={giveClassesIcon} />
            </ImageBackground>
          </View>


          <View style={styles.main}>
            <Text style={styles.pageNumber}>
              02.
            </Text>
            <Text style={styles.description}>
              Ou dê aulas {'\n'}
              sobre o que você {'\n'}
              mais conhece
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNextPage}
          >
            <Image source={nextIcon} />
          </TouchableOpacity>

        </View>


      </Swiper>
    </View>
  )
}

export default Onboarding;
