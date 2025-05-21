import { multiply } from '@malberee/nextui-native'
import { StyleSheet, Text, View } from 'react-native'

import '../global.css'

const result = multiply(3, 7)

export default function App() {
  return (
    <View style={styles.container}>
      <Text className="rounded-full bg-blue-500 px-4 py-2 text-white">
        Result: {result}
      </Text>
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
