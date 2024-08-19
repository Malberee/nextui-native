import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import '../global.css'

const App = () => {
  return (
    <View className="bg-background dark" style={styles.container}>
      <Text>Test</Text>
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
