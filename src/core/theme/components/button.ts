import type { VariantProps } from 'tailwind-variants'

import { colorVariants } from '../utils'
import { tv } from '../utils/tv'

const button = tv({
  slots: {
    base: [
      'relative',
      'flex-row',
      'items-center',
      'justify-center',
      'group',
      'pointer-events-box-only',
      'overflow-hidden',
      'opacity-100',
    ],
    content: ['transition-colors', 'duration-100'],
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
      faded: { base: 'border-medium' },
      shadow: {},
      ghost: {
        base: 'border-medium bg-transparent',
      },
    },
    size: {
      sm: {
        base: 'h-8 min-w-16 gap-2 px-3',
        content: 'text-tiny',
      },
      md: {
        base: 'h-10 min-w-20 gap-2 px-4',
        content: 'text-small',
      },
      lg: {
        base: 'h-12 min-w-24 gap-3 px-6',
        content: 'text-medium',
      },
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    radius: {
      none: { base: 'rounded-none' },
      sm: { base: 'rounded-small' },
      md: { base: 'rounded-medium' },
      lg: { base: 'rounded-large' },
      full: { base: 'rounded-full' },
    },
    fullWidth: {
      true: { base: 'w-full' },
    },
    isDisabled: {
      true: { base: 'opacity-disabled pointer-events-none' },
    },
    disableAnimation: {
      false: { base: 'transition-transform duration-100 active:scale-[0.97]' },
      true: { base: '!transition-none active:!scale-100' },
    },
    isIconOnly: {
      true: { base: '!gap-0 px-0' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'default',
    fullWidth: false,
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
    // ghost / color
    {
      variant: 'ghost',
      color: 'default',
      class: {
        base: colorVariants.ghost.wrapper.default,
        content: colorVariants.ghost.content.default,
      },
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: {
        base: colorVariants.ghost.wrapper.primary,
        content: colorVariants.ghost.content.primary,
      },
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: {
        base: colorVariants.ghost.wrapper.secondary,
        content: colorVariants.ghost.content.secondary,
      },
    },
    {
      variant: 'ghost',
      color: 'success',
      class: {
        base: colorVariants.ghost.wrapper.success,
        content: colorVariants.ghost.content.success,
      },
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: {
        base: colorVariants.ghost.wrapper.warning,
        content: colorVariants.ghost.content.warning,
      },
    },
    {
      variant: 'ghost',
      color: 'danger',
      class: {
        base: colorVariants.ghost.wrapper.danger,
        content: colorVariants.ghost.content.danger,
      },
    },
    // isIconOnly
    {
      isIconOnly: true,
      size: 'sm',
      class: 'h-8 w-8 min-w-8',
    },
    {
      isIconOnly: true,
      size: 'md',
      class: 'h-10 w-10 min-w-10',
    },
    {
      isIconOnly: true,
      size: 'lg',
      class: 'h-12 w-12 min-w-12',
    },
  ],
})

const buttonGroup = tv({
  base: 'flex-row items-center justify-center',
  variants: {
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>

export type ButtonVariantProps = VariantProps<typeof button>
export type ButtonSlots = keyof ReturnType<typeof button>

export { button, buttonGroup }
