import { rem } from 'nativewind'
import React, { type FC } from 'react'
import { View } from 'react-native'

interface StripesProps {
  width: number
}

const Stripes: FC<StripesProps> = ({ width }) => {
  const length = width / (rem.get() / 2) / 2

  return (
    <View className="absolute top-1/2 h-[30px] -translate-y-1/2 flex-row gap-4">
      {Array.from({ length }).map((_, index) => (
        <View key={index} className="h-full w-2 -rotate-45 bg-black/10" />
      ))}
    </View>
  )
}

export default Stripes
