/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import React, {useRef, useState} from 'react';

import {MediaViewAds} from './MediaViewAds';
import {Logger} from '../../utils/utils';
import {width} from '../../styles/responsiveSize';
import {Platform, View} from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
  AdManager,
  ImageView,
  TestIds
} from 'react-native-admob-native-ads';
import {Text} from 'react-native';
const adUnitId = 'ca-app-pub-1511669721718109/1628909927'
export const AdView = ({index,customeImgStyle={}}) => {
  // Each NativeAdView component needs to have its own ref, you cannot use the same ref for multiple ads.
  const nativeAdViewRef = useRef();
  const [aspectRatio, setAspectRatio] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  const onAdFailedToLoad = event => {
    /**
     * Sometimes when you try to load an Ad, it will keep failing
     * and you will recieve this error: "The ad request was successful,
     * but no ad was returned due to lack of ad inventory."
     *
     * This error is not a bug or issue with our Library.
     * Just remove the app from your phone & clean your build
     * folders by running ./gradlew clean in /android folder
     * and for iOS clean the project in xcode. Hopefully the error will
     * be gone.
     *
     * [iOS] If you get this error: "Cannot find an ad network adapter with
     * the name(s): com.google.DummyAdapter". The ad inventory is empty in your
     * location. Try using a vpn to get ads in a different location.
     *
     * If you have recently created AdMob IDs for your ads, it might take
     * a few days until the ads will start showing.
     */
    setError(true)
    Logger('AD', 'FAILED213213123123)))))))))))', event);
  };

  const onAdLoaded = () => {
    Logger('AD', 'LOADED', 'Ad has loaded successfully');
  };

  const onAdClicked = () => {
    Logger('AD', 'CLICK', 'User has clicked the Ad');
  };

  const onAdImpression = () => {
    Logger('AD', 'IMPRESSION', 'Ad impression recorded');
  };

  const onNativeAdLoaded = event => {
    Logger('AD', 'RECIEVED', 'Unified ad  Recieved', event);
    // setLoading(false);
    // setLoaded(true);
    // setError(false);
    // setAspectRatio(event.aspectRatio);
  };

  const onAdLeftApplication = () => {
    Logger('AD', 'LEFT', 'Ad left application');
  };

  if(error){
    return null
  }
  return (
    <NativeAdView
      ref={nativeAdViewRef}
      onAdLoaded={onAdLoaded}
      onAdFailedToLoad={onAdFailedToLoad}
      onAdLeftApplication={onAdLeftApplication}
      onAdClicked={onAdClicked}
      onAdImpression={onAdImpression}
      onNativeAdLoaded={onNativeAdLoaded}
      adUnitID={adUnitId}>
      <View
        style={{
          width: '85%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
          paddingTop: 8,
          marginHorizontal: 16,
          // opacity: loading || error || !loaded ? 0 : 1,
        }}>
        <View
          style={{
            flexGrow: 1,
            flexShrink: 1,
            paddingHorizontal: 6,
          }}>
          <HeadlineView
            hello="abc"
            style={{
              fontWeight: 'bold',
              fontSize: 13,
              color: 'black',
            }}
          />
          <TaglineView
            numberOfLines={2}
            style={{
              fontSize: 11,
              color: 'black',
            }}
          />
          <AdvertiserView
            style={{
              fontSize: 10,
              color: 'gray',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <StoreView
              style={{
                fontSize: 12,
                color: 'black',
              }}
            /> */}
            {/* <StarRatingView
              starSize={12}
              fullStarColor="orange"
              emptyStarColor="gray"
              style={{
                width: 65,
                marginLeft: 10,
              }}
            /> */}
          </View>
        </View>
        <CallToActionView
          style={[
            {
              minHeight: 45,
              paddingHorizontal: 12,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              maxWidth: 100,
              width: 80,
            },
            Platform.OS === 'ios'
              ? {
                  backgroundColor: '#FFA500',
                  borderRadius: 10,
                }
              : {},
          ]}
          buttonAndroidStyle={{
            backgroundColor: '#FFA500',
            borderRadius: 10,
          }}
          allCaps
          textStyle={{
            fontSize: 13,
            flexWrap: 'wrap',
            textAlign: 'center',
            color: 'white',
          }}
        />
      </View>
      <View style={[{
          width: width-56,
          height:150,
        },customeImgStyle]}>
      <ImageView
        resizeMode='stretch'
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      </View>
     
    </NativeAdView>
  );
};
