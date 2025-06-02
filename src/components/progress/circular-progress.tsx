import { cssInterop } from 'nativewind'
import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import Svg, { Circle, type SvgProps } from 'react-native-svg'

import {
  type UseCircularProgressProps,
  useCircularProgress,
} from './hooks/use-circular-progress'

cssInterop(Svg, {
  className: {
    target: 'style',
  },
})

cssInterop(Circle, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: 'stroke',
    },
  },
})

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export interface CircularProgressProps extends UseCircularProgressProps {}

const CircularProgress = forwardRef<View, CircularProgressProps>(
  (props, ref) => {
    const {
      slots,
      classNames,
      label,
      showValueLabel,
      getProgressBarProps,
      getLabelProps,
      getSvgProps,
      getIndicatorProps,
      getTrackProps,
    } = useCircularProgress({ ref, ...props })

    const progressBarProps = getProgressBarProps()

    return (
      <View {...progressBarProps}>
        <View className={slots.svgWrapper({ class: classNames?.svgWrapper })}>
          <Svg {...(getSvgProps() as SvgProps)}>
            <Circle {...getTrackProps()} />
            <AnimatedCircle {...getIndicatorProps()} />
          </Svg>
          {showValueLabel && (
            <Text className={slots.value({ class: classNames?.value })}>
              {progressBarProps['aria-valuetext']}
            </Text>
          )}
        </View>
        {label && <Text {...getLabelProps()}>{label}</Text>}
      </View>
    )
  }
)

CircularProgress.displayName = 'HeroUI.CircularProgress'

export default CircularProgress
