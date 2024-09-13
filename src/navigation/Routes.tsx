/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
// import AuthStack from './AuthStack';

import navigationStrings from './navigationStrings';
import TabRoutes from './TabRoutes';
import {navigationRef} from './NavigationService';
// import {useSelector} from 'react-redux';
// import FilterScreen from '../Screens/Filters';
// import PostNewAdd from '../Screens/PostNewAdd';

// import AdsDetail from '../Screens/AdDetails';
// import {MyProfile, VerifyAccount} from '../Screens';
// import EditProfile from '../Screens/EditProfile';
// import SearchAds from '../Screens/SearchAds/SearchAds';
import {Linking} from 'react-native';
// import CashAdsDetail from '../Screens/CashAddDetails';
// import Winners from '../Screens/Winners';
const Stack = createStackNavigator();

// const linking = {
//   prefixes: ['ibidsapp://'],
// };

export default function Routes() {
  // // console.log('navigation', navigation);
  // const checkDeeplinkingUrl = url => {
  //   if (url) {
  //     try {
  //       const splittedUrl = url.split('/');
  //       const adsId = splittedUrl.pop();
  //       const type = splittedUrl.pop();
  //       if (type === 'ads') {
  //         // Navigate to Ads details screen
  //       }
  //     } catch (error) {}
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     const durl = await Linking.getInitialURL();
  //     checkDeeplinkingUrl(durl);
  //     Linking.addEventListener('url', ({url}) => {
  //       checkDeeplinkingUrl(url);
  //     });
  //   })();
  // }, []);

  // const deepLinking = {
  //   prefixes: ['com.ibids'],
  //   config: {
  //     tabRoutes: 'tabRoutes',
  //     GetAdsDetails: {
  //       path: 'searchAds:/itemId',
  //       params: {
  //         itemId: 1,
  //       },
  //     },
  //   },
  // };
  const [setInitialURL] = useState(null);
  const [setIsProcessing] = useState(true);

  const moveToNewScreen = (screenName: string, data: { item: { _id: any; } | { _id: any; uid: any; }; }) => () => {
    //@ts-ignore
    navigationRef.current.navigate(navigationStrings.TAB_ROUTES, {data});
  };
  const getInitialUrl = (url: any) => {
    console.log(url, 'itemitemitemDep');
    if (url?.includes(navigationStrings.GET_ADS_DETAILS)) {
      setInitialURL(url);
      const item = {_id: url.split('/').pop()};
      moveToNewScreen(navigationStrings.GET_ADS_DETAILS, {item})();
    }
    if (url?.includes(navigationStrings.GET_CASH_ADS_DETAILS)) {
      setInitialURL(url);
      const item = {_id: url.split('/').pop(), uid: url.split('/').pop()};
      console.log(item, 'itemitemitemDep');
      moveToNewScreen(navigationStrings.GET_CASH_ADS_DETAILS, {item})();
    }
  };

  useEffect(() => {
    const fetchInitialURL = async () => {
      try {
        const url = await Linking.getInitialURL();
        getInitialUrl(url);
      } catch (error) {
        console.error('Error fetching initial URL:', error);
      } finally {
        setIsProcessing(false);
      }
    };
    fetchInitialURL();
  },  []);

  useEffect(() => {
    const onLinkingEvent = async (event: { url: any; }) => {
      console.log('onLinkingEvent::event+++++', event.url);

      if (event.url) {
        getInitialUrl(event.url);
      }
    };
    Linking.addEventListener('url', onLinkingEvent);
    //@ts-ignore
    return () => Linking.removeEventListener('url', onLinkingEvent);
  }, []);

//@ts-ignore
  // const userData = useSelector(state => state?.auth?.userData);

  return (
    <NavigationContainer
      ref={navigationRef}
      // linking={deepLinking}
    >
      <Stack.Navigator>
        <Stack.Screen
          name={navigationStrings.TAB_ROUTES}
          component={TabRoutes}
          options={{headerShown: false, gestureEnabled: false}}
        />
        {/* {!userData?.auth_token && AuthStack(Stack)}
        <Stack.Screen
          name={navigationStrings.VERIFY_ACCOUNT}
          component={VerifyAccount}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={navigationStrings.FILTER_SCREEN}
          component={FilterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.EDITPROFILE}
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.POST_NEW_ADD}
          component={PostNewAdd}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={navigationStrings.GET_CASH_ADS_DETAILS}
          component={CashAdsDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.WINNERS}
          component={Winners}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.GET_ADS_DETAILS}
          component={AdsDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.MY_PROFILE}
          component={MyProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.SEARCH_ADS}
          component={SearchAds}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
