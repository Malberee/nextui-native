import { renderFn } from '@/utilities'
import React, { forwardRef } from 'react'
import { View } from 'react-native'

import { type UseSliderThumbProps, useSliderThumb } from './hooks'

export interface SliderThumbProps extends UseSliderThumbProps {}

const SliderThumb = forwardRef<View, SliderThumbProps>((props, ref) => {
  const { getThumbProps, renderThumb, index } = useSliderThumb({
    ...props,
    ref,
  })

  const thumbProps = {
    ...getThumbProps(),
    index,
    children: <View className="absolute size-12 bg-transparent" />,
  }

  const content = renderFn({
    Component: View,
    props: thumbProps,
    renderCustom: renderThumb,
  }) as React.ReactElement

  return content
})

SliderThumb.displayName = 'NextUI.SliderThumb'

export default SliderThumb
