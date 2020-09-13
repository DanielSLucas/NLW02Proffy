import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';
import ClassCreated from '../pages/ClassCreated';
import Profile from '../pages/Profile';


function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Landing" component={Landing} />
      <Screen name="Profile" component={Profile} />
      <Screen name="GiveClasses" component={GiveClasses} />
      <Screen name="ClassCreated" component={ClassCreated} />
      <Screen name="Study" component={StudyTabs} />
    </Navigator>
  )
}

export default AppRoutes;