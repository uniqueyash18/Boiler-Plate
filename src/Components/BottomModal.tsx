import React, { FC, ReactNode } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { textScale } from '../styles/responsiveSize';
import WrapperContainer from './WrapperContainer';
interface propTypes {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  modalStyles?:object
}
const BottomModal: FC<propTypes> = ({
  visible,
  onClose,
  children,
  title,
  modalStyles
}: propTypes) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <WrapperContainer>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={modalStyles}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:moderateScale(12)}}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
              <Image source={imagePath.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{children}</View>
        </ScrollView>
      </View>
      </WrapperContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    alignSelf: 'flex-end',
    padding:moderateScale(6)
  },
  content: {
    padding: moderateScale(12),
  },
  title: {
    fontFamily: fontFamily.ProximaNovaBold,
    fontSize: textScale(16),
    flex:1,
    textTransform: 'capitalize',
    color:colors.black
  },
});

export default BottomModal;
