// export const API_BASE_URL = 'https://ibids.in/api';
// export const API_BASE_URL = 'https://demoapi.ibids.in/api';
export const API_BASE_URL = 'https://api.ibids.in/api';
// export const API_UPLOAD_URL = 'https://ibids.in/uploads/';
export const API_UPLOAD_URL = 'https://api.ibids.in/uploads/';

// export const API_UPLOAD_URL = 'https://demoapi.ibids.in/uploads/';
export const getApiUrl = (endpoint: string) => API_BASE_URL + endpoint;
export const GET_POST_BY_FILTER = getApiUrl('/posts/filter');
export const GET_GLOBAL_ADS_FILTER = getApiUrl('/globalAds');

export const GET_ADDRESS_COUNTRY = getApiUrl('/address/getCountry');
export const GET_POST_CATEGORY = getApiUrl('/posts/category');
export const GET_POST_SUB_CATEGORY = getApiUrl('/posts/subcategory');

export const GET_POST_STATE = getApiUrl('/address/getState');
export const GET_POST_DISTRICT = getApiUrl('/address/getDistrict');
export const GET_ALL_NEIGHBOUR = getApiUrl('/address/getNeighbourhood');
export const GET_ALL_MAKES = getApiUrl('/manufacturer/getMakes');
export const GET_ALL_MODEL = getApiUrl('/manufacturer/getModels');
export const GET_ALL_YEAR = getApiUrl('/posts/manufacturingYears');
export const ADD_POST = getApiUrl('/posts');
export const GET_MY_POST = getApiUrl('/posts/myPosts');
export const GET_ADS_DETAILS = getApiUrl('/posts/post');
export const GET_ADS_UID_DETAILS = getApiUrl('/posts/postUID');
export const GET_CASH_PRIZE_ADS_UID_DETAILS = getApiUrl('/cashprizeposts/postUID');

export const GET_CASH_PRIZE_ADS_ID_DETAILS = getApiUrl('/cashprizeposts/post');
export const SEARCH_POST = getApiUrl('/posts/searchAds');

export const GET_BID_BIDS = getApiUrl('/bid/getBids');
export const GET_ALL_BIDS = getApiUrl('/bid/getBids');

export const GET_MINE_BIDS = getApiUrl('/bid/getUserBids');
export const GET_CASH_PRIZE_ALL_BIDS = getApiUrl('/cashprizebid/getBids');
export const GET_CASH_PRIZE_WINNER_LIST = getApiUrl('/cashprizebid/winnersList');

export const GET_CASH_PRIZE_USERS_BIDS = getApiUrl('/cashprizebid/getUserBids')
export const EDIT_ADS_DETAILS = getApiUrl('/posts/edit');
export const POST_BID = getApiUrl('/bid');
export const CASH_PRIZE_POST_BID = getApiUrl('/cashprizebid');
export const CASH_PRIZE_CLOSE_BID = getApiUrl('/cashprizebid/closeBid');
export const FINAL_CALL = getApiUrl('/bid/finalCall');
export const CLOSE_BID = getApiUrl('/bid/closeBid');
export const CASH_PRIZE_FINAL_CALL = getApiUrl('/cashprizebid/finalCall');
export const GET_MEDIA_UPDATE = getApiUrl('/gallery/mediaUpdate');

export const GET_ADS_MEDIA_DETAILS = getApiUrl('/gallery/media');
export const DELETE_MEDIA = getApiUrl('/gallery/remove');
export const DELETE_POST_ADS = getApiUrl('/posts/deletead');

export const GET_NOTIFICATION_LIST = getApiUrl('/notification');
export const CHANGE_NOTIFICATION_STATUS = getApiUrl('/request/status');
export const USER_INITIAL_SETTINGS = getApiUrl('/user/getAll_User_Settings');
export const USER_SHOW_MOBILE_NUMBER = getApiUrl('/user/showMobileNumber');
export const USER_SHOW_EMAIL = getApiUrl('/user/showEmail');
export const USER_SHOW_ADDRESS = getApiUrl('/user/showAddress');

export const USER_DETAILS_BY_ID = getApiUrl('/user/id');
export const UPDATE_PROFILE = getApiUrl('/user/editProfile');
export const CHECK_USER_MOBILE_STATUS = getApiUrl('/request/status');

export const CREATE_REQUEST_SHOW_MOBILE = getApiUrl('/request');

export const SEND_OTP = getApiUrl('/auth/signin/otp/phone/send');

