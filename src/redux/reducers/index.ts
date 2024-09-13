import { combineReducers } from '@reduxjs/toolkit';
import types from '../types';
import appTheme from './appTheme';
import auth from './auth';
import home from './home';
import initBoot from './initBoot';
const appReducer = combineReducers({
  auth,
  appTheme,
  initBoot,
  home
});

const rootReducer = (state: any, action: any) => {
  if (action.type === types.CLEAR_REDUX_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
