//@ts-nocheck
import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import commonStylesFun from '../styles/commonStyles';

const GradientButton = ({
  containerStyle = {},
  btnStyle = {},
  //colorsArray = [themeColors?.primary_color, themeColors?.primary_color],
  borderRadius = 13,
  onPress,
  btnText,
  marginTop = 0,
  marginBottom = 0,
  textStyle = {},
  indicator = false,
  // endcolor = {},
  // startcolor = {},
  // colorsArray = null,
  indicatorColor = '#0000ff',
  disabled = false,
}) => {
  const {appStyle} = useSelector(state => state?.initBoot);

  const fontFamily = appStyle?.fontSizeData;
  // const buttonTextColor = themeColors;
  const commonStyles = commonStylesFun({
    fontFamily,
    buttonTextColor: '#41A2E6',
  });
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...commonStyles.buttonRect,
        borderWidth: 0,
        marginTop,
        marginBottom,
        ...containerStyle,
      }}
      onPress={onPress}>
      <LinearGradient
        start={{x: 0.0, y: -1.5}}
        end={{x: 0.5, y: 1.0}}
        // end={endcolor}
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          borderRadius,
          ...btnStyle,
        }}
        colors={['#5f2f9d', '#5f2f9d']}>
        {!!indicator ? (
          <ActivityIndicator size="small" color={indicatorColor} />
        ) : (
          <Text
            style={[
              {
                ...commonStyles.buttonTextWhite,
                ...textStyle,
                fontFamily: appStyle?.fontSizeData.openSansMedium,
              },
            ]}>
            {btnText}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default React.memo(GradientButton);