export const LOGIN_BY_USERNAME = getApiUrl('/auth/loginViaUsername');
export const PHONE_LOGIN_OTP = getApiUrl('/auth/verify/phoneLoginOtp');
export const LOGIN_API = getApiUrl('/auth/signin');
export const SIGN_UP_API = getApiUrl('/auth/signup');
export const FORGOT_API = getApiUrl('/auth/forgotPassword');
export const APP_INITIAL_SETTINGS = getApiUrl('/header');
export const HOMEPAGE_DATA_URL = getApiUrl('/homepage');
export const GET_DATA_BY_CATEGORY = getApiUrl('/category');
export const GET_PRODUCT_DATA_BY_PRODUCTID = getApiUrl('/product');
export const GET_PRODUCT_DATA_BY_VENDORID = getApiUrl('/vendor');
export const GET_PRODUTC_DATA_BY_BRANDID = getApiUrl('/brand');
export const CHECK_VENDORS = getApiUrl('/checkIsolateSingleVendor');
export const GET_WISHLIST_PRODUCT = getApiUrl('/wishlists');
export const ADD_REMOVE_TO_WISHLIST = getApiUrl('/wishlist/update');
export const PROFILE_BASIC_INFO = getApiUrl('/update/profile');
export const UPDATE_PROFILE_PIC = getApiUrl('/user/updateProfilePic');
export const UPLOAD_PROFILE_IMAGE = getApiUrl('/update/image');
export const CHANGE_PASSWORD = getApiUrl('/user/changePassword');
export const CONTACT_US = getApiUrl('/contact-us');
export const VERIFY_ACCOUNT = getApiUrl('/auth/signin/otp/phone/verify');
export const RESEND_OTP = getApiUrl('/auth/signin/otp/phone/resend');
export const INCREASE_ITEM_QNT = getApiUrl('/cart/increaseItem');
export const DECREASE_ITEM_QNT = getApiUrl('/cart/decreaseItem');
export const GET_DATA_BY_CATEGORY_FILTERS = getApiUrl('/category/filters');
export const GET_DATA_BY_VENDOR_FILTERS = getApiUrl('/vendor/filters');
export const GET_PRODUCT_DATA_BASED_VARIANTS = getApiUrl('/productByVariant');
export const GET_PRODUCT_TAGS = getApiUrl('/getAllProductTags');
export const GET_BRANDPRODUCTS_DATA_BASED_VARIANTS =
  getApiUrl('/brand/filters');
export const MY_WALLET = getApiUrl('/myWallet');
export const SOCAIL_LOGIN_API = getApiUrl('/social/login');
export const ADD_PRODUCT_TO_CART = getApiUrl('/cart/add');
export const GET_CART_DETAIL = getApiUrl('/cart/list');
export const REMOVE_CART_PRODUCTS = getApiUrl('/cart/remove');
export const UPDATE_CART = getApiUrl('/cart/updateQuantity');
export const SEARCH = getApiUrl('/search/all');
export const CLEAR_CART = getApiUrl('/cart/empty');
export const ADD_ADDRESS = getApiUrl('/user/address');
export const SEARCH_BY_CATEGORY = getApiUrl('/search/category');
export const SEARCH_BY_VENDOR = getApiUrl('/search/vendor');
export const SEARCH_BY_BRAND = getApiUrl('/search/brand');
export const UPDATE_ADDRESS = getApiUrl('/user/address');
export const GET_ALL_PROMO_CODES = getApiUrl('/promo-code/list');
export const GET_ALL_PROMO_CODES_FOR_PRODUCTLIST = getApiUrl(
  '/promo-code/vendor_promo_code',
);
export const VERIFY_PROMO_CODE = getApiUrl('/promo-code/verify');
export const RESET_PASSWORD = getApiUrl('/auth/resetPassword');
export const REMOVE_PROMO_CODE = getApiUrl('/promo-code/remove');
export const GET_ALL_CELEBRITY = getApiUrl('/celebrity');
export const GET_ADDRESS = getApiUrl('/addressBook');
export const DELETE_ADDRESS = getApiUrl('/delete/address');
export const SET_PRIMARY_ADDRESS = getApiUrl('/primary/address');
export const GET_PRODUCTS_BASED_ON_CELEBRITYFILTER =
  getApiUrl('/celebrity/filters');
export const GET_PRODUCTS_BASED_ON_CELEBRITY = getApiUrl('/celebrityProducts');
export const PLACE_ORDER = getApiUrl('/place/order');
export const GET_ORDER_DETAIL = getApiUrl('/order-detail');
export const FAWARY_ORDER_STATUS = getApiUrl('/fawary/order-status');

export const GET_ORDER_DETAIL_FOR_BILLING = getApiUrl(
  '/order/orderDetails_for_notification/',
);
export const GET_ALL_ORDERS = getApiUrl('/orders');
export const GET_VENDOR_DETAIL = getApiUrl('/vendor/category/list');
export const SEND_REFFERAL_CODE = getApiUrl('/send/referralcode');
export const GIVE_RATING_REVIEWS = getApiUrl('/rating/update-product-rating');
export const GET_RATING_DETAIL = getApiUrl('/rating/get-product-rating');
export const ACCEPT_REJECT_ORDER = getApiUrl('/update/order/status');

