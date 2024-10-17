import { CalendarBoldIcon, Input } from '@malberee/nextui-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import '../global.css'

const App = () => {
  return (
    <View className="bg-background dark px-4" style={styles.container}>
      <Input
        color="success"
        startContent={<CalendarBoldIcon color="white" />}
      />
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
