import { renderFn } from '@/utilities'
import { forwardRef } from 'react'
import { Text, View } from 'react-native'

import { type UseSliderProps, useSlider } from './hooks'
import Thumb from './slider-thumb'

export interface SliderProps
  extends Omit<UseSliderProps, 'isVertical' | 'hasMarks' | 'hasSingleThumb'> {}

const Slider = forwardRef<View, SliderProps>((props, ref) => {
  const {
    state,
    label,
    steps,
    marks,
    startContent,
    endContent,
    getStepProps,
    getBaseProps,
    renderValue,
    renderLabel,
    getTrackWrapperProps,
    getLabelWrapperProps,
    getLabelProps,
    getValueProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
    getMarkProps,
    getStartContentProps,
    getEndContentProps,
  } = useSlider({ ...props, ref })

  return (
    <View {...getBaseProps()}>
      {label && (
        <View {...getLabelWrapperProps()}>
          {renderFn({
            Component: Text,
            props: getLabelProps(),
            renderCustom: renderLabel,
          })}
          {renderFn({
            Component: Text,
            props: getValueProps(),
            renderCustom: renderValue,
          })}
        </View>
      )}
      <View {...getTrackWrapperProps()}>
        {startContent && (
          <View {...getStartContentProps()}>{startContent}</View>
        )}
        <View {...getTrackProps()}>
          <View {...getFillerProps()} />
          {Number.isFinite(steps) &&
            Array.from({ length: steps }, (_, index) => (
              <View key={index} {...getStepProps(index)} />
            ))}
          {state.values.map((_, index) => (
            <Thumb key={index} {...getThumbProps(index)} />
          ))}
          {marks?.length > 0 &&
            marks.map((mark, index) => (
              <Text key={index} {...getMarkProps(mark)}>
                {mark.label}
              </Text>
            ))}
        </View>
        {endContent && <View {...getEndContentProps()}>{endContent}</View>}
      </View>
    </View>
  )
})

Slider.displayName = 'NextUI.Slider'

export default Slider
