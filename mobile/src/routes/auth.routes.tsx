import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const { Navigator, Screen } = createStackNavigator();

import Onboarding from '../pages/Onboarding';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignUpSuccess from '../pages/SignUpSuccess';
import ForgotPassword from '../pages/ForgotPassword';
import RedefinitionSent from '../pages/RedefinitionSent';


function AuthRoutes() {
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
    <Navigator screenOptions={{ headerShown: false }}>
      {isFirstTime && <Screen name="Onboarding" component={Onboarding} />}
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignUpSuccess" component={SignUpSuccess} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="RedefinitionSent" component={RedefinitionSent} />
    </Navigator>
  )
}

export default AuthRoutes;