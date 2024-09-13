// /* eslint-disable @typescript-eslint/no-unused-vars */
// //@ts-nocheck
// import {
//   CHANGE_PASSWORD,
//   CONTACT_API,
//   CONTACT_US,
//   EDIT_PROFILE,
//   FAQ,
//   FORGOT_API,
//   FORGOT_PASSWORD,
//   GET_CURRENT_USER,
//   LOGIN_API,
//   NEED_HELP,
//   PROFILE_BASIC_INFO,
//   RESEND_OTP,
//   SEND_OTP,
//   SIGN_UP_API,
//   UPDATE_PASSWORD,
//   USER_AUTH_CHECK,
//   VERIFY_ACCOUNT,
//   VIEW_DATA,
//   UPLOAD_PROFILE_IMAGE,
//   SOCAIL_LOGIN_API,
//   RESET_PASSWORD,
//   SEND_REFFERAL_CODE,
//   // GET_ALL_SUBSCRIPTION_PLANS,
//   SELECT_SPECIFIC_PLAN,
//   PURCHASE_SPECIFIC_PLAN,
//   GET_LOYALTY_INFO,
//   CANCEL_SPECIFIC_PLAN,
//   LOGIN_BY_USERNAME,
//   PHONE_LOGIN_OTP,
//   UPLOAD_PHOTO,
//   USER_INITIAL_SETTINGS,
//   // USER_SHOW_MOBILE_NUMBER,
//   USER_DETAILS_BY_ID,
//   UPDATE_PROFILE,
//   CHECK_USER_MOBILE_STATUS,
//   CREATE_REQUEST_SHOW_MOBILE,
//   UPDATE_PROFILE_PIC,
//   UPLOAD_PROFILE_PIC,
// } from '../../config/urls';
// import {apiGet, apiPost, clearUserData, setUserData} from '../../utils/utils';
// import store from '../store';
// import types from '../types';
// console.log('dispatch', JSON.stringify(store ?? {}));

// export const saveUserData = data => {
//   dispatch({
//     type: types.LOGIN,
//     payload: data,
//   });
// };

// const saveViewData = data => {
//   dispatch({
//     type: types.SAVE_VIEW_DATA,
//     payload: data,
//   });
// };

// export const signUpApi = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(SIGN_UP_API, data, headers)
//       .then(res => {
//         if (res?.error === false) {
//           if(res?.existingUser?.mobileValidated){
//             const userData = {
//               auth_token: res?.data,
//               profile: res?.existingUser,
//             };
//             setUserData(userData).then(suc => {
//               saveUserData(userData);
//               resolve(res);
//             });
//           }
//           resolve(res);
//         } else {
//           resolve(res);
//         }
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };
// export const updateUserProfile = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(UPDATE_PROFILE, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const onSendOTP = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(SEND_OTP, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const forgotApi = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(FORGOT_API, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// //Refferal code
// export const sendRefferalCode = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(SEND_REFFERAL_CODE, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// //socail login

// export const socailLogin = (query = '', data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(SOCAIL_LOGIN_API + query, data, headers)
//       .then(res => {
//         setUserData(res.data).then(suc => {
//           saveUserData(res.data);
//           resolve(res);
//         });
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const login = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(LOGIN_API, data, headers)
//       .then(res => {
//         if (res?.error === false) {
//           if(res?.userDetail?.mobileValidated == true){
//             const userData = {
//               ...res?.userDetail,
//               auth_token: res?.data,
//               profile: res?.userDetail,
//             };
//             setUserData(userData).then(suc => {
//               saveUserData(userData);
             
//             });
//            return resolve(res);
//           }
//           resolve(res);
//         } else {
//           resolve(res);
//         }
//       })
//       .catch(error => {
//         console.log(error, JSON.stringify(error));
//         reject(error);
//       });
//   });
// };
// export const loginUsername = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(LOGIN_BY_USERNAME, data, headers)
//       .then(res => {
//         setUserData(res.data).then(suc => {
//           saveUserData(res.data);
//           resolve(res);
//         });
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const verifyAccount = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(VERIFY_ACCOUNT, data, headers)
//       .then(res => {
//         if (res?.error === false) {
//           if(res?.userDetail?.mobileValidated == true){
//             const userData = {
//               ...res?.userDetail,
//               auth_token: res?.data,
//               profile: res?.userDetail,
//             };
//             setUserData(userData).then(suc => {
//               saveUserData(userData);
             
