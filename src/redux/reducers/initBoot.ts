/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getColorCodeWithOpactiyNumber} from '../../utils/helperFunctions';
// import types from '../types';
// import _ from 'lodash';
// import {deleteSearchResults, saveShortCode, updateCurrency} from '../actions/init';

const initial_state = {
  themeColors: {
    themeMain: '#5f2f9d',
    themeOpacity20: getColorCodeWithOpactiyNumber('41A2E6', 20),
    headingColor: '#000000',
    textGrey: '#1E2428',
    textGreyLight: '#8F92A1',
    bottomBarGradientA: 'rgba(50,181,252,1)',
    bottomBarGradientB: 'rgba(97,160,242,1)',
    backgroundGrey: '#F4F7FA',
    currencyRed: '#F44746',
    primary_color: '#5f2f9d',
    secondary_color: '#5f2f9d',
  },
  themeLayouts: {},
  appData: {},
  currencies: {},
  languages: {},
  allAddresss: [],
  shortCodeStatus: null,
  appStyle: {
    fontSizeData: {
      regular: 'Roboto-Regular',
      medium: 'Roboto-Medium',
      bold: 'Roboto-Regular',
      // regular: 'Urbanist-Regular',
      // medium: 'Urbanist-Bold',
      // bold: 'Urbanist-ExtraBold',
      openSansRegular: 'Roboto-Regular',
      openSansSemiBold: 'Roboto-Regular',
      openSansMedium: 'Roboto-Medium',
      openSansBold: 'Inter-Regular',
      openSansLight: 'Inter-Light',
    },
    tabBarLayout: 1,
    homePageLayout: 1,
  },
  themeColor: false,
  themeToggle: false,
  searchText: [],
  internetConnection: {},
};

// export default function (
//   state = initial_state,
//   action: {type: any; payload: {}},
// ) {
//   switch (action.type) {
//     case types.APP_INIT: {
//       const data = action.payload;
//       return {
//         ...state,
//         // appData: data?.appData,
//         // themeColors: {
//         //   ...state.themeColors,
//         //   ...data?.themeColors,
//         // },
//         // appStyle: {
//         //   ...state.appStyle,
//         //   ...data?.appStyle,
//         // },
//         // currencies: {
//         //   ...state.currencies,
//         //   ...data.currencies
//         // },
//         // languages: {
//         //   ...state.languages,
//         //   ...data.languages
//         // }
//       };
//     }

//     case types.SET_CURRENCY: {
//       let currenciesData = action.payload;
//       return {
//         ...state,
//         currencies: {
//           ...state.currencies,
//           ...currenciesData,
//         },
//       };
//     }

//     case types.SET_LANGUAGE: {
//       let languagesData = action.payload;
//       return {
//         ...state,
//         languages: {
//           ...state.languages,
//           ...languagesData,
//         },
//       };
//     }

//     case types.UPDATE_CURRENCY: {
//       let currenciesData: any = {};
//       currenciesData.primary_currency = action.payload;
//       return {
//         ...state,
//         currencies: {
//           ...state.currencies,
//           ...currenciesData,
//         },
//       };
//     }

//     case types.UPDATE_LANGAUGE: {
//       let languagesData: any = {};
//       languagesData.primary_language = action.payload;
//       return {
//         ...state,
//         languages: {
//           ...state.languages,
//           ...languagesData,
//         },
//       };
//     }
//     //save All addresses
//     case types.SAVE_ALL_ADDRESS: {
//       let allAddresss = {};
//       allAddresss = action.payload;
//       return {
//         ...state,
//         allAddresss: allAddresss,
//       };
//     }

//     //Save short code status
//     case types.SAVE_SHORT_CODE: {
//       return {
//         ...state,
//         shortCodeStatus: action.payload,
//       };
//     }

//     case types.NO_INTERNET: {
//       const internetConnection = action.payload;
//       return {...state, internetConnection};
//     }
//     case types.THEME: {
//       const data = action.payload;

//       return {
//         ...state,
//         themeColor: data,
//       };
//     }
//     case types.THEME_TOGGLE: {
//       const data = action.payload;
//       return {
//         ...state,
//         themeToggle: data,
//       };
//     }
//     case types.ADD_SEARCH_TEXT: {
//       let searchRes = state.searchText;

//       if (state.searchText.length == 10) {
//         //store values only 15
//         searchRes.shift(); //remove first exist item from array
//       }
//       let res = [...searchRes, action.payload]; //merge previous value into exist array

//       return {...state, searchText: res};
//     }

//     case types.ALL_RECENT_SEARCH: {
//       return {
//         ...state,
//         searchText: action.payload,
//       };
//     }
//     case types.DELETE_SEARCH_TEXT: {
//       return {
//         ...state,
//         searchText: [],
//       };
//     }
//     case types.DIRECT_SET_SEARCH_TEXT: {
//       return {searchText: action.payload};
//     }

//     default: {
//       return {...state};
//     }
//   }
// }

const initBootSlice = createSlice({
  name: 'initBoot',
  initialState: initial_state,
  reducers: {
    setAppInit: (state, action: PayloadAction<any>) => {
    },
    setCurrency: (state, action: PayloadAction<any>) => {
      state.currencies = {
        ...state.currencies,
        ...action.payload,
      };
    },
    serLanguage: (state, action: PayloadAction<any>) => {
      state.languages = {
        ...state.languages,
        ...action.payload,
      };
    },
    updateCurrency: (state, action: PayloadAction<any>) => {
      state.currencies.primary_currency = action.payload;
    },
    updateLanguage: (state, action: PayloadAction<any>) => {
      state.allAddresss = action.payload;
    },
    saveAllAddress: (state, action: PayloadAction<any>) => {
      state.allAddresss = action.payload;
    },
    saveShortCode: (state, action: PayloadAction<any>) => {
      state.shortCodeStatus = action.payload;
    },
    saveInternetConnection: (state, action: PayloadAction<any>) => {
      state = {...state, ...action.payload};
    },
    saveThemeColor: (state, action: PayloadAction<any>) => {
      state = {...state, ...action.payload};
    },
    saveThemeToggle: (state, action: PayloadAction<any>) => {
      state.themeToggle = action.payload;
    },
    saveAddSearchText: (state, action: PayloadAction<any>) => {
      let searchRes = state.searchText;

      if (state.searchText.length == 10) {
        //store values only 15
        searchRes.shift(); //remove first exist item from array
      }
      let res = [...searchRes, action.payload]; //merge previous value into exist array

      state =  {...state, searchText: res};
    },
    saveRecentSearchText: (state, action: PayloadAction<any>) => {
      state.searchText = action.payload;
    },
    deleteSearchResults: (state, action: PayloadAction<any>) => {
      state.searchText = [];
    },
  },
});

export const { setAppInit, saveInternetConnection, saveThemeColor, saveThemeToggle } = initBootSlice.actions;
export default initBootSlice.reducer;
