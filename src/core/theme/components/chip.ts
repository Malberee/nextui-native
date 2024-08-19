import type { VariantProps } from 'tailwind-variants'

import { colorVariants } from '../utils'
import { tv } from '../utils/tv'

const chip = tv({
  slots: {
    base: [
      'relative',
      'flex-row',
      'items-center',
      'justify-between',
      'box-border',
      'whitespace-nowrap',
    ],
    content: 'font-normal text-inherit',
    dot: ['w-2', 'h-2', 'ml-1', 'rounded-full'],
    avatar: 'flex-shrink-0',
    closeButton: [
      'z-10',
      'transition-opacity',
      'opacity-70',
      'active:opacity-disabled',
    ],
  },
  variants: {
    variant: {
      solid: {},
      bordered: {
        base: 'border-medium bg-transparent',
      },
      light: {
        base: 'bg-transparent',
      },
      flat: {},
      faded: {
        base: 'border-medium',
      },
      shadow: {},
      dot: {
        base: 'border-medium border-default bg-transparent',
        content: 'text-foreground',
      },
    },
    color: {
      default: {
        dot: 'bg-default-400',
      },
      primary: {
        dot: 'bg-primary',
      },
      secondary: {
        dot: 'bg-secondary',
      },
      success: {
        dot: 'bg-success',
      },
      warning: {
        dot: 'bg-warning',
      },
      danger: {
        dot: 'bg-danger',
      },
    },
    size: {
      sm: {
        base: 'text-tiny h-6 px-1',
        content: 'px-1',
        closeButton: 'text-medium',
        avatar: 'h-4 w-4',
      },
      md: {
        base: 'text-small h-7 px-1',
        content: 'px-2',
        closeButton: 'text-large',
        avatar: 'h-5 w-5',
      },
      lg: {
        base: 'text-medium h-8 px-2',
        content: 'px-2',
        closeButton: 'text-xl',
        avatar: 'h-6 w-6',
      },
    },
    radius: {
      none: {
        base: 'rounded-none',
      },
      sm: {
        base: 'rounded-small',
      },
      md: {
        base: 'rounded-medium',
      },
      lg: {
        base: 'rounded-large',
      },
      full: {
        base: 'rounded-full',
      },
    },
    isOneChar: {
      true: {},
      false: {},
    },
    isCloseable: {
      true: {},
      false: {},
    },
    hasStartContent: {
      true: {},
    },
    hasEndContent: {
      true: {},
    },
    isDisabled: {
      true: { base: 'opacity-disabled pointer-events-none' },
    },
  },
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
    radius: 'full',
    isDisabled: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: 'solid',
      color: 'default',
      class: {
        base: colorVariants.solid.wrapper.default,
        content: colorVariants.solid.content.default,
      },
    },
    {
      variant: 'solid',
      color: 'primary',
      class: {
        base: colorVariants.solid.wrapper.primary,
        content: colorVariants.solid.content.primary,
      },
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: {
        base: colorVariants.solid.wrapper.secondary,
        content: colorVariants.solid.content.secondary,
      },
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        base: colorVariants.solid.wrapper.success,
        content: colorVariants.solid.content.success,
      },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        base: colorVariants.solid.wrapper.warning,
        content: colorVariants.solid.content.warning,
      },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: {
        base: colorVariants.solid.wrapper.danger,
        content: colorVariants.solid.content.danger,
      },
    },
    // shadow / color
    {
      variant: 'shadow',
      color: 'default',
      class: {
        base: colorVariants.shadow.wrapper.default,
        content: colorVariants.shadow.content.default,
      },
    },
    {
      variant: 'shadow',
      color: 'primary',
      class: {
        base: colorVariants.shadow.wrapper.primary,
        content: colorVariants.shadow.content.primary,
      },
    },
    {
      variant: 'shadow',
      color: 'secondary',
      class: {
        base: colorVariants.shadow.wrapper.secondary,
        content: colorVariants.shadow.content.secondary,
      },
    },
    {
      variant: 'shadow',
      color: 'success',
      class: {
        base: colorVariants.shadow.wrapper.success,
        content: colorVariants.shadow.content.success,
      },
    },
    {
      variant: 'shadow',
      color: 'warning',
      class: {
        base: colorVariants.shadow.wrapper.warning,
        content: colorVariants.shadow.content.warning,
      },
    },
    {
      variant: 'shadow',
      color: 'danger',
      class: {
        base: colorVariants.shadow.wrapper.danger,
        content: colorVariants.shadow.content.danger,
      },
    },
    // bordered / color
    {
      variant: 'bordered',
      color: 'default',
      class: {
        base: colorVariants.bordered.wrapper.default,
        content: colorVariants.bordered.content.default,
      },
    },
    {
      variant: 'bordered',
      color: 'primary',
      class: {
        base: colorVariants.bordered.wrapper.primary,
        content: colorVariants.bordered.content.primary,
      },
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: {
        base: colorVariants.bordered.wrapper.secondary,
        content: colorVariants.bordered.content.secondary,
      },
    },
    {
      variant: 'bordered',
      color: 'success',
      class: {
        base: colorVariants.bordered.wrapper.success,
        content: colorVariants.bordered.content.success,
      },
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: {
        base: colorVariants.bordered.wrapper.warning,
        content: colorVariants.bordered.content.warning,
      },
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: {
        base: colorVariants.bordered.wrapper.danger,
        content: colorVariants.bordered.content.danger,
      },
    },
    // flat / color
    {
      variant: 'flat',
      color: 'default',
      class: {
        base: colorVariants.flat.wrapper.default,
        content: colorVariants.flat.content.default,
      },
    },
    {
      variant: 'flat',
      color: 'primary',
      class: {
        base: colorVariants.flat.wrapper.primary,
        content: colorVariants.flat.content.primary,
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: {
        base: colorVariants.flat.wrapper.secondary,
        content: colorVariants.flat.content.secondary,
      },
    },
    {
      variant: 'flat',
      color: 'success',
      class: {
        base: colorVariants.flat.wrapper.success,
        content: colorVariants.flat.content.success,
      },
    },
    {
      variant: 'flat',
      color: 'warning',
      class: {
        base: colorVariants.flat.wrapper.warning,
        content: colorVariants.flat.content.warning,
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      class: {
        base: colorVariants.flat.wrapper.danger,
        content: colorVariants.flat.content.danger,
      },
    },
    // faded / color
    {
      variant: 'faded',
      color: 'default',
      class: {
        base: colorVariants.faded.wrapper.default,
        content: colorVariants.faded.content.default,
      },
    },
    {
      variant: 'faded',
      color: 'primary',
      class: {
        base: colorVariants.faded.wrapper.primary,
        content: colorVariants.faded.content.primary,
      },
    },
    {
      variant: 'faded',
      color: 'secondary',
      class: {
        base: colorVariants.faded.wrapper.secondary,
        content: colorVariants.faded.content.secondary,
      },
    },
    {
      variant: 'faded',
      color: 'success',
      class: {
        base: colorVariants.faded.wrapper.success,
        content: colorVariants.faded.content.success,
      },
    },
    {
      variant: 'faded',
      color: 'warning',
      class: {
        base: colorVariants.faded.wrapper.warning,
        content: colorVariants.faded.content.warning,
      },
    },
    {
      variant: 'faded',
      color: 'danger',
      class: {
        base: colorVariants.faded.wrapper.danger,
        content: colorVariants.faded.content.danger,
      },
    },
    // light / color
    {
      variant: 'light',
      color: 'default',
      class: {
        base: colorVariants.light.wrapper.default,
        content: colorVariants.light.content.default,
      },
    },
    {
      variant: 'light',
      color: 'primary',
      class: {
        base: colorVariants.light.wrapper.primary,
        content: colorVariants.light.content.primary,
      },
    },
    {
      variant: 'light',
      color: 'secondary',
      class: {
        base: colorVariants.light.wrapper.secondary,
        content: colorVariants.light.content.secondary,
      },
    },
    {
      variant: 'light',
      color: 'success',
      class: {
        base: colorVariants.light.wrapper.success,
        content: colorVariants.light.content.success,
      },
    },
    {
      variant: 'light',
      color: 'warning',
      class: {
        base: colorVariants.light.wrapper.warning,
        content: colorVariants.light.content.warning,
      },
    },
    {
      variant: 'light',
      color: 'danger',
      class: {
        base: colorVariants.light.wrapper.danger,
        content: colorVariants.light.content.danger,
      },
    },
    // isOneChar / size
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: 'sm',
      class: {
        base: 'h-5 min-h-5 w-5 min-w-5',
      },
    },
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: 'md',
      class: {
        base: 'h-6 min-h-6 w-6 min-w-6',
      },
    },
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: 'lg',
      class: {
        base: 'h-7 min-h-7 w-7 min-w-7',
      },
    },
    // isOneChar / isCloseable
    {
      isOneChar: true,
      isCloseable: false,
      hasStartContent: false,
      hasEndContent: false,
      class: {
        base: 'justify-center px-0',
        content: 'flex-none px-0',
      },
    },
    {
      isOneChar: true,
      isCloseable: true,
      hasStartContent: false,
      hasEndContent: false,
      class: {
        base: 'w-auto',
      },
    },
    // isOneChar / dot
    {
      isOneChar: true,
      variant: 'dot',
      class: {
        base: 'h-7 w-auto items-center px-1',
        content: 'px-2',
      },
    },
    // hasStartContent / size
    {
      hasStartContent: true,
      size: 'sm',
      class: {
        content: 'pl-0.5',
      },
    },
    {
      hasStartContent: true,
      size: ['md', 'lg'],
      class: {
        content: 'pl-1',
      },
    },
    // hasEndContent / size
    {
      hasEndContent: true,
      size: 'sm',
      class: {
        content: 'pr-0.5',
      },
    },
    {
      hasEndContent: true,
      size: ['md', 'lg'],
      class: {
        content: 'pr-1',
      },
    },
  ],
})

export type ChipVariantProps = VariantProps<typeof chip>
export type ChipSlots = keyof ReturnType<typeof chip>

export { chip }
