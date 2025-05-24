type Extractable =
  | {
      [key: string]: any
    }
  | undefined

export const getUniqueID = (prefix: string) => {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`
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
