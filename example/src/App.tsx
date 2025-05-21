import { Button } from '@malberee/nextui-native'
import { StyleSheet, View } from 'react-native'

import '../global.css'

export default function App() {
  return (
    <View style={styles.container}>
      <Button>Button</Button>
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