export const GET_ALL_VENDOR_ORDERS = getApiUrl('/mystore');
export const GET_ALL_PRODUCTSBY_STORE_ID = getApiUrl('/mystore/product/list');
export const GET_ALL_CAR_AND_PRICE = getApiUrl(
  '/pickup-delivery/get-list-of-vehicles',
);

export const PLACE_DELIVERY_ORDER = getApiUrl('/pickup-delivery/create-order');
export const LIST_OF_PAYMENTS = getApiUrl('/payment/options');
export const LIST_OF_CMS = getApiUrl('/cms/page/list');
export const CMS_PAGE_DETAIL = getApiUrl('/cms/page/detail');

export const GET_VENDOR_REVENUE = getApiUrl('/store/revenue');

export const GETWEBURL = getApiUrl('/payment');
export const SYBER_PAYMENT_URL = getApiUrl('/payment-syberpay');

export const GET_ALL_PROMO_CODES_CAB_ORDER = getApiUrl(
  '/pickup-delivery/promo-code/list',
);
export const VERIFY_PROMO_CODE_CAB_ORDER = getApiUrl(
  '/pickup-delivery/promo-code/verify',
);

export const GET_ALL_SUBSCRIPTION_PLANS = getApiUrl('/user/subscription/plans');
export const SELECT_SPECIFIC_PLAN = getApiUrl('/user/subscription/selectPlan');
export const PURCHASE_SPECIFIC_PLAN = getApiUrl('/user/subscription/purchase');
export const CANCEL_SPECIFIC_PLAN = getApiUrl('/user/subscription/cancel');
// export const RENEW_SPECIFIC_PLAN = getApiUrl('/user/subscription/cancel');

export const GET_LOYALTY_INFO = getApiUrl('/user/loyalty/info');
export const GET_RETURN_ORDER_DETAIL = getApiUrl(
  '/return-order/get-order-data-in-model',
);
export const GET_RETURN_PRODUCT_DETAIL = getApiUrl(
  '/return-order/get-return-products',
);

export const UPLOAD_PRODUCT_IMAGE = getApiUrl('/upload-file');
export const REPEAT_ORDER = getApiUrl('/repeatOrder');

export const SUBMIT_RETURN_ORDER = getApiUrl(
  '/return-order/update-product-return',
);

export const VENDOR_TABLE_CART = getApiUrl('/add/vendorTable/cart');

export const SCHEDULE_ORDER = getApiUrl('/cart/schedule/update');
export const MY_PENDING_ORDERS = getApiUrl('/my_pending_orders');
export const DISPATCHER_URL = getApiUrl(
  '/pickup-delivery/order-tracking-details',
);
export const CART_PRODUCT_SCHEDULE = getApiUrl('/cart/product-schedule/update');
export const TIP_AFTER_ORDER = getApiUrl('/orders/tip-after-order');
export const VALIDATE_PROMO_CODE = getApiUrl('/promo-code/validate_promo_code');
export const UPLOAD_PHOTO = getApiUrl('/gallery/photos');
export const UPLOAD_PROFILE_PIC = getApiUrl('/user/uploadProfilePic')
export const LAST_ADDED = getApiUrl('/cart/product/lastAdded');
export const DIFFERENT_ADD_ONS = getApiUrl(
  '/cart/product/variant/different-addons',
);
export const WALLET_CREDIT = getApiUrl('/myWallet/credit');
export const VENDOR_REGISTER = getApiUrl('/vendor/register');
export const DRIVER_REGISTER = getApiUrl('/driver/register');
export const CANCEL_ORDER = getApiUrl('/return-order/vendor-order-for-cancel');
export const WALLET_USER_VERIFY = getApiUrl('/wallet/transfer/user/verify');
export const WALLET_TRANSFER_CONFIRM = getApiUrl('/wallet/transfer/confirm');
export const VENDOR_SLOTS = getApiUrl('/vendor/slots');

export const GET_CASH_PRIZE_LIST = getApiUrl('/cashprizeglobalAds');


//fake
export const CONTACT_API = getApiUrl('/');
export const EDIT_PROFILE = getApiUrl('/');
export const FAQ = getApiUrl('/');
export const FORGOT_PASSWORD = getApiUrl('/');
export const GET_CURRENT_USER = getApiUrl('/');
export const NEED_HELP = getApiUrl('/');
export const UPDATE_PASSWORD = getApiUrl('/');
export const VIEW_DATA = getApiUrl('/');
export const USER_AUTH_CHECK = getApiUrl('/');