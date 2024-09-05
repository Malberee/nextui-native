import type { VariantProps } from 'tailwind-variants'

import { colorVariants } from '../utils'
import { tv } from '../utils/tv'

const checkbox = tv({
  slots: {
    base: 'group -m-2 flex-row items-center justify-start p-2',
    wrapper: [
      'border-default',
      'flex-row',
      'items-center',
      'justify-center',
      'border-2',
      'border-solid',
      'scale-100',
    ],
    mark: 'absolute flex-row items-center justify-center',
    icon: '',
    labelWrapper: 'relative flex-row items-center justify-center opacity-100',
    label: 'text-foreground relative',
    line: 'absolute',
  },
  variants: {
    color: {
      default: {
        mark: 'bg-default',
        icon: colorVariants.solid.content.default,
      },
      primary: {
        mark: 'bg-primary',
        icon: colorVariants.solid.content.primary,
      },
      secondary: {
        mark: 'bg-secondary',
        icon: colorVariants.solid.content.secondary,
      },
      success: {
        mark: 'bg-success',
        icon: colorVariants.solid.content.success,
      },
      warning: {
        mark: 'bg-warning',
        icon: colorVariants.solid.content.warning,
      },
      danger: {
        mark: 'bg-danger',
        icon: colorVariants.solid.content.danger,
      },
    },
    size: {
      sm: {
        wrapper: [
          'mr-2 h-4 w-4',
          'rounded-[calc(var(--nextui-radius-medium)*0.5)]',
        ],
        mark: ['h-4 w-4', 'rounded-[calc(var(--nextui-radius-medium)*0.5)]'],
        label: 'text-small',
        icon: 'h-2 w-3',
      },
      md: {
        wrapper: [
          'mr-2 h-5 w-5',
          'rounded-[calc(var(--nextui-radius-medium)*0.6)]',
        ],
        mark: ['h-5 w-5', 'rounded-[calc(var(--nextui-radius-medium)*0.6)]'],
        label: 'text-medium',
        icon: 'h-3 w-4',
      },
      lg: {
        wrapper: [
          'mr-2 h-6 w-6',
          'rounded-[calc(var(--nextui-radius-medium)*0.7)]',
        ],
        mark: ['h-6 w-6', 'rounded-[calc(var(--nextui-radius-medium)*0.7)]'],
        label: 'text-large',
        icon: 'h-4 w-5',
      },
    },
    radius: {
      none: {
        wrapper: 'rounded-none',
        mark: 'rounded-none',
      },
      sm: {
        wrapper: 'rounded-[calc(var(--nextui-radius-medium)*0.5)]',
        mark: 'rounded-[calc(var(--nextui-radius-medium)*0.5)]',
      },
      md: {
        wrapper: 'rounded-[calc(var(--nextui-radius-medium)*0.6)]',
        mark: 'rounded-[calc(var(--nextui-radius-medium)*0.6)]',
      },
      lg: {
        wrapper: 'rounded-[calc(var(--nextui-radius-medium)*0.7)]',
        mark: 'rounded-[calc(var(--nextui-radius-medium)*0.7)]',
      },
      full: {
        wrapper: 'rounded-full',
        mark: 'rounded-full',
      },
    },
    lineThrough: {
      true: {
        line: 'bg-foreground h-0.5 w-full scale-x-0',
      },
      false: {
        line: 'hidden',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled pointer-events-none',
      },
    },
    isInvalid: {
      true: {
        wrapper: 'border-danger',
        label: 'text-danger',
      },
    },
    disableAnimation: {
      true: {
        wrapper: 'transition-none',
        mark: 'transition-none',
        labelWrapper: 'transition-none',
        label: 'transition-none',
        line: 'transition-none',
      },
      false: {
        wrapper: [
          'group-active:scale-95',
          'transition-colors',
          'motion-reduce:transition-none',
        ],
        mark: 'transition-all duration-200 ease-linear motion-reduce:transition-none',
        labelWrapper:
          'duration-250 transition-opacity ease-in-out motion-reduce:transition-none',
        label:
          'duration-250 transition-colors ease-in-out motion-reduce:transition-none',
        line: 'duration-250 transition-transform ease-in-out motion-reduce:transition-none',
      },
    },
    isSelected: {
      true: {
        mark: 'scale-100 opacity-100',
      },
      false: {
        mark: 'scale-50 opacity-0',
      },
    },
    isIndeterminate: {
      true: {
        mark: 'scale-100 opacity-100',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    isDisabled: false,
    lineThrough: false,
    isSelected: false,
  },
  compoundVariants: [
    {
      isSelected: true,
      lineThrough: true,
      class: {
        labelWrapper: 'opacity-disabled',
        line: 'scale-x-100',
      },
    },
  ],
})

const checkboxGroup = tv({
  slots: {
    base: 'flex flex-col gap-2',
    label: 'text-medium text-foreground-500',
    wrapper: 'flex flex-wrap gap-2',
    description: 'text-small text-foreground-400',
    errorMessage: 'text-small text-danger',
  },
  variants: {
    // isRequired
    isInvalid: {
      true: {
        description: 'text-danger',
      },
    },
    disableAnimation: {
      true: {},
      false: {
        description:
          'transition-colors !duration-150 motion-reduce:transition-none',
      },
    },
    orientation: {
      vertical: { wrapper: 'flex-col' },
      horizontal: { wrapper: 'flex-row' },
    },
  },
  defaultVariants: {
    isInvalid: false,
    isRequired: false,
  },
})

export type CheckboxGroupSlots = keyof ReturnType<typeof checkboxGroup>

export type CheckboxVariantProps = VariantProps<typeof checkbox>
export type CheckboxSlots = keyof ReturnType<typeof checkbox>

export { checkbox, checkboxGroup }
