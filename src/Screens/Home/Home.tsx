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
import MyAdsComponent from '../../Components/MyAdsComponent';
import {
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import actions from '../../redux/actions';
import stylesFun from './styles';
import {GET_GLOBAL_ADS_FILTER, GET_POST_BY_FILTER} from '../../config/urls';



export default function Home({route, navigation}) {
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
  const [isLoadingAds, setLoadingAds] = useState(false);
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
    newOrused:''
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
    const {
      category = 'All',
      subcategory = 'All',
      country = 'All',
      state = 'All',
      district = 'All',
      make = '',
      model = '',
      yearOfManufactureFrom = '',
      yearOfManufactureTo = '',
      mileageFrom = '',
      mileageTo = '',
      priceFrom = '',
      priceTo = '',
      neighbourHood = 'All',
      ownerOrDealer = '',
      newOrused=''
    } = filterData;

    console.log('filterData::', filterData);
    if (!footerLoader) {
      setLoading(true);
    }

    let apiName = !userData?.auth_token
      ? GET_GLOBAL_ADS_FILTER
      : GET_POST_BY_FILTER;

    let apiUrl = `${apiName}?category=${category}&subcategory=${subcategory}&country=${country}&state=${state}&district=${district}&page=${page}&offset=${50}`;
    if (neighbourHood) {
      apiUrl += `&neighbourHood=${neighbourHood}`;
    }
    if (make) {
      apiUrl += `&make=${make}`;
    }
    if (model) {
      apiUrl += `&model=${model}`;
    }
    if (ownerOrDealer) {
      apiUrl += `&ownerOrDealer=${ownerOrDealer}`;
    }
    if (newOrused) {
      apiUrl += `&newOrused=${newOrused}`;
    }
    if (yearOfManufactureFrom) {
      apiUrl += `&yearOfManufactureFrom=${yearOfManufactureFrom}`;
    }
    if (yearOfManufactureTo) {
      apiUrl += `&yearOfManufactureTo=${yearOfManufactureTo}`;
    }
    if (mileageFrom) {
      apiUrl += `&mileageFrom=${mileageFrom}`;
    }
    if (mileageTo) {
      apiUrl += `&mileageTo=${mileageTo}`;
    }
    if (priceFrom) {
      apiUrl += `&priceFrom=${priceFrom}`;
    }
    if (priceTo) {
      apiUrl += `&priceFrom=${priceTo}`;
    }

    console.log('apiUrl::', apiUrl);

    actions
      .getPostByFilter(
        // `${apiName}?category=${category}&subcategory=${subcategory}&country=${country}&state=${state}&district=${district}&page=${page}&offset=${5}`,
        apiUrl,
      )
      .then(res => {
        // debugger;
        console.log('backresposneres', res.data);

        if (res.status == 200) {
          if (res?.data && res?.data.length > 0) {
            console.log(res?.data, 'page', page);
            // console.log('backresposneres', res.data);

            setLoading(false);
            if (page > 1) {
              setAdsArray([...adsArray, ...res.data]);
              console.log('backresposne', res.data);
            } else {
              setAdsArray(res.data);
            }
          } else {
            setLoading(false);
            if (page > 1) {
              setAdsArray(adsArray);
            } else {
              setAdsArray([]);
            }
            setEndPagination(true);
          }
        }
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
    console.log(err);
  };

  //Pull to refresh
  const handleRefresh = () => {
   //setPage(0)
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
    return moveToNewScreen(navigationStrings.GET_ADS_DETAILS, {
      item,
      isEditButton: false,
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
      <> 
      <MyAdsComponent
        data={item}
        index={index}
        onPress={() => loginPopup(item)}
        navigation={navigation}
        cardStyle={{padding: 0}}
      />
    

       
    
      </>
     
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
      moveToNewScreen(navigationStrings.POST_NEW_ADD, {})();
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

  const newArray = adsArray
  const updaetAdIten = adsArray.forEach((x,index) =>{
    let Itemindex  = index+1
    if(Itemindex > 2 && Itemindex % 9 === 0 && x?.id !== 'ads'){
   	 newArray.splice(index,0,{ id: "ads" }); 
    }
  })

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
          searchIconRight={true}
          leftIcon={imagePath.filter}
          centerTitle={strings.ADS}
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
          rightIcon={userData && userData?.auth_token ? imagePath.add : null}
        />

        <View style={{...commonStyles.headerTopLine}} />
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}>
            {/* <InterstitialAdsScreen  /> */}
           
          {/* <TopSection /> */}
          <FlatList
            ref={_scrollRef}
            data={newArray}
            extraData={newArray}
             // set number of columns 
            
          
            renderItem={renderOrders}
            keyExtractor={(item, index) => String(index)}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{
              flexGrow: 1,
              marginHorizontal: 4,
              flexWrap:'wrap',
              flexDirection:'row',
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
