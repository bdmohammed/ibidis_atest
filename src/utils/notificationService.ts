/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
// @ts-ignore
import PushNotification, {Importance} from 'react-native-push-notification';
// import {useSelector} from 'react-redux';
import actions from '../redux/actions';
import {getItem} from './utils';

export async function requestUserPermission() {
  // if (Platform.OS == 'ios') {
  //     await messaging().registerDeviceForRemoteMessages();
  // }
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'the old token');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'the new genrated token');
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'error in fcmToken');
      // showError(error.message)
    }
  }
};

const _getOrderDetail = async (id: any) => {
  const getAppData = await getItem('appData');
  // @ts-ignore
  const {appData} = getAppData;
  console.log('manage Redirections', appData);
  let data = {};
  // @ts-ignore
  data['order_id'] = id;

  actions
    // @ts-ignore
    .getOrderDetail(data, {
      code: appData?.profile?.code,
      currency: appData.currencies[0].currency_id,
      language: appData.languages[0].language_id,
      // systemuser: DeviceInfo.getUniqueId(),
    })
    .then((res: any) => {
      console.log(res, 'resorder detail on redirection >>>');
      // navigation.navigate(navigationStrings.ORDER_DETAIL, {
      //   orderId: item?.order_id,
      //   fromVendorApp: true,
      //   orderDetail: item,
      //   orderStatus: item?.order_status,
      //   selectedVendor: { id: item?.vendor_id },
      //   showRating: item?.order_status?.current_status?.id != 6 ? false : true,
      // });
    })
      // @ts-ignore
    .catch(errorMethod);
};

const manageRedirections = async (data: {type: string}) => {
  console.log('manage Redirections +++++ ', data);
  if (data.type == 'order_status_change') {
    // _getOrderDetail(4);
  }
};

export const notificationListener = async () => {
  PushNotification.configure({
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    requestPermissions: true,
    popInitialNotification: true,
  });

  createDefaultChannels();

  function createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: `Default channel`, // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created: any) =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: 'sound-channel-id', // (required)
        channelName: `Sound channel 2`, // (required)
        channelDescription: 'A sound channel 2', // (optional) default: undefined.
        soundName: 'notification.wav', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created: any) =>
        console.log(`createChannel 'sound-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  messaging().onNotificationOpenedApp(
    async (remoteMessage: {data: any; messageId: any; notification: any}) => {
      console.log(
        'Notification caused app to open from background state bla bla:',
        remoteMessage,
      );
      const {data, messageId, notification} = remoteMessage;
      manageRedirections(data);
      if (
        Platform.OS == 'android' &&
        notification.android.sound == 'notification'
      ) {
        // @ts-ignore
        actions.isVendorNotification(true);
      }
      if (Platform.OS == 'ios' && notification.sound == 'notification.wav') {
        // @ts-ignore
        actions.isVendorNotification(true);
      }
    },
  );

  messaging()
    .getInitialNotification()
    .then((remoteMessage: {data: any; messageId: any; notification: any}) => {
      if (remoteMessage) {
        console.log('remote message inital notification', remoteMessage);
        const {data, messageId, notification} = remoteMessage;
        if (
          Platform.OS == 'android' &&
          notification.android.sound == 'notification'
        ) {
          // @ts-ignore
          actions.isVendorNotification(true);
        }
        if (Platform.OS == 'ios' && notification.sound == 'notification.wav') {
          // @ts-ignore
          actions.isVendorNotification(true);
        }
      }
    });

  return null;
};
