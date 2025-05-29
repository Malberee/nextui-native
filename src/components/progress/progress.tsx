import { forwardRef } from 'react'
import { ImageBackground, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { type UseProgressProps, useProgress } from './hooks/use-progress'
import Stripes from './stripes'

export interface ProgressProps extends UseProgressProps {}

const Progress = forwardRef<View, ProgressProps>((props, ref) => {
  const {
    slots,
    classNames,
    label,
    width,
    showValueLabel,
    isStriped,
    getProgressBarProps,
    getLabelProps,
    getIndicatorProps,
  } = useProgress({ ...props, ref })

  const progressBarProps = getProgressBarProps()

  const shouldShowLabelWrapper = label || showValueLabel

  return (
    <View {...progressBarProps}>
      {shouldShowLabelWrapper ? (
        <View
          className={slots.labelWrapper({ class: classNames?.labelWrapper })}
        >
          {label && <Text {...getLabelProps()}>{label}</Text>}
          {showValueLabel && (
            <Text className={slots.value({ class: classNames?.value })}>
              {progressBarProps['aria-valuetext']}
            </Text>
          )}
        </View>
      ) : null}
      <View className={slots.track({ class: classNames?.track })}>
        <Animated.View {...getIndicatorProps()}>
          {isStriped && (
            <ImageBackground className="h-full w-full overflow-hidden">
              <Stripes width={width} />
            </ImageBackground>
          )}
        </Animated.View>
      </View>
    </View>
  )
})

Progress.displayName = 'HeroUI.Progress'

export default Progress
