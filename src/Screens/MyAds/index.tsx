/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import {useFocusEffect} from '@react-navigation/native';
import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Alert,
  BackHandler,
  // Text,
  FlatList,
  RefreshControl,
  // TouchableOpacity,
  // Image,
} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constants/lang';
// import staticStrings from '../../constants/staticStrings';
import navigationStrings from '../../navigation/navigationStrings';
import colors from '../../styles/colors';
import {MyDarkTheme} from '../../styles/theme';
import imagePath from '../../constants/imagePath';
import loaderOne from '../../assets/lotties/loader.json';
import commonStylesFunc from '../../styles/commonStyles';
// import Modal from 'react-native-modal';

import {
  androidBackButtonHandler,
  // showError,
  showSuccess,
} from '../../utils/helperFunctions';
import NoDataFound from '../../Components/NoDataFound';
import MyAdsComponent from '../../Components/MyAdsComponent';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import actions from '../../redux/actions';
import GradientButton from '../../Components/GradientButton';
import stylesFun from './styles';
import {DELETE_POST_ADS} from '../../config/urls';
import axios from 'axios';
import {getHeaders} from '../../utils/utils';
import ActionSheet from '../../Components/ActionSheet';

export default function MyAdds({route, navigation}) {
  const paramData = route?.params;
  const {themeColor, themeToggle} = useSelector(state => state?.initBoot);
  const darkthemeusingDevice = useDarkMode();
  const currentTheme = useSelector(state => state?.initBoot);
  const {themeColors, themeLayouts, appStyle} = currentTheme;
  const [adsArray, setAdsArray] = useState([]);
  const [searchAdsList, setSearchAdsList] = useState([]);
  const fontFamily = appStyle?.fontSizeData;
  const _scrollRef = createRef();
  const categoriesList = useSelector(state => state?.home?.categories);
  const userData = useSelector(state => state?.auth?.userData?.profile);

  const commonStyles = commonStylesFunc({fontFamily});
  const styles = stylesFun({fontFamily});
  const [isShowLanguageOptions, setShowLanguageOptionsFlag] = useState(false);

  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategory] = useState(categoriesList);
  const [countries, setCountries] = useState([]);
  const intilaFilter = {
    category: 'All',
    subcategory: 'All',
    country: 'All',
    state: 'All',
    district: 'All',
  };
  const [selectedAds, setSelectedAds] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedAds) {
      setShowLanguageOptionsFlag(true);
    }
  }, [selectedAds]);

  const editMyAds = item => {
    if (item) {
      setShowLanguageOptionsFlag(false);
      moveToNewScreen(navigationStrings.POST_NEW_ADD, {
        itemData: item,
        gallery: [],
        isEditAd: true,
      })();
    }
  };

  const deleteAds = item => {
    if (item && item?._id) {
      setTimeout(() => {
        onClickMore(item?._id);
      }, 100);
    }
  };

  const [languagesList, setLanguageList] = useState([
    {
      label: 'Edit',
      handler: item => editMyAds(item),
      labelColor: colors.themeColor,
    },
    {
      label: 'Delete',
      handler: item => deleteAds(item),
      labelColor: colors.redB,
    },
  ]);

  const [filter, setFilter] = useState(intilaFilter);
  const [page, setPage] = useState(1);
  const [footerLoader, setFooterLoader] = useState(false);
  const [endPagination, setEndPagination] = useState(false);

  const [state, setState] = useState({
    isRefreshing: false,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getPostByFilter({...filter, fromRefesh: true});
    });

    return unsubscribe;
  }, [navigation, filter]);

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
    getPostByFilter({...filter});
    if (!categories) {
      getAllCategory();
    }
  }, []);

  useEffect(() => {
    getPostByFilter({...filter}, footerLoader);
  }, [page]);

  const replacedItem = item => {
    const {category, country, state, district} = item;
    return {
      category: category ? category.split(' ').join('+') : 'All',
      country: country ? country.split(' ').join('+') : 'All',
      state: state ? state.split(' ').join('+') : 'All',
      district: district ? district.split(' ').join('+') : 'All',
    };
  };

  //Get Post Filter By All
  const getPostByFilter = (
    {
      category = 'All',
      subcategory = 'All',
      country = 'All',
      state = 'All',
      district = 'All',
    },
    footerLoader: any,
  ) => {
    if (!footerLoader) {
      setLoading(true);
    }
    actions
      .getMyPostByFilter(
        `?category=${category}&subcategory=${subcategory}&country=${country}&state=${state}&district=${district}&page=${page}&offset=${30}`,
      )
      .then(res => {
        if (res.status == 200) {
          if (res?.data && res?.data.length > 0) {
            setLoading(false);
            if (page > 1) {
              setAdsArray([...adsArray, ...res.data]);
            } else {
              setAdsArray(res.data);
            }
          } else {
            setLoading(false);
            if (page == 1) {
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
        console.log(res, 'getAllCategory');
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
    setLoading(false);

    // showError(err?.errors[0]?.msg)
    // setLoading(false)
    console.log(err);
  };

  //Pull to refresh
  const handleRefresh = () => {
    setPage(1);
    getPostByFilter({...filter});
  };
  //pagination of data
  const onEndReached = ({distanceFromEnd}) => {
    if (!endPagination) {
      setFooterLoader(true);
      setPage(page + 1);
    }
  };
  const onSelectItem = item => {
    setSelectedAds(item);
    // showModal(false);
  };

  const renderOrders = ({item, index}) => {
   
    return (
      <View>
        <MyAdsComponent
        data={item}
        onPress={() =>
          moveToNewScreen(navigationStrings.GET_ADS_DETAILS, {
            item,
            fromMyAds: true,
            isEditButton: true,
          })()
        }
        onClickMore={() => onSelectItem(item)}
        navigation={navigation}
        cardStyle={{padding: 0}}
      />

      
  
      </View>
      
    );
  };

  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const TopSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: moderateScale(12),
          marginTop: moderateScaleVertical(16),
          paddingBottom: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.5}}>
          <GradientButton
            borderRadius={2}
            containerStyle={{}}
            onPress={() =>
              moveToNewScreen(navigationStrings.FILTER_SCREEN, {
                categories: categories,
                countries: countries,
                filter: filter,
                getPostByFilter: (
                  category,
                  subcategory,
                  country,
                  state,
                  district,
                ) =>
                  getPostByFilter(
                    category,
                    subcategory,
                    country,
                    state,
                    district,
                  ),
                setFilter: value => setFilter(value),
                setPage: () => setPage(1),
                filterBy: 'category',
              })()
            }
            btnText={strings.FILTER_POST}
          />
        </View>
        <View style={{flex: 0.1}} />

        <View style={{flex: 0.5}}>
          <GradientButton
            borderRadius={2}
            containerStyle={{}}
            onPress={() =>
              moveToNewScreen(navigationStrings.POST_NEW_ADD, {})()
            }
            btnText={strings.POST_NEW_ADD}
          />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {/* {!endPagination && <ActivityIndicator
                    color="#41A2E6"
                    style={{ marginLeft: 8 }} />} */}
      </View>
    );
  };

  const onClickMore = id => {
    Alert.alert(
      'Warning!',
      'Are you sure want to delete this?',
      [
        {text: 'Delete', onPress: () => onDelete(id)},
        {text: 'Cancel', onPress: () => {}},
      ],
      {cancelable: true},
    );
  };

  const onEdit = async () => {
    moveToNewScreen(navigationStrings.POST_NEW_ADD, {})();
  };

  const onDelete = async itemId => {
    setShowLanguageOptionsFlag(false);
    try {
      if (itemId) {
        setLoading(true);
        const data = {};
        const headers = await getHeaders();
        data['itemad_id'] = itemId;
        axios
          .delete(DELETE_POST_ADS, {
            headers,
            data: {
              itemad_id: itemId,
            },
          })
          .then(res => {
            console.log(res);
            showSuccess('Post deleted successfully');
            getPostByFilter({...intilaFilter});

            setLoading(false);
          })
          .catch(errorMethod);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setLoading(false);
    }
  };
  const onPressAddPost = () => {
    if (!userData?.state || !userData?.country) {
      warningPopup();
    } else {
      moveToNewScreen(navigationStrings.POST_NEW_ADD, {})();
    }
  };
  const getUserProfile = userId => {
    actions
      .getUserProfileData(`?user_id=${userId}`)
      .then(res => {})
      .catch(() => null);
  };
  const warningPopup = () => {
    Alert.alert(
      'Warning',
      'Please complete your profile.',
      [
        {
          text: 'OK',
          onPress: () => {
            moveToNewScreen(navigationStrings.EDITPROFILE, {
              fromMyProfile: true,
              userState: userData,
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
              isHomePage: false,
            })();
          }}
          searchIconRight={true}
          leftIcon={imagePath.filter}
          onPressLeft={() =>
            moveToNewScreen(navigationStrings.FILTER_SCREEN, {
              categories: categories,
              countries: countries,
              filter: filter,
              getPostByFilter: (category, country, state, district) =>
                getPostByFilter({category, country, state, district}),
              setFilter: value => setFilter(value),
              setPage: () => setPage(1),
            })()
          }
          onPressRight={() => {
            onPressAddPost();
          }}
          centerTitle={strings.MY_ADS}
          textStyle={{
            fontSize: textScale(18),
          }}
          headerStyle={{
            backgroundColor: isDarkMode
              ? MyDarkTheme.colors.background
              : colors.background,
          }}
          rightIcon={imagePath.add}
        />

        <View style={{...commonStyles.headerTopLine}} />
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}>
         
          <FlatList
            ref={_scrollRef}
            data={newArray}
            numColumns={2}
            extraData={newArray}
            renderItem={renderOrders}
            keyExtractor={(item, index) => String(index)}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{
              flexGrow: 1,
              marginHorizontal: 8,
              // alignItems: 'center',
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
              !state?.isLoading && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <NoDataFound
                    image={imagePath.noDataFound2}
                    isLoading={state.isLoading}
                    text={strings.NODATAFOUND}
                  />
                </View>
              )
            }
          />
        </View>
        <ActionSheet
          actions={languagesList}
          cancelText={'Cancel'}
          selectedAds={selectedAds}
          handleCancel={() => {
            setSelectedAds(null);
            setShowLanguageOptionsFlag(false);
          }}
          isVisible={isShowLanguageOptions}
          isTopLabelVisible={true}
          selectedLang={null}
        />
      </WrapperContainer>
    </>
  );
}
