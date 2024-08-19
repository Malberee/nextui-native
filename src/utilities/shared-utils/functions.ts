import type { GestureResponderEvent } from 'react-native'

type Extractable =
  | {
      [key: string]: any
    }
  | undefined

type EventHandler = ((event: GestureResponderEvent) => void) | null | undefined

export const getUniqueID = (prefix: string) => {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`
}

export const combineHandlers = (...handlers: EventHandler[]): EventHandler => {
  return (event: any) => {
    handlers.forEach((handler) => {
      if (typeof handler === 'function') {
        handler(event)
      }
    })
  }
}

export function objectToDeps(obj: Extractable) {
  if (!obj || typeof obj !== 'object') {
    return ''
  }

  try {
    return JSON.stringify(obj)
  } catch (e) {
    return ''
  }
}
