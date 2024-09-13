// @ts-nocheck
import {showMessage} from 'react-native-flash-message';
import {BackHandler, Alert, Animated} from 'react-native';
import strings from '../constants/lang/index';
import actions from '../redux/actions';
import * as NavigationService from '../navigation/NavigationService';
import navigationStrings from '../navigation/navigationStrings';
import {isString} from 'lodash';


export const sessionHandler = (error: string) => {
  actions.userLogout();
  NavigationService.navigate(navigationStrings.LOGIN, {}),
    Alert.alert(error, '', [
      {
        text: strings.OK,
        // cancelable: false,
        onPress: () => console.log('okay Pressed'),
        //   onPress: () =>
        //     NavigationService.navigate(navigationStrings.OUTER_SCREEN, {}),
      },
    ]);
};

const showError = (message: any) => {
  if (message && isString(message)) {
    showMessage({
      type: 'danger',
      icon: 'danger',
      message,
    });
  }
  // Toast.show(message);
};

const showSuccess = message => {
  if (message && isString(message)) {
    showMessage({
      type: 'success',
      icon: 'success',
      message,
    });
  }

  // Toast.show(message);
};
const showInfo = message => {
  if (message && isString(message)) {
    showMessage({
      type: 'info',
      icon: 'info',
      message,
      autoHide: true,
    });
  }
  // Toast.show(message);
};

export function otpTimerCounter(seconds) {
  // alert(seconds)
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return `${m}:${s}`;
}

export function getRandomColor() {
  const w = Math.floor(Math.random() * 256);
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = 0.3;
  const rgbaColor = 'rgba(' + w + ',' + x + ',' + y + ',' + z + ')';
  return rgbaColor;
}

export function getColorCodeWithOpactiyNumber(color, transparency) {
  /*
HEXA VALUE CHANGE IS DIFFRENT IN JS, HERE THE TRANSPERANCY YOU WANT TO ADD IS ADDED AT THE END
Using an alpha value to update a color’s transparency will change the hex code format from #RRGGBB to #RRGGBBAA (red, green, blue, alpha). 
The first six values (the red, green, and blue ones) stay the exact same. The only difference is the last two values (the AA).
  */
  switch (String(transparency)) {
    case '10':
      return `#${color}1A`;
    case '15':
      return `#${color}26`;
    case '20':
      return `#${color}33`;
    case '25':
      return `#${color}40`;
    case '30':
      return `#${color}4D`;
    case '35':
      return `#${color}59`;
    case '40':
      return `#${color}66`;
    case '50':
      return `#${color}80`;
    case '60':
      return `#${color}99`;
    case '70':
      return `#${color}B3`;
  }
}

export function getImageUrl(url1, url2, dimentions) {
  //
  return `${url1}${dimentions}${url2}`;
}

const androidBackButtonHandler = () => {
  Alert.alert(strings.HOLD_ON, strings.EXIT_WARNING, [
    {
      text: strings.CANCEL,
      onPress: () => null,
      style: 'cancel',
    },
    {text: strings.YES, onPress: () => BackHandler.exitApp()},
  ]);
  return true;
};

//Renaming the object key
const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};
//cloning object
const clone = obj => Object.assign({}, obj);

export const getScaleTransformationStyle = (
  // animated: Animated.Value,
  // startSize: number = 1,
  // endSize: number = 0.95,
  /** Removing annoataions commented above original code in case of any issue arise */
  animated,
  startSize = 1,
  endSize = 0.95,
) => {
  const interpolation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [startSize, endSize],
  });
  return {
    transform: [{scale: interpolation}],
  };
};

export const pressInAnimation = (
  // animated: Animated.Value,
  // duration: number = 150,
  /** Removing annoataions commented above original code in case of any issue arise */
  animated,
  duration = 150,
) => {
  animated.setValue(0);
  Animated.timing(animated, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  }).start();
};

export const pressOutAnimation = (
  // animated: Animated.Value,
  // duration: number = 150,
  /** Removing annoataions commented above original code in case of any issue arise */
  animated,
  duration = 150,
) => {
  animated.setValue(1);
  Animated.timing(animated, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  }).start();
};

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const getUrlRoutes = (url, indexOfRoute) => {
  const route = url.replace(/.*?:\/\//g, '');
  const routeName = route.split('/')[0 + indexOfRoute];

  return routeName;
};

const timeInLocalLangauge = (value, selectedLanguage) => {
  return `${value.toLocaleDateString(selectedLanguage, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}, ${value.toLocaleTimeString(selectedLanguage, {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

const timeConvert = n => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return num >= 60
    ? rhours + 'h :' + rminutes + `${strings.MINS}`
    : rminutes + `${strings.MINS}`;
};

const checkEvenOdd = num => {
  return timeConvert(num);
};

export {
  showError,
  showSuccess,
  showInfo,
  androidBackButtonHandler,
  renameKey,
  getParameterByName,
  getUrlRoutes,
  timeInLocalLangauge,
  checkEvenOdd,
};
