import { View, Text } from 'react-native'
import React, { FC } from 'react'
interface propTypes{
    route?:{
        params:{

        }
    }
}
const Homescreen:FC<propTypes> = ({route}:propTypes) => {
  return (
    <View>
      <Text>Homescreen</Text>
    </View>
  )
}

export default Homescreen