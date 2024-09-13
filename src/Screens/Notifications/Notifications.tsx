/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { FlatList,View ,RefreshControl} from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';
import NoDataFound from '../../Components/NoDataFound';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang/index';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import loaderOne from '../../assets/lotties/loader.json';

import { showSuccess } from '../../utils/helperFunctions';
import CardViewNotification from './CardViewNotification';
import stylesFunc from './styles';

export default function Notifications({ navigation }) {
  const currentTheme = useSelector((state) => state.appTheme);
  const { themeColors, themeLayouts } = currentTheme;
  const { appStyle } = useSelector((state) => state?.initBoot);
  const fontFamily = appStyle?.fontSizeData;
  const [isLoading, setLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const styles = stylesFunc({ themeColors, fontFamily });
  const [notifications,setNotifications] = useState([])

useEffect(()=>{
  
  getNotifications()
},[])

  const renderOrders = ({ item, index }) => {
    return <CardViewNotification 
    approveClick={()=> changeNotifyStatus(item?.requestId,'approved')}
    rejectClick={()=> changeNotifyStatus(item?.requestId,'rejected')}
    data={item} />;
  };


  const getNotifications = () =>{
    setLoading(true)
    actions
    .getNotificationsList()
    .then((res) => {
      console.log(res,"resresres")
      if (res.status == 200) {
        setIsRefreshing(false)
        console.log(res?.data,"(res?.data")
        if (res?.data &&  res?.data?.list && res?.data?.list.length > 0) {
          setNotifications(res?.data?.list)
          setTotalNotifications(res?.data?.totalNotification)
        } else {
          setNotifications([])
          setTotalNotifications(0)
        }
      }
    })
    .catch(errorMethod);

  }

  const changeNotifyStatus = (id,status) =>{
    const data ={}
    data['requestId'] = id
    data['status'] = status
    setLoading(true)
    actions
    .updateStatusNotify(data)
    .then((res) => {
      console.log(res,"ressss")
      if (res.status == 200) {
        getNotifications()
        setLoading(false)
          showSuccess('Staus update successfully')
      }
    })
    .catch(errorMethod);

  }
  const errorMethod = (err) => {
    if(err?.usrMsg){
     // showError(err?.usrMsg)

    }
    setLoading(false)
  };
//Pull to refresh
const handleRefresh = () => {
  getNotifications()
};
  return (
    <>
   
    <WrapperContainer
    isLoadingB={isLoading}
     source={loaderOne}
    
      bgColor={colors.backgroundGreyC}
      statusBarColor={colors.backgroundGreyC}>
      <Header
        leftIcon={null}
        centerTitle={strings.NOTIFICATION}
        headerStyle={{ backgroundColor: colors.backgroundGreyC }}
      />

      <View style={styles.headerLine} />
 
    
      <FlatList
        data={notifications}
        renderItem={renderOrders}
        keyExtractor={(item, index) => String(index)}
       
        disableRightSwipe
        previewRowKey={'0'}
        previewOpenDelay={3000}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={themeColors.primary_color}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={
          !isLoading && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NoDataFound
                image={imagePath.noDataFound2
                }
                isLoading={isLoading}
                text={strings.NODATAFOUND
                }
              />
            </View>
          )
        }

      />
    </WrapperContainer>
    </>
  );
}
