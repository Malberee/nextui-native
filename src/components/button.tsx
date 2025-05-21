import type { FC } from 'react'
import { Pressable, Text } from 'react-native'

export const Button: FC<{ children: string }> = ({ children }) => {
  return (
    <Pressable
      style={{
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: 'blue',
      }}
    >
      <Text style={{ color: 'white' }}>{children}</Text>
    </Pressable>
  )
}
