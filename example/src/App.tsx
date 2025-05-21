import { Text, View, StyleSheet } from 'react-native';
import { multiply } from '@malberee/nextui-native';
import '../global.css';

const result = multiply(3, 7);

export default function App() {
  return (
    <View style={styles.container}>
      <Text className="px-4 py-2 bg-blue-500 rounded-full text-white">
        Result: {result}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
