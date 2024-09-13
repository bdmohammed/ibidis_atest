
//@ts-nocheck
import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import imagePath from '../../constants/imagePath';
import stylesFunc from './styles';
import moment from 'moment'
export default function CardViewNotification({ data = {}, approveClick,rejectClick }) {
  const { appStyle } = useSelector((state) => state?.initBoot);

  const fontFamily = appStyle?.fontSizeData;

  const styles = stylesFunc({ fontFamily });
  return (
    <View style={[styles.container]}>
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          justifyContent: 'flex-start',
        }}>
          <Image source={imagePath.notif} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            paddingRight: 24,
            paddingLeft: 16,
          }}>
          <Text numberOfLines={2} style={styles.mesasge}>
            {data?.message}
          </Text>
          <Text style={styles.time}>{moment(data.createdAt).fromNow()}</Text>
        </View>
      </View>
      {data?.requestStatus == 'pending' && <View style={styles.rowBack}>
        <View />
        <View />
        <TouchableOpacity
        onPress={()=>approveClick()}
          style={[styles.approve]}
        >
          <Text style={styles.backTextWhite}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.reject]}
          onPress={()=>rejectClick()}


        // onPress={() => deleteRow(rowMap, data.item.key)}
        >
          <Text style={styles.backTextWhite}>Reject</Text>

        </TouchableOpacity>
        <View />
        <View />
      </View>}


    </View>
  );
}
