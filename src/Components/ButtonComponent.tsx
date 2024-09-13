import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
//@ts-ignore
import {UIActivityIndicator} from 'react-native-indicators';
import {useSelector} from 'react-redux';
import commonStylesFun from '../styles/commonStyles';
import {moderateScale } from '../styles/responsiveSize';

const TransparentButtonWithTxtAndIcon = ({
  containerStyle,
  icon,
  onPress,
  btnText,
  btnStyle,
  borderRadius,
  marginTop = 0,
  marginBottom = 0,
  textStyle = {},
  placeLoader = false,
  loaderSize = moderateScale(18),
  loaderColor = 'white',
}: any) => {
//@ts-ignore
  const {appStyle} = useSelector((state) => state?.initBoot);
  const fontFamily = appStyle?.fontSizeData;
//@ts-ignore
  const commonStyles = commonStylesFun({fontFamily});
  return (
    <TouchableOpacity
      style={{
        ...commonStyles.buttonRectCommonButton,
        borderWidth: 0,
        marginTop,
        marginBottom,
        backgroundColor: 'green',

        ...containerStyle,
      }}
      onPress={onPress}>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          borderRadius,
          flexDirection: 'row',

          ...btnStyle,
        }}>
        {icon && <Image source={icon} />}
        {placeLoader ? (
          <UIActivityIndicator size={loaderSize} color={loaderColor} />
        ) : (
          <Text
            numberOfLines={1}
            style={{...commonStyles.buttonTextWhite, ...textStyle}}>
            {btnText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TransparentButtonWithTxtAndIcon);
