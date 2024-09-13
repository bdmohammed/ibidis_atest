import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import types from '../types';

const initial_state = {
  appMainData: {},
  location: {
    address: '',
    latitude: '',
    longitude: '',
  },
  profileAddress: {
    addAddress: '',
    updatedAddress: '',
  },
  dineInType: 'delivery',
  constCurrLoc: {
    address: '',
    latitude: '',
    longitude: '',
  },
  categories: [],
  countries: [],
};

// function (state = initial_state, action: { type: any; payload: any; }) {
//   switch (action.type) {
//     case types.HOME_DATA: {
//       const data = action.payload;

//       return {
//         ...state,
//         appMainData: data,
//       };
//     }

//     case types.LOCATION_DATA: {
//       const data = action.payload;
//       return {
//         ...state,
//         location: data,
//       };
//     }
//     case types.CONST_CUR_LOC: {
//       const data = action.payload;
//       return {
//         ...state,
//         constCurrLoc: data,
//       };
//     }

//     case types.PROFILE_ADDRESS: {
//       const data = action.payload;
//       return {
//         ...state,
//         profileAddress: data,
//       };
//     }
//     case types.DINE_IN_DATA: {
//       const data = action.payload;
//       return {
//         ...state,
//         dineInType: data,
//       };
//     }
//     case types.SET_CATEGORIES: {
//       const data = action.payload;
//       let updateCategories = data
//       if (data && data.length > 0) {
//         updateCategories = data.map((x: { category: any; }) => { return { ...x, itemName: x.category } })
//       }
//       return {
//         ...state,
//         categories: updateCategories,
//       };
//     }
//     case types.SET_COUNTRIES: {
//       const data = action.payload;
//       let updateCountries = data
//       if (data && data.length > 0) {
//         updateCountries = data.map((x: { country: any; }) => { return { ...x, itemName: x.country } })
//       }
//       return {
//         ...state,
//         countries: updateCountries,
//       };
//     }
//     default: {
//       return { ...state };
//     }
//   }
// }

const homeSlice = createSlice({
  name: 'home',
  initialState: initial_state,
  reducers: {
    updateHomeData: (state, action: PayloadAction<any>) => {
      state.appMainData = action.payload;
    },
    updateLocationData: (state, action: PayloadAction<any>) => {
      state.location = action.payload;
    },
    updateConstCurrLocData: (state, action: PayloadAction<any>) => {
      state.constCurrLoc = action.payload;
    },
    updateProfileAddress: (state, action: PayloadAction<any>) => {
      state.profileAddress = action.payload;
    },
    updateDineInType: (state, action: PayloadAction<any>) => {
      state.dineInType = action.payload;
    },
    updateCategories: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload.length > 0) {
        state.categories = action.payload.map((x: {category: any}) => {
          return {...x, itemName: x.category};
        });
      }
    },
    updateCountries: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload.length > 0) {
        state.countries = action.payload.map((x: {country: any}) => {
          return {...x, itemName: x.country};
        });
      }
    },
  },
});

export const {
  updateHomeData,
  updateLocationData,
  updateConstCurrLocData,
  updateProfileAddress,
  updateDineInType,
  updateCategories,
  updateCountries,
} = homeSlice.actions;
export default homeSlice.reducer;
