import React from 'react';
import { View, Image, Text, StatusBar, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import onboardingBackground from '../../assets/images/onboarding-background.png';

import styles from './styles';

const Onboarding: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Swiper 
        dotStyle={styles.dot}
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

        </View>

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
              02.
            </Text>
            <Text style={styles.description}>
              Ou dê aulas {'\n'}
              sobre o que você {'\n'}
              mais conhece
            </Text>
          </View>

        </View>


      </Swiper>
    </View>
  )
}

export default Onboarding;
