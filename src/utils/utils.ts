/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {join} from 'lodash';
import {sessionHandler} from './helperFunctions';
import { Platform } from 'react-native';

export async function getHeaders() {
  let userData = await AsyncStorage.getItem('userData') as any;

  if (userData) {
    userData = JSON.parse(userData);
    return {
      Authorization: `${userData.auth_token}`,
    };
  }
  return {};
}

export function setUserData(data: string) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('userData', data);
}

//Save wallet info

export function setWalletData(data: string) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('walletData', data);
}

export function setAppData(data: string) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('appData', data);
}

export function saveUserAddress(data: string) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('saveUserAddress', data);
}

export function saveSelectedAddress(data: string) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('saveSelectedAddress', data);
}

export function saveShortCodeData(data: string) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('saveShortCode', data);
}

export function setItem(key: string, data: string) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem(key, data);
}

export function getItem(key: string) {
  return new Promise((resolve, _reject) => {
    AsyncStorage.getItem(key).then((data: any) => {
      resolve(JSON.parse(data));
    });
  });
}

export function removeItem(key: string) {
  return AsyncStorage.removeItem(key);
}

export function clearAsyncStorate(_key: any) {
  return AsyncStorage.clear();
}
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isMWeb = Platform.OS === 'web';

export const logErrorWithMessage = (message: any, errorSource: any) => {
  if (__DEV__) {
    console.log(message, errorSource);
  }
};

export async function getUserData() {
  return new Promise((resolve, _reject) => {
    AsyncStorage.getItem('userData').then((data: any) => {
      resolve(JSON.parse(data));
    });
  });
}

export async function getAppData() {
  return new Promise((resolve, _reject) => {
    AsyncStorage.getItem('appData').then((data: any) => {
      resolve(JSON.parse(data));
    });
  });
}

export async function clearUserData() {
  return AsyncStorage.removeItem('userData');
}

export async function apiReq(
  endPoint: any,
  data: any,
  method: string,
  headers: {},
  requestOptions = {},
) {
  debugger
  console.log(endPoint, 'apiReqapiReqapiReqapiReqapiReqapiReqend', data);
  return new Promise(async (res, rej) => {
    const getTokenHeader = await getHeaders();

    headers = {
      ...getTokenHeader,
      ...headers,
     
    };

    if (method === 'get' || method === 'delete') {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }
    //
    console.log(headers,"hehehhehehee");
    // @ts-ignore
    axios[method](endPoint, data, {headers})
      .then((result: any) => {
        // @ts-ignore:
        console.log(endPoint, '22222324234234', data,result);
        const {data} = result;

        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch((error: any) => {
        console.log('erorooror', JSON.stringify(error));
        if (error && error.response && error.response.status === 401) {
          debugger;
          sessionHandler(error?.response?.data?.msg);
          return rej(error);
        }
        if (error && error.response && error?.response?.data) {
          if (!error.response.data.error) {
            return rej({
              ...error.response.data,
              error: error.response.data.error || 'Network Error',
            });
          }
          return rej(error.response.data);
        } else {
          return rej({error: 'Network Error', message: 'Network Error'});
        }
        return rej(error);
      });
  });
}

export function apiPost(endPoint: string, data: {} | undefined, headers = {}) {
  return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint: string, data: {}, headers = {}) {
  return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint: string, data: {} | undefined, headers = {}, requestOptions: {} | undefined) {
  console.log('requestedUrl::', endPoint);

  return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint: string, data: {}, headers = {}) {
  return apiReq(endPoint, data, 'put', headers);
}

export function randomString(len = 5) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export const verticalAnimation = {
  gestureDirection: 'vertical',
  headerShown: false,
  cardStyleInterpolator: ({current, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

export function Logger(tag = 'AD', type: any, value: any) {
  console.log(`[${tag}][${type}]:`, value);
}

export function listItemsGenerator(num: number) {
  let list = [];
  for (var i = 0; i < num; i++) {
    let indexOfAdd: any = i % 4 == 0
    list = insertAt(indexOfAdd,0,num) as any
  }

  return list;
}

export function insertAt(array: any[], index: number, ...elementsArray: any[]) {
  array.splice(index, 0, ...elementsArray);
}
export const adUnitIDs = {
  image:
    Platform.OS === 'ios'
      ? 'ca-app-pub-3940256099942544/2247696110'
      : 'ca-app-pub-3940256099942544/2247696110',
  video:
    Platform.OS === 'ios'
      ? 'ca-app-pub-1511669721718109/1628909927'
      : 'ca-app-pub-1511669721718109/1628909927',
};

export const Events = {
  onViewableItemsChanged: 'onViewableItemsChanged',
};

export const routes = [
  {
    index: 0,
    type: 'banner',
  },
  {
    index: 1,
    type: 'image',
  },
  {
    index: 2,
    type: 'video',
  },
  {
    index: 3,
    type: 'list',
  },
];