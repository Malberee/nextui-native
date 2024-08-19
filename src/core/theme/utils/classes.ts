/**
 * This is the base classNames for all elements.
 * Is meant to be used with the `addBase` method from tailwindcss.
 */
export const baseStyles = (prefix: string) => ({
  color: `hsl(var(--${prefix}-foreground))`,
  backgroundColor: `hsl(var(--${prefix}-background))`,
})
