/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import loaderOne from '../../assets/lotties/loader.json';
//@ts-ignore
import call from 'react-native-phone-call';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang/index';
import navigationStrings from '../../navigation/navigationStrings';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import commonStylesFun from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import {showSuccess} from '../../utils/helperFunctions';
import stylesFun from './styles';
import {useDarkMode} from 'react-native-dynamic';
import {MyDarkTheme} from '../../styles/theme';
import ConfirmationModal from '../../Components/ConfirmationModal';
import { androidCameraPermission } from '../../utils/permissions';
import { API_UPLOAD_URL } from '../../config/urls';
import moment from 'moment';
import ProfilePicModal from '../../Components/ProfilePicModal';

export default function MyProfile({navigation, route}:any) {
  const theme = useSelector(state => state?.initBoot?.themeColor);
  const toggleTheme = useSelector(state => state?.initBoot?.themeToggle);
  const darkthemeusingDevice = useDarkMode();
  const userData = useSelector(state => state?.auth?.userData);
  const [userState, setUserState] = useState(userData?.profile);
  const [loader, setLoader] = useState(false);
  const [isProfilePicModal ,setIsProfilePicModal] = useState(false)
  const isDarkMode = toggleTheme ? darkthemeusingDevice : theme;
  const [mobileStatus, setShowMobileStatus] = useState(null);
  const {themeColors, appStyle, appData} = useSelector(
    state => state?.initBoot,
  );
  const fontFamily = appStyle?.fontSizeData;
  const styles = stylesFun({fontFamily, themeColors});
  const commonStyles = commonStylesFun({fontFamily});
  const [isAlertShow, setIsShowAlert] = useState(false);
  //Navigation to specific screen
  const moveToNewScreen =
    (screenName, data = {}) =>
    () => {
      navigation.navigate(screenName, {data});
    };
    const [imageProfile,setImageProfile] = useState(null)
  const appMainData = useSelector(state => state?.home?.appMainData);
  const [isLoading, setLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      _scrollRef.current.scrollTo({y: 0, animated: true});
    }, []),
  );

  useEffect(() => {
    checkStatusOfShowMobile();
  }, [userState]);

  useEffect(() => {
    const userId = route?.params?.data?.userId || userData?.profile?._id;
    getUserProfile(userId);
  }, [userData?.profile?._id]);

  const getUserProfile = userId => {
    setLoader(true);
    actions
      .getUserProfileData(`?user_id=${userId}`)
      .then(res => {
        console.log(res,"resshjdjsgdjgsjgdsd")
        setLoader(false);
       setUserState(res.data);
      })
      .catch(() => setLoader(false));
  };

  const checkStatusOfShowMobile = () => {
    setLoader(true);
    actions
      .checkShowMobileStatus(`?requestedTo=${userState?._id}`)
      .then(res => {
        console.log(res, 'requestedTorequestedTo');
        setLoader(false);
        setShowMobileStatus(res.data);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'errerr');
      });
  };
  const createRequestForNumber = () => {
    setLoader(true);
    let data = {};
    data['requestedTo'] = userState?._id;
    actions
      .createRequestForMobile(data)
      .then(res => {
        console.log(res, 'pppppppppppppp');
        showSuccess('Show Mobile request sent successfully');
        checkStatusOfShowMobile();
        setLoader(false);
      })
      .catch(() => setLoader(false));
  };

  const _scrollRef = useRef();
  const fromMyProfile = true;


  const makePhoneCall = args => call(args).catch();
  const [callNumber, setCallNumber] = useState(null);

  const confirmCall = () => {
    const args = {
      number: callNumber, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    };
    makePhoneCall(args);
    setIsShowAlert(false);
  };
  const createCallPopUp = number => {
    setCallNumber(number);
    setIsShowAlert(true);
  };


  const onImageUpload = async () => {
    const permissionStatus = await androidCameraPermission();
    console.log('permissionStatus', permissionStatus);
    if (permissionStatus || Platform.OS === 'ios') {
      Alert.alert(
        'Upload ProfilePic',
        '',
        [
         
          {text: 'Camera', onPress: () => onCamera()},
          {text: 'Gallery', onPress: () => onGallery()},
          {text: 'Cancel', onPress: () => {}},
        
        
         
        ],
        {cancelable: true},
      );
    }
  };
  const onCamera = async index => {
    try {
      let imageRes = await ImagePicker.openCamera({
        width: 100,
        height: 100,
        useFrontCamera: true,
        multiple: false,
        mediaType: 'photo',
      });
       console.log(imageRes, 'imageResimageRes');
      setImageProfile(imageRes)
      uploadImage(imageRes)
    } catch (error) {
      console.log('Image Picker error: ', error);
    }
  };
  const updateProfile =()=>{
    onImageUpload()
  }
  const uploadImage = async (val) => {
    setLoader(true);
    const imgData = new FormData();
    imgData.append('Photo', {
      uri: val?.path,
      name: 'profile.png',
      fileName: 'image',
      type: 'image/png',
    });
    try {
      const res = await actions.profileImageUpload(imgData);
       setLoader(false)
     
        showSuccess(res?.usrMsg);
        // navigation.goBack();
        getUserProfile(userData?.profile?._id)

    } catch (error) {
      console.log('erro rraised', error);
    }
  };
  const onGallery = async () => {
    try {
      let imageRes = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        multiple: false,
        cropping: true,
        mediaType: 'photo',
      });
      setImageProfile(imageRes)
      uploadImage(imageRes)
     
      // console.log(imageRes, 'imageResimageRes');
      //   uploadImage(imageRes.path);
      
    } catch (error) {
      console.log(error);
    }
  };

  const renderAddressInfo = () => {
    return (
      <View
        style={{
          marginTop: moderateScale(20),
        }}>
        <View style={{...commonStyles.headerTopLine}} />

        {userState?.houseno ||
        userState?.state ||
        userState?.country ||
        userState?.pincode ? (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 20,
            }}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                  fontSize: textScale(16),
                }}>
                Address
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 16,
              }}>
              <View style={styles.rowSpace}>
                <Text style={styles.lableStyle}>House No</Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{userState?.houseno}</Text>
              </View>

              <View style={styles.rowSpace}>
                <Text style={styles.lableStyle}>Street</Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{userState?.street}</Text>
              </View>

              <View style={styles.rowSpace}>
                <Text style={styles.lableStyle}>City/Village</Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{userState?.city}</Text>
              </View>
              {userState?.neighbourHood ? <View style={styles.rowSpace}>
                <Text style={styles.lableStyle}>Neighbourhood  </Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{userState?.neighbourHood}</Text>
              </View> : null}
              {userState?.neighbourHood ? <View style={styles.rowSpace}>
                <Text style={styles.lableStyle}>District </Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{userState?.district}</Text>
              </View> : null}
              <View style={styles.rowSpace}>
                <Text style={styles.lableStyle}>State</Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{userState?.state}</Text>
              </View>
              <View style={styles.rowSpace}>
                <Text style={styles.lableStyle}>Country</Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{userState?.country}</Text>
              </View>

              {/* <Text
                    style={{
                        color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                        fontSize: textScale(16),
                    }}
                >{
                        `${userState?.houseno},${userState?.city},${userState?.district} ,${userState?.state},${userState?.country} ,${userState?.pincode}`
                    }</Text> */}
            </View>
          </View>
        ) : (
          <View
            style={{
              paddingVertical: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '400',
                color: isDarkMode
                  ? MyDarkTheme.colors.text
                  : colors.grayOpacity51,
                fontSize: textScale(12),
              }}>
              Please Add other info
            </Text>
          </View>
        )}
      </View>
    );
  };
  console.log(userState,"userStateuserStateuserState")
  return (
    <WrapperContainer
      bgColor={
        isDarkMode ? MyDarkTheme.colors.background : colors.backgroundGrey
      }
      isLoadingB={loader}
      source={loaderOne}
      statusBarColor={colors.backgroundGrey}>
      <Header
        leftIcon={imagePath?.editBlue}
        onPressLeft={moveToNewScreen(navigationStrings.EDITPROFILE, {
          fromMyProfile: true,
          userState: userState,
          getUserProfile: id => getUserProfile(id),
        })}
        leftIconStyle={{
          height: 24,
          width: 24,
        }}
        centerTitle={fromMyProfile ? strings.MY_PROFILE : 'User Profile'}
        rightIcon={imagePath.settings}
        onPressRight={moveToNewScreen(navigationStrings.SETTIGS)}
        noLeftIcon={false}
      />

      <View style={{...commonStyles.headerTopLine}} />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.backgroundGrey,
        }}
        ref={_scrollRef}>
        <TouchableOpacity
          activeOpacity={0.1}
      
          disabled
          style={{
            marginHorizontal: moderateScale(23),
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: moderateScaleVertical(25),
          }}>
            <TouchableOpacity   
            onPress={()=>setIsProfilePicModal(true)}>
            { <FastImage
            source={{
              uri: userState?.profilepic  ? `${API_UPLOAD_URL}/${userState?.profilepic}` : 'data:image/png;base64,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',
            }}
            style={{
              height: moderateScale(60),
              width: moderateScale(60),
              borderRadius: moderateScale(60),
            }}
          />}
            <Pressable
             onPress={updateProfile}
             style={{position:'absolute',right:-5,bottom:-5,
             width:28,height:28
          }} >
                <Image 
                tintColor={'black'}
                resizeMode='contain'
                style={{width:28,height:28}}
                source={imagePath.icCamIcon} 
               
                />
            </Pressable>
            </TouchableOpacity>
        
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: moderateScale(25),
            }}>
            <Text
              style={{
                color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                fontFamily: fontFamily.bold,
                fontSize: textScale(16),
              }}>
              {userState?.username}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.regular,
                fontSize: textScale(14),
                color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                marginTop: moderateScaleVertical(5),
              }}>
              {userState?.email}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Pressable
                disabled={mobileStatus && mobileStatus?.status !== 'approved'}
                onPress={() => {
                  createCallPopUp(userState?.phone);
                }}>
                <Text
                  style={{
                    fontFamily: fontFamily.regular,
                    fontSize: textScale(14),
                    color:
                      mobileStatus && mobileStatus?.status == 'approved'
                        ? colors.themeColor
                        : colors.black,
                    marginTop: moderateScaleVertical(5),
                  }}>
                  {!fromMyProfile
                    ? userState?.phone &&
                      mobileStatus &&
                      mobileStatus?.status == 'approved'
                      ? userState?.phone
                      : `${userState?.phone.substring(0, 3)}********`
                    : userState?.phone}
                </Text>
              </Pressable>

              {!fromMyProfile && !mobileStatus ? (
                <TouchableOpacity
                  onPress={() => createRequestForNumber()}
                  style={{
                    paddingHorizontal: 16,
                    marginTop: 2,
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.regular,
                      fontSize: textScale(14),
                      color: 'blue',
                    }}>
                    {'Show'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    paddingHorizontal: 16,
                    marginTop: 2,
                  }}>
                  {!fromMyProfile && mobileStatus?.status && (
                    <Text
                      style={{
                        fontFamily: fontFamily.regular,
                        fontSize: textScale(14),
                        color: 'blue',
                      }}>
                      {mobileStatus?.status}
                    </Text>
                  )}
                </View>
              )}
            </View>

            <Text
              style={{
                fontFamily: fontFamily.regular,
                fontSize: textScale(14),
                color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                marginTop: moderateScaleVertical(5),
              }}>
              {userState?.gender}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.regular,
                fontSize: textScale(14),
                color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                marginTop: moderateScaleVertical(5),
              }}>
              {moment(userState?.dob).format('DD/MM/YYYY')}
            </Text>
          </View>
        </TouchableOpacity>

        {fromMyProfile && renderAddressInfo()}
      </ScrollView>
      {
       isProfilePicModal && <ProfilePicModal
          profilePic={`${API_UPLOAD_URL}/${userState?.profilepic}`}
          
          show={isProfilePicModal}
          clickNext={()=>{
            setIsProfilePicModal(false)
            updateProfile()
          }}
          cancel={()=> setIsProfilePicModal(false)}
        />
      }
      {isAlertShow && (
        <ConfirmationModal
          headerTitle={null}
          closeModal={() => setIsShowAlert(false)}
          ShowModal={isAlertShow}
          showBottomButton={true}
          btnText={'Call'}
          mainText={callNumber}
          bottomButtonClick={confirmCall}
          // updateStatus={(item) => updateStatus(item)}
        />
      )}
    </WrapperContainer>
  );
}
