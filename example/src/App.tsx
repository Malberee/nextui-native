import { multiply } from 'nextui-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [result, setResult] = React.useState<number | undefined>()

  React.useEffect(() => {
    multiply(3, 7).then(setResult)
  }, [])

  return (
    <View style={styles.container}>
      <Text className="scale-0 text-blue-400">Result: {result}</Text>
      <Text>text</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
