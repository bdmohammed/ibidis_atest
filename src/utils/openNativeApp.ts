/* eslint-disable @typescript-eslint/no-unused-vars */
import {Linking, Platform} from 'react-native';
// import DeviceInfo from 'react-native-device-info';
// import IntentLauncher, {IntentConstant} from 'react-native-intent-launcher';

export const openGps = (lat: any, lng: any) => {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${lat},${lng}`;
  const label = 'Custom Label';
  const url: any = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.openURL(url);
};

export function dialCall(phoneNumber: string) {
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumber}`;
  } else {
    phoneNumber = `telprompt:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber);
}

export function openBrowser(url: string) {
  Linking.openURL(url).catch((error) => {
    // @ts-ignore
    showError(strings.COULD_NOT_LOAD_PAGE);
  });
}

export function openEmail(email: any) {
  Linking.openURL(`mailto:${email}`);
}

//Option locations of app in setting

export function openAppSetting(path: any) {
  if (Platform.OS == 'ios') {
    Linking.openURL(`App-Prefs:${path}`);
  } else {
    Linking.openSettings();
  }
}
