import React, { FC } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import imagePath from '../constants/imagePath'
import colors from '../styles/colors'
import fontFamily from '../styles/fontFamily'
import { textScale } from '../styles/responsiveSize'
interface Proptypes{
title:String,
isChecked:Boolean,
oncheck:() => void
}
const CheckBoxWIthTitle:FC<Proptypes> = ({title,isChecked,oncheck}:Proptypes) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',marginBottom:moderateScale(8),justifyContent:'space-between'}}>
     <Text  style={{fontSize:textScale(14),fontFamily:fontFamily.ProximaNovaRegular,color:colors.black}}>{title}</Text>
     <TouchableOpacity onPress={oncheck}>
     <Image source={ isChecked ? imagePath.ic_checked : imagePath.ic_unchecked}/>
        </TouchableOpacity>
    </View>
  )
}

export default CheckBoxWIthTitle