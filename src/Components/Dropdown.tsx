import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { textScale, width } from '../styles/responsiveSize';

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  onSelect: (value: any) => void;
  placeholder?: string;
  value: any | any[];
  title?: string;
  multiSelect?: boolean;
}

const Dropdown: React.FC<Props> = ({ options, onSelect, placeholder = `Select`, value, title = "", multiSelect = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedItem: Option) => {
    if (multiSelect) {
      let newValue;
      if (Array.isArray(value) && value.some(item => item.value === selectedItem.value)) {
        newValue = value.filter(item => item.value !== selectedItem.value);
      } else {
        newValue = Array.isArray(value) ? [...value, selectedItem] : [selectedItem];
      }
      onSelect(newValue);
    } else {
      onSelect(selectedItem);
      setIsOpen(false);
    }
  };

  const isSelected = (item: Option) => {
    return multiSelect ? Array.isArray(value) && value.some(selectedItem => selectedItem.value === item.value) : value?.value === item.value;
  };

  return (
    <View style={styles.container}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownToggle}>
        <Text style={styles.placeholder}>
          {multiSelect 
            ? (Array.isArray(value) && value.length ? value.map(item => item.label).join(', ') : `Select ${title}`)
            : (value?.label || `Select ${title}`)}
        </Text>
        <Image style={{transform: [{ rotate: isOpen ? '180deg':'1deg' }],marginLeft:moderateScale(10)}} tintColor={colors.black} source={imagePath.downArrow}/>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={{ maxHeight: moderateScale(150) }} nestedScrollEnabled>
            {options.map((item: Option) => (
              <TouchableOpacity key={item.value} onPress={() => handleSelect(item)} style={{...styles.option,backgroundColor: isSelected(item) ? colors.themeColor2 : colors.backgroundGreyC}}>
                <Text style={{ color: colors.black }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdownToggle: {
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: moderateScale(5),
    minWidth: moderateScale(150),
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  placeholder: {
    textTransform: 'capitalize',
    fontSize: textScale(14),
    fontFamily: fontFamily.ProximaNovaMedium,
    color: colors.black,
    flex:1,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 1,
    backgroundColor: colors.backgroundGreyC,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    minWidth: moderateScale(150),
  },
  option: {
    padding: moderateScale(10),
    width: moderateScale(width - 48),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: textScale(14),
    fontFamily: fontFamily.ProximaNovaBold,
    color: colors.black,
    marginVertical: moderateScale(12),
  },
});

export default Dropdown;
