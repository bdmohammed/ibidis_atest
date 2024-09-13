/* eslint-disable @typescript-eslint/no-unused-vars */
// import types from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initial_state: any = {
  userData: {},
  profileAddress:{},
  userSettings: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initial_state,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    userLogout: (state, action: PayloadAction<any>) => {
      state.userData = undefined;
    },
    userSettings: (state, action: PayloadAction<any>) => {
      state.userSettings = {
        ...state.userSettings,
        ...action.payload,
      };
    },
  },
});

export const { login, userLogout, userSettings } = authSlice.actions;

export default authSlice.reducer;

// export default function (state = initial_state, action: { type: any; payload: any; }) {
//   switch (action.type) {
//     case types.LOGIN: {
//       const data = action.payload;
//       return {userData: data};
//     }
//     case types.USER_LOGOUT: {
//       console.log(action.payload,"action.payloadaction.payloadaction.payload")
//       const data = action.payload;
//       return {userData: undefined};
//     }
//     case types.USER_STTINGS: {
//       const data = action.payload;
//       return {...state,userSettings: {...state.userSettings ,...data}};
//     }
//     default: {
//       return {...state};
//     }
//   }
// }
