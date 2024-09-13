import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  Home,
} from '../Screens';
import navigationStrings from './navigationStrings';
const Stack = createStackNavigator();
export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{headerShown: false}}
      />
       
    </Stack.Navigator>
  );
}
