// /* eslint-disable @typescript-eslint/no-unused-vars */
// // @ts-nocheck
// import { useDispatch } from 'react-redux';
// import {
//   // GET_NOTIFICATION_LIST,
//   // CHANGE_NOTIFICATION_STATUS,
//   GET_CASH_PRIZE_LIST,
//   GET_CASH_PRIZE_ALL_BIDS,
//   CASH_PRIZE_FINAL_CALL,
//   CASH_PRIZE_POST_BID,
//   GET_CASH_PRIZE_USERS_BIDS,
//   CASH_PRIZE_CLOSE_BID,
//   GET_CASH_PRIZE_WINNER_LIST,
// } from '../../config/urls';
// import {
//   apiPost,
//   // apiPut,
//   // setItem,
//   // getItem,
//   apiGet,
//   // apiDelete,
// } from '../../utils/utils';
// import store from '../store';
// // import types from '../types';

// const dispatch = useDispatch();

// export const getAllCashPrizeList = (query = '', data = {}, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     apiGet(GET_CASH_PRIZE_LIST, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// //Save Pist
// export function getCashPrizeBidstAds(query = '', data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiGet(GET_CASH_PRIZE_ALL_BIDS + query, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //Save Pist
// export function getCashPrizeWinnerListtAds(
//   query = '',
//   data = {},
//   headers = {},
// ) {
//   return new Promise((resolve, reject) => {
//     apiGet(GET_CASH_PRIZE_WINNER_LIST + query, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //Save Pist
// export function cashPrizePostFinalBid(data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiPost(CASH_PRIZE_FINAL_CALL, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //Save Pist
// export function getCashPrizeMyBids(query = '', data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiGet(GET_CASH_PRIZE_USERS_BIDS + query, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //Save Post
// export function cashPrizePostBid(data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiPost(CASH_PRIZE_POST_BID, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// //Save Pist
// export function cashPrizePostCloseBid(data = {}, headers = {}) {
//   return new Promise((resolve, reject) => {
//     apiPost(CASH_PRIZE_CLOSE_BID, data, headers)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }
