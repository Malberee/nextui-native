import Animated, {
  useAnimatedProps,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { Line, Polyline, Svg, type SvgProps } from 'react-native-svg'

import type { UseCheckboxReturn } from './hooks'

type CheckboxIconProps = Partial<
  ReturnType<UseCheckboxReturn['getIconProps']>
> &
  SvgProps

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline)

const CheckIcon = (props: Omit<CheckboxIconProps, 'isIndeterminate'>) => {
  const { isSelected, disableAnimation, ...otherProps } = props

  const animatedProps = useAnimatedProps(
    () => ({
      strokeDashoffset: disableAnimation
        ? isSelected
          ? 44
          : 66
        : withDelay(200, withTiming(isSelected ? 44 : 66, { duration: 250 })),
    }),
    [disableAnimation, isSelected]
  )

  return (
    <Svg role="presentation" viewBox="0 0 17 18" {...otherProps}>
      <AnimatedPolyline
        fill="none"
        points="1 9 7 14 15 4"
        stroke="currentColor"
        strokeDasharray={22}
        strokeDashoffset={isSelected ? 44 : 66}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        animatedProps={animatedProps}
      />
    </Svg>
  )
}

const IndeterminateIcon = (
  props: Omit<CheckboxIconProps, 'isIndeterminate'>
) => {
  const { isSelected, disableAnimation, ...otherProps } = props

  return (
    <Svg strokeWidth={3} viewBox="0 0 24 24" {...otherProps}>
      <Line stroke="currentColor" x1="21" x2="3" y1="12" y2="12" />
    </Svg>
  )
}

export const CheckboxIcon = (props: CheckboxIconProps) => {
  const { isIndeterminate, ...otherProps } = props
  const BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon

  return <BaseIcon {...otherProps} />
}
