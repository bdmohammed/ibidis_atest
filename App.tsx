/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useDispatch} from 'react-redux';
import NoInternetModal from './src/Components/NoInternetModal';
import strings from './src/constants/lang';
import Routes from './src/navigation/Routes';
import store from './src/redux/store';
import types from './src/redux/types';
import {getItem, getUserData, setItem} from './src/utils/utils';
import {MenuProvider} from 'react-native-popup-menu';
// import RewardedAds from './src/Screens/AdsSection/Rewarded';
// import InterstitialAdsScreen from './src/Screens/AdsSection/Interstitial';
import mobileAds from 'react-native-google-mobile-ads';
import {login} from './src/redux/reducers/auth';
import {saveInternetConnection, saveThemeColor, saveThemeToggle, setAppInit} from './src/redux/reducers/initBoot';
// import dynamicLinks from '@react-native-firebase/dynamic-links';

// const credentials = {
//   clientId:
//     '995766909979-aqp0q9oje42ti1etcp2fddnsqaek7h5t.apps.googleusercontent.com',
//   appId: '1:995766909979:android:22dc95bf66db5bee8a4cbe',
//   apiKey: 'AIzaSyBP_7E6nJkiz3GZEupaMX_kcp2MYX9BV58',
//   databaseURL: '',
//   storageBucket: 'ibids-c30fd.appspot.com',
//   messagingSenderId: '995766909979',
//   projectId: 'ibids-c30fd',
// };

// firebase.initializeApp(credentials);

const App = () => {
  const [progress, setProgress] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('black');
  const [internetConnection, setInternet] = useState(true);
  const [genratedLink, setGenratedLink] = useState(true);
  const isDarkMode = useDarkMode();
  const { dispatch } = store;

  // const buildLink = async () => {
  //   console.log('click');
  //   const link = await dynamicLinks().buildLink({
  //     link: 'https://invertase.io',
  //     // domainUriPrefix is created in your Firebase console
  //     domainUriPrefix: 'https://ibidsnew.page.link',
  //     // optional setup which updates Firebase analytics campaign
  //     // "banner". This also needs setting up before hand
  //     analytics: {
  //       campaign: 'banner',
  //     },
  //   });
  //   console.log('link', link);

  //   setGenratedLink(link);
  // };

  useEffect(() => {
    (async () => {

      const userData = await getUserData();
      if (userData && !!userData.auth_token) {
        dispatch(login(userData));
      }

      const getAppData = await getItem('appData');
      console.log(getAppData)
      if (!!getAppData) {
        setPrimaryColor(getAppData.themeColors.primary_color);
      }
      setAppInit(getAppData);
      const theme = await getItem('theme');
      const themeToggle = await getItem('istoggle');
      if (JSON.parse(themeToggle)) {
        dispatch(saveThemeColor(isDarkMode));
        dispatch(saveThemeToggle(JSON.parse(themeToggle)));
      } else {
        dispatch(saveThemeToggle(JSON.parse(themeToggle)));
        if (JSON.parse(theme)) {
          dispatch(saveThemeColor(true));
        } else {
          dispatch(saveThemeColor(false));
        }
      }
      //Language
      const getLanguage = await getItem('language');
      if (getLanguage) {
        strings.setLanguage(getLanguage);
      }
    })();
    return () => {};
  }, []);

  // Check internet connection
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      console.log('checkingInternetConnections', state);
      const netStatus = state.isConnected;
      setInternet(netStatus);
      dispatch(saveInternetConnection(netStatus));
    });
    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        setProgress(true);
        console.log(adapterStatuses, '1adapterStatusesadapterStatuses');
      })
      .catch(() => {
        setProgress(false);
      });
    setTimeout(() => {
      Platform.OS == 'android' ? SplashScreen.hide() : null;
    }, 2500);
  }, []);

  if (!progress) {
    return null;
  }
  return (
    <SafeAreaProvider>
      {/* <Pressable style={{marginTop: 100}} onPress={buildLink}>
        <Text>click</Text>
        <Text>{genratedLink}</Text>
      </Pressable> */}
      {/* <InterstitialAdsScreen /> */}
      <Provider store={store}>
        <MenuProvider>
          <Routes />
        </MenuProvider>
      </Provider>
      <FlashMessage position="top" />
      <NoInternetModal show={!internetConnection} />
    </SafeAreaProvider>
  );
};
export default App;
