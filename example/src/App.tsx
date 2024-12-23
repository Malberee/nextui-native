import { Radio, RadioGroup } from '@malberee/nextui-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import '../global.css'

const App = () => {
  return (
    <View className="bg-background dark px-4" style={styles.container}>
      <RadioGroup>
        <Radio
          value="1"
          classNames={{ wrapper: 'group-[[selected=true]]:bg-white' }}
        >
          1
        </Radio>
        <Radio
          value="2"
          classNames={{ wrapper: 'group-[[selected=true]]:bg-white' }}
        >
          2
        </Radio>
      </RadioGroup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
