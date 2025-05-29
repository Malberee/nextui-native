import { cssInterop } from 'nativewind'
import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import Svg, { Circle, Defs, Mask } from 'react-native-svg'

import { type UseSpinnerProps, useSpinner } from './hooks/use-spinner'

export interface SpinnerProps extends UseSpinnerProps {}

cssInterop(Svg, {
  className: {
    target: 'style',
  },
})

const Spinner = forwardRef<View, SpinnerProps>((props, ref) => {
  const { size, slots, classNames, label, getSpinnerProps } = useSpinner(props)

  const sizes = {
    sm: 20,
    md: 32,
    lg: 40,
  }

  const CIRCLE_LENGTH = sizes[size as keyof typeof sizes] * 2.5
  const R = CIRCLE_LENGTH / (2 * Math.PI)

  return (
    <View ref={ref} {...getSpinnerProps()}>
      <View className={slots.wrapper({ class: classNames?.wrapper })}>
        <Svg
          className={slots.circle1({
            class: classNames?.circle1,
          })}
        >
          <Circle
            cx="50%"
            cy="50%"
            r={R}
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeDasharray={`${CIRCLE_LENGTH * 0.25} ${CIRCLE_LENGTH * 0.75}`}
            strokeDashoffset={CIRCLE_LENGTH * 0.875}
          />
        </Svg>

        <Svg
          className={slots.circle2({
            class: classNames?.circle2,
          })}
        >
          <Defs>
            <Mask id="mask">
              <Circle
                cx="50%"
                cy="50%"
                r={R}
                stroke="white"
                strokeWidth={2}
                strokeDasharray={`${CIRCLE_LENGTH * 0.25} ${CIRCLE_LENGTH * 0.75}`}
              />
            </Mask>
          </Defs>
          <Circle
            cx="50%"
            cy="50%"
            r={R}
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="0 4"
            strokeDashoffset={CIRCLE_LENGTH * 0.75}
            mask="url(#mask)"
          />
        </Svg>
      </View>
      {label && (
        <Text className={slots.label({ class: classNames?.label })}>
          {label}
        </Text>
      )}
    </View>
  )
})

Spinner.displayName = 'NextUI.Spinner'

export default Spinner
