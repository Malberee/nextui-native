import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'

const spinner = tv({
  slots: {
    base: 'relative flex-row items-center justify-center gap-2',
    wrapper: 'relative flex',
    circle1: ['absolute', 'w-full', 'h-full', 'animate-spinner-ease-spin'],
    circle2: [
      'absolute',
      'w-full',
      'h-full',
      'opacity-75',
      'animate-spinner-linear-spin',
    ],
    label: 'text-foreground dark:text-foreground-dark font-regular',
  },
  variants: {
    size: {
      sm: {
        wrapper: 'h-5 w-5',
        label: 'text-small',
      },
      md: {
        wrapper: 'h-8 w-8',
        label: 'text-medium',
      },
      lg: {
        wrapper: 'h-10 w-10',
        label: 'text-large',
      },
    },
    color: {
      white: {
        circle1: 'text-white',
        circle2: 'text-white',
      },
      default: {
        circle1: 'text-default',
        circle2: 'text-default',
      },
      primary: {
        circle1: 'text-primary',
        circle2: 'text-primary',
      },
      secondary: {
        circle1: 'text-secondary',
        circle2: 'text-secondary',
      },
      success: {
        circle1: 'text-success',
        circle2: 'text-success',
      },
      warning: {
        circle1: 'text-warning',
        circle2: 'text-warning',
      },
      danger: {
        circle1: 'text-danger',
        circle2: 'text-danger',
      },
    },
    labelColor: {
      foreground: {
        label: 'text-foreground',
      },
      primary: {
        label: 'text-primary',
      },
      secondary: {
        label: 'text-secondary',
      },
      success: {
        label: 'text-success',
      },
      warning: {
        label: 'text-warning',
      },
      danger: {
        label: 'text-danger',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    labelColor: 'foreground',
  },
})

export type SpinnerVariantProps = VariantProps<typeof spinner>
export type SpinnerSlots = keyof ReturnType<typeof spinner>

export { spinner }
