import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'

const toggle = tv({
  slots: {
    base: 'group relative flex-row items-center',
    wrapper: [
      'relative',
      'flex-row',
      'items-center',
      'justify-start',
      'overflow-hidden',
      'rounded-full',
      'px-1',
    ],
    thumb: [
      'ml-0',
      'z-10',
      'flex',
      'items-center',
      'justify-center',
      'bg-white',
      'shadow-small',
      'rounded-full',
    ],
    thumbIcon: 'text-black',
    startContent: 'absolute left-1.5 z-0',
    endContent: 'text-default-600 absolute right-1.5 z-0',
    label: 'text-foreground relative',
  },
  variants: {
    size: {
      sm: {
        wrapper: 'mr-2 h-6 w-10',
        thumb: 'text-tiny h-4 w-4',
        endContent: 'text-tiny',
        startContent: 'text-tiny',
        label: 'text-small',
      },
      md: {
        wrapper: 'mr-2 h-7 w-12',
        thumb: 'text-small h-5 w-5',
        endContent: 'text-small',
        startContent: 'text-small',
        label: 'text-medium',
      },
      lg: {
        wrapper: 'mr-2 h-8 w-14',
        thumb: 'text-medium h-6 w-6',
        endContent: 'text-medium',
        startContent: 'text-medium',
        label: 'text-large',
      },
    },
    color: {
      default: {
        wrapper: 'bg-default',
        startContent: 'text-default-foreground',
      },
      primary: {
        wrapper: 'bg-primary',
        startContent: 'text-primary-foreground',
      },
      secondary: {
        wrapper: 'bg-secondary',
        startContent: 'text-secondary-foreground',
      },
      success: {
        wrapper: 'bg-success',
        startContent: 'text-success-foreground',
      },
      warning: {
        wrapper: 'bg-warning',
        startContent: 'text-warning-foreground',
      },
      danger: {
        wrapper: 'bg-danger',
        startContent: 'text-danger-foreground',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled pointer-events-none',
      },
    },
    disableAnimation: {
      true: { wrapper: 'transition-none', thumb: 'transition-none' },
      false: {
        wrapper: 'duration-250 transition-colors',
        thumb: 'duration-250 transition-[width,margin-right,margin-left]',
        startContent: 'duration-250 scale-50 transition-transform',
        endContent: 'duration-250 transition-transform',
      },
    },
    isChecked: {
      true: {
        startContent: 'scale-100',
        endContent: 'translate-x-6',
      },
      false: {
        wrapper: 'bg-default-200',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    isDisabled: false,
    isChecked: false,
    disableAnimation: false,
  },
  compoundVariants: [
    {
      size: 'sm',
      isChecked: true,
      class: { thumb: 'ml-4' },
    },
    {
      size: 'md',
      isChecked: true,
      class: { thumb: 'ml-5' },
    },
    {
      size: 'lg',
      isChecked: true,
      class: { thumb: 'ml-6' },
    },

    {
      size: 'sm',
      disableAnimation: false,
      class: { thumb: 'group-active:w-5' },
    },
    {
      size: 'md',
      disableAnimation: false,
      class: { thumb: 'group-active:w-6' },
    },
    {
      size: 'lg',
      disableAnimation: false,
      class: { thumb: 'group-active:w-7' },
    },

    {
      size: 'sm',
      disableAnimation: false,
      isChecked: true,
      class: { thumb: 'group-active:ml-3' },
    },
    {
      size: 'md',
      disableAnimation: false,
      isChecked: true,
      class: { thumb: 'group-active:ml-4' },
    },
    {
      size: 'lg',
      disableAnimation: false,
      isChecked: true,
      class: { thumb: 'group-active:ml-5' },
    },
  ],
})

export type ToggleVariantProps = VariantProps<typeof toggle>
export type ToggleSlots = keyof ReturnType<typeof toggle>

export { toggle }
