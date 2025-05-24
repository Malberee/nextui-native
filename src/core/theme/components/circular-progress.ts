import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'

const circularProgress = tv({
  slots: {
    base: 'flex max-w-fit flex-col items-center justify-center gap-1',
    label: 'text-foreground',
    svgWrapper: 'relative flex flex-row items-center justify-center',
    svg: 'relative z-0 overflow-hidden',
    track: 'stroke-default-300/50 h-full',
    indicator: 'h-full',
    value: 'text-foreground absolute font-normal',
  },
  variants: {
    color: {
      default: {
        svg: 'text-default-400',
      },
      primary: {
        svg: 'text-primary',
      },
      secondary: {
        svg: 'text-secondary',
      },
      success: {
        svg: 'text-success',
      },
      warning: {
        svg: 'text-warning',
      },
      danger: {
        svg: 'text-danger',
      },
    },
    size: {
      sm: {
        svg: 'h-8 w-8',
        label: 'text-small',
        value: 'text-[0.5rem]',
      },
      md: {
        svg: 'h-10 w-10',
        label: 'text-small',
        value: 'text-[0.55rem]',
      },
      lg: {
        svg: 'h-12 w-12',
        label: 'text-medium',
        value: 'text-[0.6rem]',
      },
    },
    isIndeterminate: {
      true: {
        svg: 'animate-spinner-ease-spin',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled cursor-not-allowed',
      },
    },
    disableAnimation: {
      true: {},
      false: {
        indicator: 'transition-all !duration-500',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    isDisabled: false,
  },
  compoundVariants: [
    // disableAnimation && !isIndeterminate
    {
      disableAnimation: true,
      isIndeterminate: false,
      class: {
        svg: '!transition-none motion-reduce:transition-none',
      },
    },
  ],
})

export type CircularProgressVariantProps = VariantProps<typeof circularProgress>
export type CircularProgressSlots = keyof ReturnType<typeof circularProgress>

export { circularProgress }
