/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import CustomBottomTabBar from '../Components/CustomBottomTabBar';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import MyAdds from '../Screens/MyAds';
import Cash from '../Screens/Cash';
import Notifications from '../Screens/Notifications/Notifications';

import colors from '../styles/colors';
import {moderateScale, textScale} from '../styles/responsiveSize';
import AccountStack from './AccountStack';
import HomeStack from './HomeStack';
import navigationStrings from './navigationStrings';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

// let showBottomBar_ = true;

export default function TabRoutes(props: any) {
  console.log('props.navigation', props.navigation.navigate);
  const userData = useSelector(state => state?.auth?.userData);

  // const getTabBarVisibility = (route, navigation, screen) => {
  //   if (navigation && navigation.isFocused && navigation.isFocused()) {
  //     const route_name = getFocusedRouteNameFromRoute(route);
  //     console.log(route_name, 'route_nameroute_name', screen);
  //     if (screen.includes(route_name)) {
  //       showBottomBar_ = false;
  //       return false;
  //     }
  //     showBottomBar_ = true;
  //     return true;
  //   }
  // };

  return (
    <Tab.Navigator
      backBehavior={'initialRoute'}
      tabBar={props => {
        return <CustomBottomTabBar {...props} />;
      }}
      tabBarOptions={{
        labelStyle: {
          textTransform: 'capitalize',
          // fontFamily: fontFamily?.medium,
          fontSize: textScale(12),
          color: colors.white,
        },

        // showLabel: false,
      }}>
      <Tab.Screen
        component={HomeStack}
        name={navigationStrings.HOMESTACK}
        options={({route, navigation}) => ({
          tabBarLabel: strings.ADS,
          tabBarIcon: ({focused, tintColor}) => (
            <Image
              style={[
                {
                  width: 28,
                  height: 28,
                  tintColor: focused ? tintColor : '#000',
                },
              ]}
              source={focused ? imagePath.homeActive : imagePath.homeInActive}
            />
          ),
        })}
      />
      {userData?.auth_token && (
        <Tab.Screen
          component={MyAdds}
          name={navigationStrings.MY_ADS}
          options={({route, navigation}) => ({
            tabBarVisible: false,
            tabBarLabel: strings.MY_ADS,
            labelStyle: {
              fontSize: 15,
              color: 'red',
            },
            tabBarIcon: ({focused, tintColor}) => (
              <Image
                style={[
                  {
                    tintColor: focused ? tintColor : '#000',
                    width: 28,
                    height: 28,
                  },
                ]}
                source={
                  focused ? imagePath.myAddActive : imagePath.myAddInActive
                }
              />
            ),
          })}
        />
      )}
          <Tab.Screen
        component={Cash}
        name={'Cash'}
        options={({route, navigation}) => ({
          tabBarVisible: false,
          tabBarLabel: 'Cash',
          tabBarIcon: ({focused, tintColor}) => (
            <Image
              style={[
                {
                  tintColor: focused ? colors.purple : '#000',
                  width: 26,
                  height: 28,
                },
              ]}
              source={
                focused
                  ? imagePath.getMoneyActive
                  : imagePath.getMoneyActive
              }
            />
          ),
        })}
      />
      <Tab.Screen
        component={Notifications}
        name={navigationStrings.CART}
        options={({route, navigation}) => ({
          tabBarVisible: false,
          tabBarLabel: strings.NOTIFICATION,
          tabBarIcon: ({focused, tintColor}) => (
            <Image
              style={[
                {
                  tintColor: focused ? tintColor : '#000',
                  width: 28,
                  height: 28,
                },
              ]}
              source={
                focused
                  ? imagePath.notifcationActive
                  : imagePath.notifcationInActive
              }
            />
          ),
        })}
      />

      <Tab.Screen
        component={AccountStack}
        name={navigationStrings.ACCOUNTS}
        options={({route}) => ({
          tabBarLabel: strings.PROFILE,
          tabBarIcon: ({focused, tintColor}) => (
            <Image
              resizeMode="contain"
              style={[
                {
                  width: 28,
                  tintColor: focused ? tintColor : '#000',
                  height: 28,
                },
              ]}
              source={
                focused ? imagePath.profileActive : imagePath.profileInActive
              }
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
