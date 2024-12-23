import { Checkbox, CheckboxGroup } from '@malberee/nextui-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import '../global.css'

const App = () => {
  return (
    <View className="bg-background dark px-4" style={styles.container}>
      <CheckboxGroup>
        <Checkbox
          value="1"
          classNames={{ wrapper: 'group-[[selected=true]]:bg-white' }}
        >
          1
        </Checkbox>
        <Checkbox
          value="2"
          classNames={{
            wrapper: 'group-[[selected=true]]:scale-150 transition-transform',
          }}
        >
          2
        </Checkbox>
        <Checkbox
          value="3"
          classNames={{ wrapper: 'group-[[selected=true]]:bg-white' }}
        >
          3
        </Checkbox>
      </CheckboxGroup>
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
