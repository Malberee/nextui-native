# nextui-native

I'm just trying to replicate the design and some functionality of NextUI for React Native.
Many of the components do not have the full functionality of the original NextUI library.

Here is a list of some of the components that have already been implemented:

- [x] Button
- [x] Checkbox
- [x] Chip
- [x] Input
- [x] Progress
- [x] CircularProgress
- [x] Radio
- [x] Slider
- [x] Spinner
- [x] Switch

## Installation

Follow the [instructions](https://www.nativewind.dev/v4/getting-started/react-native) for installing NativeWind v4

#### Install nextui-native

```sh
# npm
npm install @malberee/nextui-native

# yarn
yarn add @malberee/nextui-native
```

#### Modify your tailwind.config.js

```diff
// tailwind.config.js

+ const { nextui } = require("@malberee/nextui-native/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  darkMode: "class",
+  plugins: [nextui()] ,
}
```

## Usage

```js
import { Button } from '@malberee/nextui-native'

// ...

<Button color="success" variant="flat">
  Button
</Button>
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
