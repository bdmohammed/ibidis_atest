/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  HOMEPAGE_DATA_URL,
  SEARCH,
  SEARCH_BY_BRAND,
  SEARCH_BY_CATEGORY,
  SEARCH_BY_VENDOR,
  GET_ADDRESS,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SET_PRIMARY_ADDRESS,
  // GET_POST_BY_FILTER,
  GET_POST_CATEGORY,
  GET_ADDRESS_COUNTRY,
  GET_POST_STATE,
  GET_POST_DISTRICT,
  ADD_POST,
  GET_MY_POST,
  GET_POST_SUB_CATEGORY,
  GET_ADS_DETAILS,
  GET_ADS_MEDIA_DETAILS,
  EDIT_ADS_DETAILS,
  DELETE_MEDIA,
  GET_BID_BIDS,
  POST_BID,
  FINAL_CALL,
  CLOSE_BID,
  // GET_GLOBAL_ADS_FILTER,
  DELETE_POST_ADS,
  GET_MEDIA_UPDATE,
  GET_ALL_BIDS,
  GET_MINE_BIDS,
  GET_ADS_UID_DETAILS,
  GET_ALL_MAKES,
  GET_ALL_YEAR,
  GET_ALL_NEIGHBOUR,
  SEARCH_POST,
  GET_ALL_MODEL,
  // GET_CASH_PRIZE_ADS_UID_DETAILS,
  GET_CASH_PRIZE_ADS_ID_DETAILS,
} from '../../config/urls';
import {apiPost, setItem, apiGet, apiDelete} from '../../utils/utils';
import { updateCategories, updateConstCurrLocData, updateCountries, updateHomeData, updateLocationData } from '../reducers/home';
import store from '../store';
import types from '../types';

const {dispatch} = store;

export const getPostByFilter = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    console.log('newAPIURL++++++', query);

    apiGet(query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getMyPostByFilter = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_MY_POST + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getPostCategory = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_POST_CATEGORY, data, headers)
      .then(res => {
        console.log(res, 'rgetPostCategorygetPostCategorygetPostCategoryes');
        dispatch(updateCategories(res.data));
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getSubCategory = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_POST_SUB_CATEGORY + query, data, headers)
      .then(res => {
        // dispatch({
        //   type: types.SET_SUB_CATEGORIES,
        //   payload: res.data,
        // });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getAddressCountry = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ADDRESS_COUNTRY, data, headers)
      .then(res => {
        dispatch(updateCountries(res.data));
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getAddressState = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_POST_STATE + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getMediaUpdate = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_MEDIA_UPDATE + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getAddressDistrict = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_POST_DISTRICT + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const getAllNeighbourList = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    console.log('requestedUrl::', GET_ALL_MAKES + query);

    apiGet(GET_ALL_NEIGHBOUR + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getAllMakesList = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_MAKES + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const getAllModelList = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_MODEL + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const getAllManufatureYearList = (
  query = '',
  data = {},
  headers = {},
) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_YEAR + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

//Save Pist
export function submitPostAds(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(ADD_POST, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// search add
export function searchGetAds(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(SEARCH_POST + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function deletePostAds(data = {}, headers = {}) {
  debugger;
  return new Promise((resolve, reject) => {
    apiDelete(DELETE_POST_ADS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
//Save Post
export function editPostAds(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(EDIT_ADS_DETAILS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Post
export function postBid(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(POST_BID, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Post
export function getAdsDetailstAds(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_ADS_DETAILS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Post
export function getCashPrizePostAdsDetailstAds(
  query = '',
  data = {},
  headers = {},
) {
  return new Promise((resolve, reject) => {
    apiGet(GET_CASH_PRIZE_ADS_ID_DETAILS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Pist
export function getAdsDetailstByUIDAds(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_ADS_UID_DETAILS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Pist
export function getBidstAds(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_BID_BIDS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Pist
export function getAllBids(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_BIDS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Pist
export function getMyBids(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_MINE_BIDS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Pist
export function postFinalBid(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(FINAL_CALL, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
//Save Pist
export function postCloseBid(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(CLOSE_BID, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Save Pist
export function getAdsMediaDetailstAds(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_ADS_MEDIA_DETAILS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function deleteAdsMediaDetailstAds(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiDelete(DELETE_MEDIA + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Get Homme banners and Category data
export function homeData(data = {}, headers = {}, isShortCode = false) {
  return new Promise((resolve, reject) => {
    apiPost(HOMEPAGE_DATA_URL, data, headers)
      .then(res => {
        if (!isShortCode) {
          console.log('goesHere', res);
          dispatch(updateHomeData(res.data));
        }
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function onGlobalSearch(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(SEARCH + query, data, headers)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function onSearchByCategory(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(SEARCH_BY_CATEGORY + query, data, headers)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function onSearchByVendor(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(SEARCH_BY_VENDOR + query, data, headers)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function onSearchByBrand(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(SEARCH_BY_BRAND + query, data, headers)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function locationData(res) {
  setItem('location', res);
  dispatch(updateLocationData(res));
}
export function constLocationData(res) {
  dispatch(updateConstCurrLocData(res));
}
export function profileAddress(res) {
  setItem('profileAddress', res)
    .then(suc => {
      dispatch(updateProfileAddress(res));
    })
    .catch(err => {});
}

export function updateProfileAddress(res) {
  setItem('profileAddress', res).then(suc=>{
    dispatch(updateProfileAddress(res));
  }).catch(err=>{

  })
}

export const addAddress = (data, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(ADD_ADDRESS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updateAddress = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiPost(UPDATE_ADDRESS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getAddress = (data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(GET_ADDRESS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const deleteAddress = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(DELETE_ADDRESS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const setPrimaryAddress = (query = '', data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    apiGet(SET_PRIMARY_ADDRESS + query, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export function dineInData(res) {
  setItem('dine_in_type', res);
  dispatch(updateDineInType(res));
}

export function imageUploadAddApi(
  url,
  data = {},
  headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
) {
  console.log(data, 'datadatadatadata>>>>>>>>>>>>>>');
  return apiPost(ADD_POST, data, headers);
}
