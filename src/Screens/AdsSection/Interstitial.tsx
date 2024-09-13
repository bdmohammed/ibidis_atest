// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';

import {
  InterstitialAd,
  TestIds,
  AdEventType,
  // MobileAds
} from 'react-native-google-mobile-ads';


const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-1511669721718109/8285855607';

const InterstitialAdsScreen = () => {
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });
  interstitial.addAdEventListener(AdEventType.LOADED, () => {
    interstitial.show();
  });
  interstitial.load();
};

export default InterstitialAdsScreen;
