import React, { useRef, useCallback, useState } from 'react';
import { View, KeyboardAvoidingView, Image, Text, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import CustomizedInput from '../../components/CustomizedInput';

import backIcon from '../../assets/images/icons/Voltar.png';

import styles from './styles';
import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

const SignUp: React.FC = () => {
  const swiper = useRef<Swiper>(null);
  const navigation = useNavigation();

  const [name, setName] = useState('');

  const handleNext = useCallback(() => {
    if (swiper.current) {
      swiper.current.scrollBy(1);
    }
  }, [swiper, swiper.current]);

  const handleNextPage = useCallback(() => {
    navigation.navigate('SignIn')
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
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
            <Image source={backIcon} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}         
            style={{ flex: 1 }}
          >

            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flex: 1 }}
            >
              <View style={styles.pageIntro}>
                <Text style={styles.introTitle}>
                  Crie sua {'\n'}
                conta gratuíta
                </Text>
                <Text style={styles.introDescription}>
                  Basta preencher esses dados {'\n'}
                  e você estará conosco.
                </Text>
              </View>

              <View style={styles.form}>
                <Text style={styles.formTitle}>
                  01. Quem é você?
                </Text>

                <View style={styles.inputsContainer}>
                  <CustomizedInput
                    first
                    last
                    placeholder="Nome"
                    value={name}
                    onChangeText={text => setName(text)}
                  />
                </View>
              </View>

              <Button
                enabled
                onPress={handleNext}
                style={{ backgroundColor: '#8257E5', }}
              >
                Proxímo
              </Button>
            </ScrollView>



          </KeyboardAvoidingView>
        </View>

        <View style={styles.slide}>
          <View style={styles.header}>
            <Image source={backIcon} />
          </View>

          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, width: 311, }}
            enabled
          >

            <View style={styles.pageIntro}>
              <Text style={styles.introTitle}>
                Crie sua {'\n'}
              conta gratuíta
              </Text>
              <Text style={styles.introDescription}>
                Basta preencher esses dados {'\n'}
              e você estará conosco.
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.formTitle}>
                01. Quem é você?
              </Text>

              <View style={styles.inputsContainer}>
                <CustomizedInput
                  first
                  last
                  placeholder="Nome"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>
            </View>

            <Button
              enabled
              onPress={handleNext}
              style={{ backgroundColor: '#8257E5', }}
            >
              Proxímo
            </Button>

          </KeyboardAvoidingView>
        </View>
      </Swiper>
    </View>
  );
}

export default SignUp;