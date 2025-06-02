import { Button, CircularProgress } from '@malberee/heroui-native'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import '../global.css'

export default function App() {
  const [value, setValue] = useState(0)

  return (
    <View style={styles.container}>
      <CircularProgress size="lg" value={value} className="mb-4" />
      <Button onPress={() => setValue(value >= 100 ? 0 : value + 10)}>
        +10%
      </Button>
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
