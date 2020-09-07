import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const { Navigator, Screen } = createStackNavigator();

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';
import Onboarding from '../pages/Onboarding';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignUpSuccess from '../pages/SignUpSuccess';
import ForgotPassword from '../pages/ForgotPassword';
import RedefinitionSent from '../pages/RedefinitionSent';


function AppStack() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  
  useEffect(() => {
    AsyncStorage.getItem('isFirstTime').then(response => {
      if (!response) {
        setIsFirstTime(true)
      } else {
        setIsFirstTime(false)
      }
    });
  }, [isFirstTime]);

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime && <Screen name="Onboarding" component={Onboarding} />}
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
        <Screen name="SignUpSuccess" component={SignUpSuccess} />
        <Screen name="ForgotPassword" component={ForgotPassword} />
        <Screen name="RedefinitionSent" component={RedefinitionSent} />
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack;