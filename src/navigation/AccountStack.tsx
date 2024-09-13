import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  AboutUs,
  Account,
  Settings,
  Notifications
} from '../Screens';
import ChangePassword from '../Screens/ChangePassword';

import navigationStrings from './navigationStrings';
const Stack = createStackNavigator();
export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Account}
        // component={AccountTemplateFour}
        name={navigationStrings.ACCOUNTS}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name={navigationStrings.NOTIFICATION}
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ABOUT_US}
        component={AboutUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.SETTIGS}
        component={Settings}
        options={{headerShown: false}}
      />
    
      <Stack.Screen
        name={navigationStrings.CHANGE_PASSWORD}
        component={ChangePassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
