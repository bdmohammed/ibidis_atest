//@ts-nocheck
import {
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

import PropTypes from 'prop-types';
import {map} from 'lodash';
import styles from './actionStyles';

function ActionSheet(props) {
  const {
    isVisible,
    handleCancel,
    cancelText,
    // topLabel,
    actions,
    // isTopLabelVisible,
    // selectedIndex,
    selectedAds,
  } = props;
  console.log(props, 'opropspsppss');
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCancel}>
      <TouchableWithoutFeedback onPress={handleCancel}>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInnerContainer}>
              {/* {isTopLabelVisible &&<Text style={styles.modalTopLabel}>{topLabel}</Text>} */}
              <FlatList
                keyExtractor={(item, index) => 'index_country' + index}
                data={actions && map(actions.filter(action => action.label))}
                renderItem={({item, index}) => {
                  return (
                    <View key={index}>
                      <View style={styles.modalSeparator} />
                      <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => item?.handler(selectedAds, item)}>
                        <Text
                          style={[
                            styles.modalActionLabel,
                            item.labelColor && {
                              color: item.labelColor,
                            },
                          ]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.modalDismissContainer}>
              <Text style={styles.modalLabelDismiss} onPress={handleCancel}>
                {cancelText}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

ActionSheet.propTypes = {
  isVisible: PropTypes.bool,
  handleCancel: PropTypes.func,
  cancelText: PropTypes.string,
  topLabel: PropTypes.string,
  actions: PropTypes.array,
  isTopLabelVisible: PropTypes.bool,
  selectedIndex: PropTypes.number,
};
ActionSheet.defaultProps = {
  isVisible: false,
  handleCancel: null,
  cancelText: 'Cancel',
  topLabel: 'Actions',
  actions: [],
  isTopLabelVisible: true,
};
export default ActionSheet;
