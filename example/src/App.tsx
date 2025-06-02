import { Spinner } from '@malberee/heroui-native'
import { StyleSheet, View } from 'react-native'

import '../global.css'

export default function App() {
  return (
    <View style={styles.container}>
      <Spinner size="lg" />
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
