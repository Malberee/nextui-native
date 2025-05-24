import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'

const radio = tv({
  slots: {
    base: 'group flex-row items-center justify-start',
    wrapper: [
      'flex-row',
      'items-center',
      'justify-center',
      'border-solid',
      'border-medium',
      'border-default',
      'rounded-full',
      'scale-100',
    ],
    labelWrapper: 'ml-1 flex flex-col',
    control: [
      'z-10',
      'w-2',
      'h-2',
      'opacity-0',
      'scale-0',
      'rounded-full',
      'group-[[selected=true]]:opacity-100',
      'group-[[selected=true]]:scale-100',
    ],
    label: 'text-foreground',
    description: 'text-foreground-400',
  },
  variants: {
    color: {
      default: {
        control: 'bg-default-500 text-default-foreground',
        wrapper: 'group-[[selected=true]]:border-default-500',
      },
      primary: {
        control: 'bg-primary text-primary-foreground',
        wrapper: 'group-[[selected=true]]:border-primary',
      },
      secondary: {
        control: 'bg-secondary text-secondary-foreground',
        wrapper: 'group-[[selected=true]]:border-secondary',
      },
      success: {
        control: 'bg-success text-success-foreground',
        wrapper: 'group-[[selected=true]]:border-success',
      },
      warning: {
        control: 'bg-warning text-warning-foreground',
        wrapper: 'group-[[selected=true]]:border-warning',
      },
      danger: {
        control: 'bg-danger text-danger-foreground',
        wrapper: 'group-[[selected=true]]:border-danger',
      },
    },
    size: {
      sm: {
        wrapper: 'h-4 w-4',
        control: 'h-1.5 w-1.5',
        labelWrapper: 'ml-1',
        label: 'text-small',
        description: 'text-tiny',
      },
      md: {
        wrapper: 'h-5 w-5',
        control: 'h-2 w-2',
        labelWrapper: 'ml-2',
        label: 'text-medium',
        description: 'text-small',
      },
      lg: {
        wrapper: 'h-6 w-6',
        control: 'h-2.5 w-2.5',
        labelWrapper: 'ml-2',
        label: 'text-large',
        description: 'text-medium',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled pointer-events-none',
      },
    },
    isInvalid: {
      true: {
        control: 'bg-danger text-danger-foreground',
        wrapper: 'border-danger group-[[selected=true]]:border-danger',
        label: 'text-danger',
        description: 'text-danger-300',
      },
    },
    disableAnimation: {
      true: {},
      false: {
        wrapper:
          'duration-250 transition-colors ease-in-out group-active:scale-95 motion-reduce:transition-none',
        control:
          'duration-250 transition-all ease-in-out motion-reduce:transition-none',
        label: 'transition-colors motion-reduce:transition-none',
        description: 'transition-colors motion-reduce:transition-none',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    isDisabled: false,
    isInvalid: false,
  },
})

const radioGroup = tv({
  slots: {
    base: 'flex flex-col gap-2',
    label: 'text-foreground-500',
    wrapper: 'flex flex-col flex-wrap gap-2',
    description: 'text-foreground-400 text-tiny',
    errorMessage: 'text-danger-500 text-tiny',
  },
  variants: {
    isInvalid: {
      true: {
        errorMessage: 'text-danger',
      },
    },
    orientation: {
      horizontal: {
        wrapper: 'flex-row',
      },
      vertical: {
        wrapper: 'flex-col',
      },
    },
  },
  defaultVariants: {
    isInvalid: false,
    disableAnimation: false,
  },
})

export type RadioGroupSlots = keyof ReturnType<typeof radioGroup>

export type RadioVariantProps = VariantProps<typeof radio>
export type RadioSlots = keyof ReturnType<typeof radio>

export { radio, radioGroup }
