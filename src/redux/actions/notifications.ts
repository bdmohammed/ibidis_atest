/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import {

    GET_NOTIFICATION_LIST,
    CHANGE_NOTIFICATION_STATUS
  } from '../../config/urls';
  import { apiPut, apiGet } from '../../utils/utils';
  import store from '../store';
  // import types from '../types';
  
  // const { dispatch } = store;
  
  export const getNotificationsList = (query = '', data = {}, headers = {}) => {
    return new Promise((resolve, reject) => {
      apiGet(GET_NOTIFICATION_LIST, data, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


  export function updateStatusNotify(data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      apiPut(CHANGE_NOTIFICATION_STATUS, data, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  