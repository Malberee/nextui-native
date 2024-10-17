import React from 'react'
import { StyleSheet, View } from 'react-native'

import * as Icons from '../../src/utilities/shared-icons'
import '../global.css'

const App = () => {
  const icons = Object.values(Icons)

  return (
    <View className="bg-background dark px-4" style={styles.container}>
      <View className="flex-row flex-wrap gap-2">
        {icons.map((Icon) => {
          return <Icon color="white" key={`${Icon}`} height="16" width="16" />
        })}
      </View>
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
