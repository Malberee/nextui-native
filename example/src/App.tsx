import { Button, Radio, RadioGroup } from '@malberee/heroui-native'
import { StyleSheet, View } from 'react-native'

import '../global.css'

export default function App() {
  return (
    <View style={styles.container}>
      <Button radius="full">Button</Button>
      <RadioGroup>
        <Radio value="1">1</Radio>
        <Radio value="2">2</Radio>
        <Radio value="3">3</Radio>
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
