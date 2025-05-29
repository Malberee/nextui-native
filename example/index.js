import { registerRootComponent } from 'expo'
import { configureReanimatedLogger } from 'react-native-reanimated'

import App from './src/App'

configureReanimatedLogger({ strict: false })

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
