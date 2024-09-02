export const safeAriaLabel = (...texts: any[]): string => {
  let ariaLabel = ' '

  for (const text of texts) {
    if (typeof text === 'string' && text.length > 0) {
      ariaLabel = text
      break
    }
  }

  return ariaLabel
}
