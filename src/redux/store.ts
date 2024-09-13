//@ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Define a custom middleware as an example
// const customMiddleware = (storeAPI) => (next) => (action) => {
//   console.log('Custom Middleware: Dispatching action', action);
//   const result = next(action); // Pass to the next middleware or reducer
//   console.log('Custom Middleware: Next state', storeAPI.getState());
//   return result;
// };


export default configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, customMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});