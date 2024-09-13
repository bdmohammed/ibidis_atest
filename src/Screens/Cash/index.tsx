/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  BackHandler,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constants/lang';
import navigationStrings from '../../navigation/navigationStrings';
import colors from '../../styles/colors';
import {MyDarkTheme} from '../../styles/theme';
import imagePath from '../../constants/imagePath';
import loaderOne from '../../assets/lotties/loader.json';
import commonStylesFunc from '../../styles/commonStyles';

import {androidBackButtonHandler, showError} from '../../utils/helperFunctions';
import NoDataFound from '../../Components/NoDataFound';
import {
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import actions from '../../redux/actions';
import stylesFun from './styles';
import MyCashItem from '../../Components/MyCashItem';

export default function Cash({route, navigation}) {
  const paramData = route?.params;
  const {themeColor, themeToggle} = useSelector(state => state?.initBoot);
  const darkthemeusingDevice = useDarkMode();
  const userData = useSelector(state => state?.auth?.userData);
  const [userDataProfile, setUserDataProfile] = useState(userData?.profile);
  console.log('warningPopupuserData', userData);

  const currentTheme = useSelector(state => state?.initBoot);
  const {themeColors, themeLayouts, appStyle} = currentTheme;
  const [adsArray, setAdsArray] = useState([]);
  const fontFamily = appStyle?.fontSizeData;
  const _scrollRef = createRef();

  const commonStyles = commonStylesFunc({fontFamily});
  const styles = stylesFun({fontFamily});

  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategory] = useState([]);
  const [countries, setCountries] = useState([]);

  const [filter, setFilter] = useState({
    category: 'All',
    subcategory: 'All',
    country: 'All',
    state: 'All',
    district: 'All',
    make: '',
    model: '',
    yearOfManufactureFrom: '',
    yearOfManufactureTo: '',
    mileageFrom: '',
    mileageTo: '',
    priceTo: '',
    priceFrom: '',
    neighbourHood: 'All',
    ownerOrDealer: '',
  });
  const [page, setPage] = useState(1);
  const [footerLoader, setFooterLoader] = useState(false);
  const [endPagination, setEndPagination] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [state, setState] = useState({
    isRefreshing: false,
  });
  const isfocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        androidBackButtonHandler,
      );
      return () => backHandler.remove();
    }, []),
  );

  useEffect(() => {
    console.log('backresposne');
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
     getPostByFilter({...filter});
    });
    return unsubscribe;
  }, [navigation, filter]);
  useEffect(() => {
    getAllCategory();
    getAllCountries();
    getUserProfile();
  }, []);

  useEffect(() => {
    if (userData?.country) {
      setUserDataProfile(userData);
    }
  }, [userData]);
  useEffect(() => {
    console.log('===call');
    getPostByFilter(filter, footerLoader);
  }, [page, footerLoader]);

  //Get Post Filter By All
  const getPostByFilter = (filterData, footerLoader) => {
    setEndPagination(false);
 

    console.log('filterData::', filterData);
    if (!footerLoader) {
      setLoading(true);
    }
    actions
      .getAllCashPrizeList(
        {},
      )
      .then(res => {
        // debugger;
        console.log('backresposneres', res.data);

        if (res.status == 200) {
          if (res?.data && res?.data.length > 0) {
            console.log(res?.data, 'page');
            // console.log('backresposneres', res.data);
            setLoading(false);
            setAdsArray(res.data);
          } else {
            setLoading(false)
            setAdsArray([]);
            setEndPagination(true);
          }
        }else{
          setLoading(false)
        }
        setLoading(false)
      })
      .catch(errorMethod);
  };

  //Get Post Filter By All
  const getAllCategory = () => {
    actions
      .getPostCategory()
      .then(res => {
        if (res.status == 200) {
          if (res?.data && res?.data.length > 0) {
            setCategory(
              res.data.map(x => {
                return {
                  ...x,
                  itemName: x?.category,
                };
              }),
            );
          } else {
            setAdsArray([]);
          }
        }
      })
      .catch(errorMethod);
  };

  //Get Country
  const getAllCountries = () => {
    actions
      .getAddressCountry()
      .then(res => {
        if (res.status == 200) {
          if (res?.data && res?.data.length > 0) {
            setCountries(
              res.data.map(x => {
                return {
                  ...x,
                  itemName: x?.country,
                };
              }),
            );
          } else {
            setCountries([]);
          }
        }
      })
      .catch(errorMethod);
  };

  const errorMethod = err => {
    showError(err && err?.errors && err?.errors.length && err?.errors[0]?.msg);
    setLoading(false);

  };

  //Pull to refresh
  const handleRefresh = () => {
    getPostByFilter({...filter});

  };
  //pagination of data
  const onEndReached = ({distanceFromEnd}) => {
    if (!endPagination) {
      setFooterLoader(true);
      setPage(page + 1);
    }
  };

  const loginPopup = item => {
    // if (userData?.auth_token) {
    return moveToNewScreen(navigationStrings.GET_CASH_ADS_DETAILS, {
      item,
      isEditButton: false,
      fromMyAds: userData?._id == item?.postedBy,
    })();
    // }
    // }
    // Alert.alert(
    //   'Login Required!!',
    //   'Please Login To Continue',
    //   [
    //     {
    //       text: 'Login',
    //       onPress: () => {
    //         moveToNewScreen(navigationStrings.LOGIN)();
    //       },
    //     },
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('No button clicked'),
    //       style: 'cancel',
    //     },
    //   ],
    //   {
    //     cancelable: true,
    //   },
    // );
  };
  const renderOrders = ({item, index}) => {
    return (
      <MyCashItem
        data={item}
        onPress={() => loginPopup(item)}
        navigation={navigation}
        cardStyle={{padding: 0}}
      />
    );
  };

  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  // const TopSection = () => {
  //   return (
  //     <View
  //       style={{
  //         paddingHorizontal: moderateScale(12),
  //         marginTop: moderateScaleVertical(16),
  //         paddingBottom: 8,
  //         flexDirection: 'row',
  //         justifyContent: 'space-between',
  //       }}>
  //       <View style={{flex: 0.5}}>
  //         <GradientButton
  //           borderRadius={2}
  //           containerStyle={{}}
  //           onPress={() =>
  //             moveToNewScreen(navigationStrings.FILTER_SCREEN, {
  //               categories: categories,
  //               countries: countries,
  //               filter: filter,
  //               getPostByFilter,
  //               setFilter: value => setFilter(value),
  //               setPage: () => setPage(1),
  //             })()
  //           }
  //           btnText={strings.FILTER_POST}
  //         />
  //       </View>
  //       <View style={{flex: 0.1}} />

  //       <View style={{flex: 0.5}}>
  //         <GradientButton
  //           borderRadius={2}
  //           containerStyle={{}}
  //           onPress={() =>
  //             moveToNewScreen(navigationStrings.POST_NEW_ADD, {
  //               categories: categories,
  //               countries: countries,
  //             })()
  //           }
  //           btnText={strings.POST_NEW_ADD}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {/* {!footerLoader && <ActivityIndicator
          color="#41A2E6"
          style={{ marginLeft: 8 }} />
        } */}
      </View>
    );
  };

  const onPressAddPost = () => {
    console.log('warningPopup', userDataProfile);
    if (!userDataProfile?.state || !userDataProfile?.country) {
      warningPopup();
    } else {
      moveToNewScreen('AddCash', {})();
    }
  };
  const getUserProfile = userId => {
    actions
      .getUserProfileData(`?user_id=${userId}`)
      .then(res => {
        console.log(res, 'resresresres');
      })
      .catch(() => null);
  };
  const warningPopup = () => {
    console.log('warningPopup', userDataProfile);

    Alert.alert(
      'Warning',
      'Please complete your profile.',
      [
        {
          text: 'OK',
          onPress: () => {
            moveToNewScreen(navigationStrings.EDITPROFILE, {
              fromMyProfile: true,
              userState: userDataProfile,
              getUserProfile: id => getUserProfile(id),
            })();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <>
      <WrapperContainer
        isLoadingB={isLoading}
        bgColor={
          isDarkMode ? MyDarkTheme.colors.background : colors.backgroundGrey
        }
        statusBarColor={colors.backgroundGreyC}
        source={loaderOne}>
        <Header
          onPressSearch={() => {
            moveToNewScreen(navigationStrings.SEARCH_ADS, {
              isHomePage: true,
            })();
          }}
          searchIconRight={false}
          leftIcon={false}
          centerTitle={'Cash'}
          onPressLeft={() =>
            moveToNewScreen(navigationStrings.FILTER_SCREEN, {
              categories: categories,
              countries: countries,
              filter: filter,
              getPostByFilter,
              setFilter,
              setPage: () => setPage(1),
            })()
          }
          onPressRight={() => onPressAddPost()}
          textStyle={{
            fontSize: textScale(18),
          }}
          headerStyle={{
            backgroundColor: isDarkMode
              ? MyDarkTheme.colors.background
              : colors.background,
          }}
          rightIcon={null}
        />

        <View style={{...commonStyles.headerTopLine}} />
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}>
          {/* <TopSection /> */}
          <FlatList
            ref={_scrollRef}
            data={adsArray}
            extraData={adsArray}
            numColumns={1}
            renderItem={renderOrders}
            keyExtractor={(item, index) => String(index)}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{
              flexGrow: 1,
              marginHorizontal: 4,
              marginVertical: moderateScaleVertical(20),
            }}
            refreshing={state?.isRefreshing}
            refreshControl={
              <RefreshControl
                refreshing={state?.isRefreshing}
                onRefresh={handleRefresh}
                tintColor={themeColors.primary_color}
              />
            }
            enableEmptySections={true}
            ListFooterComponent={renderFooter}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            ListEmptyComponent={
              !isLoading && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <NoDataFound
                    image={imagePath.noDataFound2}
                    isLoading={isLoading}
                    text={strings.NODATAFOUND}
                  />
                </View>
              )
            }
          />
        </View>
      </WrapperContainer>
    </>
  );
}
