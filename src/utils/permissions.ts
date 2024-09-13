// import {useNavigation} from '@react-navigation/native';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import strings from '../constants/lang';
export const androidCameraPermission = () =>
  new Promise(async (resolve, _reject) => {
    try {
      console.log('Platform.Version', Platform.Version);
      if (Platform.OS === 'android' && Platform.Version > 22) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          'android.permission.READ_MEDIA_IMAGES',
        ]);
        console.log(granted, 'the granted value');

        if (
          granted['android.permission.CAMERA'] !== 'granted' ||
          ((granted['android.permission.WRITE_EXTERNAL_STORAGE'] !==
            'granted' ||
            granted['android.permission.READ_EXTERNAL_STORAGE'] !==
              'granted') &&
            granted['android.permission.READ_MEDIA_IMAGES'] !== 'granted')
        ) {
          Alert.alert(
            strings.ALERT,
            strings.CAMERA_PERMISSION_DENIED_MSG,
            [{text: strings.OK}],
            {cancelable: true},
          );
          return resolve(false);
          // alert(strings.DO_NOT_HAVE_PERMISSIONS_TO_SELECT_IMAGE);
        }
        return resolve(true);
      }

      return resolve(true);
    } catch (error) {
      return resolve(false);
    }
  });
