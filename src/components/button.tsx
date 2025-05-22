import type { FC } from 'react'
import { Pressable, Text } from 'react-native'

export const Button: FC<{ children: string }> = ({ children }) => {
  return (
    <Pressable className="rounded-full bg-blue-500 px-4 py-2">
      <Text className="text-white">{children}</Text>
    </Pressable>
  )
}
