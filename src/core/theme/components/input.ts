import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'

const input = tv({
  slots: {
    base: 'group flex-col',
    label: [
      'absolute',
      'left-3',
      'z-10',
      'pointer-events-none',
      'subpixel-antialiased',
      'text-small',
      'text-foreground-500',
    ],
    mainWrapper: 'grow',
    inputWrapper: [
      'relative',
      'w-full',
      'flex-row',
      'items-center',
      'shadow-sm',
      'px-3',
      'gap-3',
    ],
    innerWrapper: 'box-border h-full grow flex-row items-center',
    input: [
      'placeholder:text-foreground-500 h-[theme(lineHeight.small)] grow bg-transparent',
      'group-[[has-start-content=true]]:pl-1.5',
      'group-[[has-end-content=true]]:pr-1.5',
    ],
    clearButton: [
      'p-2',
      '-m-5',
      'z-10',
      'absolute',
      'right-3',
      'opacity-0',
      'active:!opacity-100',
      'rounded-full',
    ],
    helperWrapper: 'relative flex-col gap-1.5 p-1',
    description: 'text-tiny text-foreground-400',
    errorMessage: 'text-tiny text-danger',
    underline: '',
  },
  variants: {
    variant: {
      flat: {
        inputWrapper: ['bg-default-100'],
      },
      faded: {
        inputWrapper: ['bg-default-100', 'border-medium', 'border-default-200'],
        input: 'group-[[has-value=true]]:text-default-foreground',
      },
      bordered: {
        inputWrapper: [
          'border-medium',
          'border-default-200',
          'group-[[focus=true]]:border-default-foreground',
        ],
        input: 'group-[[has-value=true]]:text-foreground',
      },
      underlined: {
        inputWrapper: [
          '!px-1',
          '!pb-0',
          '!gap-0',
          'relative',
          'border-b-medium',
          'border-default-300',
          '!rounded-none',
        ],
        innerWrapper: 'pb-1',
        input: 'group-[[has-value=true]]:text-foreground',
        label: ['group-[[filled-within=true]]:text-foreground', '!left-1'],
        underline: [
          'w-full',
          'scale-x-0',
          'bg-default-foreground',
          'absolute',
          'bottom-0',
          'h-[2px]',
          'group-[[focus=true]]:scale-x-100',
        ],
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
    size: {
      sm: {
        label: 'text-tiny',
        inputWrapper: 'rounded-small h-8 min-h-8 px-2',
        input: 'text-small h-[theme(lineHeight.small)]',
        clearButton: 'text-medium',
      },
      md: {
        inputWrapper: 'rounded-medium h-10 min-h-10',
        input: 'text-small',
        clearButton: 'text-large',
      },
      lg: {
        inputWrapper: 'rounded-large h-12 min-h-12',
        input: 'text-medium',
        clearButton: 'text-large',
      },
    },
    radius: {
      none: {
        inputWrapper: 'rounded-none',
      },
      sm: {
        inputWrapper: 'rounded-small',
      },
      md: {
        inputWrapper: 'rounded-medium',
      },
      lg: {
        inputWrapper: 'rounded-large',
      },
      full: {
        inputWrapper: 'rounded-full',
      },
    },
    labelPlacement: {
      'outside': {
        mainWrapper: 'flex-col',
        label: 'group-[[filled-within=true]]:left-0',
      },
      'outside-left': {
        base: 'flex-row flex-nowrap items-center',
        inputWrapper: 'flex-1',
        mainWrapper: 'flex-col',
        label: 'text-foreground relative left-0 pl-2 pr-2',
      },
      'inside': {
        label: 'text-tiny',
        inputWrapper: 'flex-col items-start justify-center gap-0',
        innerWrapper: 'group-[[has-label=true]]:items-end',
      },
    },
    fullWidth: {
      true: {
        base: 'w-full',
      },
    },
    isClearable: {
      true: {
        input: 'pr-6',
        clearButton:
          'group-[[filled=true]]:flex group-[[filled=true]]:opacity-70',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled pointer-events-none',
        inputWrapper: 'pointer-events-none',
        label: 'pointer-events-none',
      },
    },
    isInvalid: {
      true: {
        label: '!text-danger',
        input: '!placeholder:text-danger !text-danger',
      },
    },
    isMultiline: {
      true: {
        label: 'relative',
        inputWrapper: '!h-auto',
        innerWrapper: 'items-start',
      },
    },
    disableAnimation: {
      true: {
        input: 'transition-none',
        inputWrapper: 'transition-none',
        label: 'transition-none',
        underline: 'transition-none',
      },
      false: {
        inputWrapper:
          'transition-colors !duration-150 motion-reduce:transition-none',
        label: [
          'will-change-auto',
          '!duration-200',
          '!ease-out',
          'motion-reduce:transition-none',
          'transition-[left,translateY,scaleX,scaleY]',
        ],
        clearButton: ['transition-opacity', 'motion-reduce:transition-none'],
        underline: 'transition-transform',
      },
    },
  },
  defaultVariants: {
    variant: 'flat',
    color: 'default',
    size: 'md',
    radius: 'md',
    fullWidth: true,
    labelPlacement: 'inside',
    isDisabled: false,
    isMultiline: false,
  },
  compoundVariants: [
    // flat & color
    {
      variant: 'flat',
      color: 'default',
      class: {
        input: 'group-[[has-value=true]]:text-default-foreground',
        clearButton: 'text-default-foreground',
      },
    },
    {
      variant: 'flat',
      color: 'primary',
      class: {
        inputWrapper: 'bg-primary-50',
        input: 'placeholder:text-primary text-primary',
        label: 'text-primary',
        clearButton: 'text-primary',
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: {
        inputWrapper: 'bg-secondary-50',
        input: 'placeholder:text-secondary text-secondary',
        label: 'text-secondary',
        clearButton: 'text-secondary',
      },
    },
    {
      variant: 'flat',
      color: 'success',
      class: {
        inputWrapper: 'bg-success-50',
        input: [
          'placeholder:text-success-600',
          'text-success-600',
          'dark:placeholder:text-success',
          'dark:text-success',
        ],
        label: 'text-success-600 dark:text-success',
        clearButton: 'text-success-600 dark:text-success',
      },
    },
    {
      variant: 'flat',
      color: 'warning',
      class: {
        inputWrapper: 'bg-warning-50',
        input: [
          'placeholder:text-warning-600',
          'text-warning-600',
          'dark:placeholder:text-warning',
          'dark:text-warning',
        ],
        label: 'text-warning-600 dark:text-warning',
        clearButton: 'text-warning-600 dark:text-warning',
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      class: {
        inputWrapper: 'bg-danger-50',
        input: [
          'placeholder:text-danger',
          'text-danger',
          'dark:placeholder:text-danger-500',
          'dark:text-danger-500',
        ],
        label: 'text-danger dark:text-danger-500',
        clearButton: 'text-danger dark:text-danger-500',
      },
    },
    // faded & color
    {
      variant: 'faded',
      color: 'primary',
      class: {
        label: 'text-primary',
        inputWrapper: 'group-[[focus=true]]:border-primary',
      },
    },
    {
      variant: 'faded',
      color: 'secondary',
      class: {
        label: 'text-secondary',
        inputWrapper: 'group-[[focus=true]]:border-secondary',
      },
    },
    {
      variant: 'faded',
      color: 'success',
      class: {
        label: 'text-success',
        inputWrapper: 'group-[[focus=true]]:border-success',
      },
    },
    {
      variant: 'faded',
      color: 'warning',
      class: {
        label: 'text-warning',
        inputWrapper: 'group-[[focus=true]]:border-warning',
      },
    },
    {
      variant: 'faded',
      color: 'danger',
      class: {
        label: 'text-danger',
        inputWrapper: 'group-[[focus=true]]:border-danger',
      },
    },
    // underlined & color
    {
      variant: 'underlined',
      color: 'primary',
      class: {
        underline: 'bg-primary',
        label: 'text-primary',
      },
    },
    {
      variant: 'underlined',
      color: 'secondary',
      class: {
        underline: 'bg-secondary',
        label: 'text-secondary',
      },
    },
    {
      variant: 'underlined',
      color: 'success',
      class: {
        underline: 'bg-success',
        label: 'text-success',
      },
    },
    {
      variant: 'underlined',
      color: 'warning',
      class: {
        underline: 'bg-warning',
        label: 'text-warning',
      },
    },
    {
      variant: 'underlined',
      color: 'danger',
      class: {
        underline: 'bg-danger',
        label: 'text-danger',
      },
    },
    // bordered & color
    {
      variant: 'bordered',
      color: 'primary',
      class: {
        inputWrapper: 'group-[[focus=true]]:border-primary',
        label: 'text-primary',
      },
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: {
        inputWrapper: 'group-[[focus=true]]:border-secondary',
        label: 'text-secondary',
      },
    },
    {
      variant: 'bordered',
      color: 'success',
      class: {
        inputWrapper: 'group-[[focus=true]]:border-success',
        label: 'text-success',
      },
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: {
        inputWrapper: 'group-[[focus=true]]:border-warning',
        label: 'text-warning',
      },
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: {
        inputWrapper: 'group-[[focus=true]]:border-danger',
        label: 'text-danger',
      },
    },
    // labelPlacement=inside & default
    {
      labelPlacement: 'inside',
      color: 'default',
      class: {
        label: 'group-[[filled-within=true]]:text-default-600',
      },
    },
    // labelPlacement=outside & default
    {
      labelPlacement: 'outside',
      color: 'default',
      class: {
        label: 'group-[[filled-within=true]]:text-foreground',
      },
    },
    // radius-full & size
    {
      radius: 'full',
      size: 'sm',
      class: {
        inputWrapper: 'px-3',
        label: 'left-3',
      },
    },
    {
      radius: 'full',
      size: 'md',
      class: {
        inputWrapper: 'px-4',
        label: 'left-4',
      },
    },
    {
      radius: 'full',
      size: 'lg',
      class: {
        inputWrapper: 'px-5',
        label: 'left-5',
      },
    },
    // !disableAnimation & variant
    {
      disableAnimation: false,
      variant: ['faded', 'bordered'],
      class: {
        inputWrapper: 'transition-colors motion-reduce:transition-none',
      },
    },
    {
      disableAnimation: false,
      variant: 'underlined',
      class: {
        underline: 'transition-transform motion-reduce:transition-none',
      },
    },
    // isInvalid & variant
    {
      isInvalid: true,
      variant: 'flat',
      class: {
        inputWrapper: '!bg-danger-50',
      },
    },
    {
      isInvalid: true,
      variant: 'bordered',
      class: {
        inputWrapper: '!border-danger',
      },
    },
    {
      isInvalid: true,
      variant: 'underlined',
      class: {
        underline: '!bg-danger',
      },
    },
    // size & labelPlacement
    {
      labelPlacement: 'inside',
      size: 'sm',
      class: {
        inputWrapper: 'h-12 px-3 py-1.5',
      },
    },
    {
      labelPlacement: 'inside',
      size: 'md',
      class: {
        inputWrapper: 'h-14 py-2',
      },
    },
    {
      labelPlacement: 'inside',
      size: 'lg',
      class: {
        label: 'text-small',
        inputWrapper: 'h-16 gap-0 py-2.5',
      },
    },
    // size & labelPlacement & variant=[faded, bordered]
    {
      labelPlacement: 'inside',
      size: 'sm',
      variant: ['bordered', 'faded'],
      class: {
        inputWrapper: 'py-1',
      },
    },
    // labelPlacement=[inside,outside]
    {
      labelPlacement: ['inside', 'outside'],
      class: {
        label: ['group-[[filled-within=true]]:pointer-events-auto'],
      },
    },
    // labelPlacement=inside
    {
      labelPlacement: 'inside',
      class: {
        label: ['group-[[filled-within=true]]:scale-[0.85]'],
      },
    },
    // labelPlacement=inside & variant=flat
    {
      labelPlacement: 'inside',
      variant: 'flat',
      class: {
        innerWrapper: 'pb-0.5',
      },
    },
    // variant=underlined & size
    {
      variant: 'underlined',
      size: 'sm',
      class: {
        innerWrapper: 'pb-1',
      },
    },
    {
      variant: 'underlined',
      size: ['md', 'lg'],
      class: {
        innerWrapper: 'pb-1.5',
      },
    },
    // inside & size
    {
      labelPlacement: 'inside',
      size: ['sm', 'md'],
      class: {
        label: 'text-small',
      },
    },
    {
      labelPlacement: 'inside',
      isMultiline: false,
      size: 'sm',
      class: {
        label: [
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.tiny)/2_-_8px)]',
        ],
      },
    },
    {
      labelPlacement: 'inside',
      isMultiline: false,
      size: 'md',
      class: {
        label: [
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.small)/2_-_6px)]',
        ],
      },
    },
    {
      labelPlacement: 'inside',
      isMultiline: false,
      size: 'lg',
      class: {
        label: [
          'text-medium',
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.small)/2_-_8px)]',
        ],
      },
    },
    // inside & size & [faded, bordered]
    {
      labelPlacement: 'inside',
      variant: ['faded', 'bordered'],
      isMultiline: false,
      size: 'sm',
      class: {
        label: [
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.tiny)/2_-_8px_-_theme(borderWidth.medium))]',
        ],
      },
    },
    {
      labelPlacement: 'inside',
      variant: ['faded', 'bordered'],
      isMultiline: false,
      size: 'md',
      class: {
        label: [
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))]',
        ],
      },
    },
    {
      labelPlacement: 'inside',
      variant: ['faded', 'bordered'],
      isMultiline: false,
      size: 'lg',
      class: {
        label: [
          'text-medium',
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.small)/2_-_8px_-_theme(borderWidth.medium))]',
        ],
      },
    },
    // inside & size & underlined
    {
      labelPlacement: 'inside',
      variant: 'underlined',
      isMultiline: false,
      size: 'sm',
      class: {
        label: [
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.tiny)/2_-_5px)]',
        ],
      },
    },
    {
      labelPlacement: 'inside',
      variant: 'underlined',
      isMultiline: false,
      size: 'md',
      class: {
        label: [
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.small)/2_-_3.5px)]',
        ],
      },
    },
    {
      labelPlacement: 'inside',
      variant: 'underlined',
      size: 'lg',
      isMultiline: false,
      class: {
        label: [
          'text-medium',
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)/2_+_theme(fontSize.small)/2_-_4px)]',
        ],
      },
    },
    // outside & size
    {
      labelPlacement: 'outside',
      size: 'sm',
      isMultiline: false,
      class: {
        label: [
          'start-2',
          'text-tiny',
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)_-_theme(fontSize.tiny)/2_+_16px)]',
        ],
        base: 'group-[[has-label=true]]:mt-[calc(theme(fontSize.small)_+_8px)]',
      },
    },
    {
      labelPlacement: 'outside',
      size: 'md',
      isMultiline: false,
      class: {
        label: [
          'start-3',
          'end-auto',
          'text-small',
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)_-_theme(fontSize.small)/2_+_20px)]',
        ],
        base: 'group-[[has-label=true]]:mt-[calc(theme(fontSize.small)_+_10px)]',
      },
    },
    {
      labelPlacement: 'outside',
      size: 'lg',
      isMultiline: false,
      class: {
        label: [
          'start-3',
          'end-auto',
          'text-medium',
          'group-[[filled-within=true]]:-translate-y-[calc(theme(lineHeight.small)_-_theme(fontSize.small)/2_+_24px)]',
        ],
        base: 'group-[[has-label=true]]:mt-[calc(theme(fontSize.small)_+_12px)]',
      },
    },
    // outside-left & size & hasHelper
    {
      labelPlacement: 'outside-left',
      size: 'sm',
      class: {
        label: 'group-[[has-helper=true]]:pt-2',
      },
    },
    {
      labelPlacement: 'outside-left',
      size: 'md',
      class: {
        label: 'group-[[has-helper=true]]:pt-3',
      },
    },
    {
      labelPlacement: 'outside-left',
      size: 'lg',
      class: {
        label: 'group-[[has-helper=true]]:pt-4',
      },
    },
    // labelPlacement=[outside, outside-left] & isMultiline
    {
      labelPlacement: ['outside', 'outside-left'],
      isMultiline: true,
      class: {
        inputWrapper: 'py-2',
      },
    },
    // isMultiline & labelPlacement="outside"
    {
      labelPlacement: 'outside',
      isMultiline: true,
      class: {
        label: 'pb-1.5',
      },
    },
    // isMultiline & labelPlacement="inside"
    {
      labelPlacement: 'inside',
      isMultiline: true,
      class: {
        label: 'pb-0.5',
        input: 'pt-0',
      },
    },
    // isMultiline & !disableAnimation
    {
      isMultiline: true,
      disableAnimation: false,
      class: {
        input: 'transition-height !duration-100 motion-reduce:transition-none',
      },
    },
    // isMultiline & radius=full
    {
      isMultiline: true,
      radius: 'full',
      class: {
        inputWrapper: 'group-[[has-multiple-rows=true]]:rounded-large',
      },
    },
  ],
})

export type InputVariantProps = VariantProps<typeof input>
export type InputSlots = keyof ReturnType<typeof input>

export { input }