//             });
//            return resolve(res);
//           }
//           resolve(res);
//         } else {
//           resolve(res);
//         }
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const phoneloginOtp = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(PHONE_LOGIN_OTP, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const resendOTP = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(RESEND_OTP, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const getViewData = data => {
//   return new Promise((resolve, reject) => {
//     apiPost(VIEW_DATA)
//       .then(res => {
//         saveViewData(res.data);
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const editProfile = data => {
//   return new Promise((resolve, reject) => {
//     const headers = {'Content-Type': 'multipart/form-data'};
//     apiPost(EDIT_PROFILE, data, headers)
//       .then(res => {
//         const userData = store.getState().auth.userData;
//         const updatedUserData = {
//           ...userData,
//           ...res.data,
//           profile: {...res.data},
//         };
//         saveUserData(updatedUserData);
//         setUserData(updatedUserData);
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };
// export const editUpdateProfile = data => {
//   return new Promise((resolve, reject) => {
//     const headers = {'Content-Type': 'multipart/form-data'};
//     apiPost(UPDATE_PROFILE_PIC, data, headers)
//       .then(res => {
//         console.log(res,"editUpdateProfile")
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     apiGet(GET_CURRENT_USER)
//       .then(res => {
//         const userData = store.getState().auth.userData;
//         const updatedUserData = {...userData, ...res.data};
//         saveUserData(updatedUserData);
//         setUserData(updatedUserData);
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export function updatePassword(data) {
//   return apiPost(UPDATE_PASSWORD, data);
// }

// export const getContactData = () => {
//   return new Promise((resolve, reject) => {
//     apiGet(CONTACT_API)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const profileBasicInfo = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(PROFILE_BASIC_INFO, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const changePassword = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(CHANGE_PASSWORD, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const uploadProfileImage = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(UPLOAD_PROFILE_IMAGE, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const contactUs = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(CONTACT_US, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export function updateProfile(res) {
//   setUserData(res).then(suc => {
//     dispatch({
//       type: types.LOGIN,
//       payload: res,
//     });
//   });
// }

// export const resetPassword = (data, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiPost(RESET_PASSWORD, data, headers)
//       .then(res => {
//         console.log(res, 'response');
//         resolve(res);
//       })
//       .catch(error => {
//         console.log(error, 'error');
//         reject(error);
//       });
//   });
// };

// export const getLoginHelp = () => {
//   return apiPost(NEED_HELP, {});
// };

// export const getFaq = () => {
//   return apiGet(FAQ);
// };

// export function forgotPassword(data) {
//   return apiPost(FORGOT_PASSWORD, data);
// }

// export function logout() {
//   dispatch({type: types.CLEAR_REDUX_STATE});
//   clearUserData();
// }

// export function userLogout() {
//   clearUserData();
//   dispatch({
//     type: types.USER_LOGOUT,
//   });
// }

// export function userAuthCheck() {
//   return apiGet(USER_AUTH_CHECK);
// }

// //get all subscriptions
// export function getAllUserSettings(data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiGet(USER_INITIAL_SETTINGS, data, headers)
//       .then(res => {
//         dispatch({
//           type: types.USER_STTINGS,
//           payload: res?.data,
//         });
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// export function getUserProfileData(query, data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiGet(USER_DETAILS_BY_ID + query, data, headers)
//       .then(res => {
//         const userData = store.getState().auth.userData;
//         const updatedUserData = {
//           ...userData,
//           ...res.data,
//           profile: {...res.data},
//         };
//         saveUserData(updatedUserData);
//         setUserData(updatedUserData);
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// export function getUserProfileById(query, data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiGet(USER_DETAILS_BY_ID + query, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }
// export function checkShowMobileStatus(query, data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiGet(CHECK_USER_MOBILE_STATUS + query, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //get all subscriptions
// export function showUserMobileNumber(apiName, data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiPost(apiName, data, headers)
//       .then(res => {
//         dispatch({
//           type: types.USER_STTINGS,
//           payload: {...data, ...res?.data},
//         });
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //get all subscriptions
// export function createRequestForMobile(data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiPost(CREATE_REQUEST_SHOW_MOBILE, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //Select specific subscription
// export function selectSpecificSubscriptionPlan(
//   query = '',
//   data = {},
//   headers = {},
// ) {
//   return new Promise((resolve, reject) => {
//     apiGet(SELECT_SPECIFIC_PLAN + query, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //Purchase subscription plan
// export function purchaseSubscriptionPlan(query = '', data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiPost(PURCHASE_SPECIFIC_PLAN + query, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //Cancel subscription plan
// export function cancelSubscriptionPlan(query = '', data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiPost(CANCEL_SPECIFIC_PLAN + query, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// // //Renew Subscription
// // export function renewSubscriptionPlan(query = '', data = {}, headers = {}) {
// //   return new Promise((resolve, reject) => {
// //     apiPost(CANCEL_SPECIFIC_PLAN + query, data, headers)
// //       .then((res) => {
// //         resolve(res);
// //       })
// //       .catch((error) => {
// //         reject(error);
// //       });
// //   });
// // }

// //Get loyality info
// export function getLoyaltyInfo(data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiGet(GET_LOYALTY_INFO, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// export function imageUpload(url, data = {}, headers = {}) {
//   return apiPost(UPLOAD_PHOTO + url, data, headers);
// }


// export function profileImageUpload(data = {}, headers = {}) {
//   return apiPost(UPLOAD_PROFILE_PIC, data, headers);
// }
