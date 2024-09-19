import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'

const slider = tv({
  slots: {
    base: 'flex w-full flex-col gap-1',
    labelWrapper: 'w-full items-center justify-between',
    label: 'text-foreground',
    value: 'text-foreground',
    step: ['h-1.5', 'w-1.5', 'absolute', 'rounded-full'],
    mark: ['absolute', 'text-small', 'text-foreground'],
    trackWrapper: 'relative gap-2',
    track: ['flex-1', 'relative', 'rounded-lg', 'bg-default-300/50'],
    filler: 'absolute h-full',
    thumb: [
      'flex-row',
      'absolute',
      'justify-center',
      'items-center',
      'bg-background',
      'border-2',
    ],
    startContent: [],
    endContent: [],
  },
  variants: {
    size: {
      sm: {
        label: 'text-small',
        value: 'text-small',
        thumb: 'h-5 w-5',
        step: 'bg-default-200',
      },
      md: {
        label: 'text-small',
        value: 'text-small',
        thumb: 'h-6 w-6',
      },
      lg: {
        step: 'h-2 w-2',
        label: 'text-medium',
        value: 'text-medium',
        mark: 'mt-2',
        thumb: 'h-7 w-7',
        track: 'rounded-[0.89rem]',
      },
    },
    radius: {
      none: {
        thumb: 'rounded-none',
      },
      sm: {
        thumb: 'rounded-[calc(var(--nextui-radius-small)/2)]',
      },
      md: {
        thumb: 'rounded-[calc(var(--nextui-radius-medium)/2)]',
      },
      lg: {
        thumb: 'rounded-[calc(var(--nextui-radius-large)/1.5)]',
      },
      full: {
        thumb: 'rounded-full',
      },
    },
    color: {
      foreground: {
        filler: 'bg-foreground',
        thumb: 'border-foreground',
      },
      primary: {
        filler: 'bg-primary',
        thumb: 'border-primary',
      },
      secondary: {
        filler: 'bg-secondary',
        thumb: 'border-secondary',
      },
      success: {
        filler: 'bg-success',
        thumb: 'border-success',
      },
      warning: {
        filler: 'bg-warning',
        thumb: 'border-warning',
      },
      danger: {
        filler: 'bg-danger',
        thumb: 'border-danger',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled',
      },
    },
    hasMarks: {
      true: {
        base: 'mb-5',
      },
    },
    hideValue: {
      true: { value: 'sr-only' },
    },
    hideThumb: {
      true: {
        thumb: 'sr-only opacity-0',
      },
    },
    hasSingleThumb: {
      true: {},
      false: {},
    },
    isInRange: {
      true: {
        step: 'bg-background/50',
        mark: 'opacity-100',
      },
      false: {
        step: 'bg-default-300/50',
        mark: 'opacity-50',
      },
    },
    isVertical: {
      true: {
        base: 'h-full w-auto flex-col-reverse items-center',
        trackWrapper: 'h-full flex-col items-center justify-center',
        filler: 'h-auto w-full',
        thumb: 'left-1/2 -translate-x-1/2 translate-y-1/2',
        track: 'border-t-default-300/50 h-full',
        labelWrapper: 'flex-col items-center justify-center',
        step: ['left-1/2', '-translate-x-1/2', 'translate-y-1/2'],
        mark: [
          'left-1/2',
          'ml-1',
          'translate-x-1/2',
          'translate-y-1/2',
          'w-10',
        ],
      },
      false: {
        thumb: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
        trackWrapper: 'flex-row items-center',
        track: 'border-r-default-300/50',
        labelWrapper: 'flex-row',
        step: ['top-1/2', '-translate-x-1/2', '-translate-y-1/2'],
        mark: ['top-1/2', 'mt-1', '-translate-x-1/2', 'translate-y-1/2'],
      },
    },
    disableAnimation: {
      true: {},
      false: {
        thumb: 'transition-all motion-reduce:transition-none',
        mark: 'duration-250 transition-opacity motion-reduce:transition-none',
      },
    },
  },
  compoundVariants: [
    // size="sm" || size="md"
    {
      size: ['sm', 'md'],
      class: {
        thumb: 'shadow-small',
      },
    },
    // size && color
    {
      size: 'sm',
      color: 'foreground',
      isInRange: true,
      class: {
        step: 'bg-foreground',
      },
    },
    {
      size: 'sm',
      color: 'primary',
      isInRange: true,
      class: {
        step: 'bg-primary',
      },
    },
    {
      size: 'sm',
      color: 'secondary',
      isInRange: true,

      class: {
        step: 'bg-secondary',
      },
    },
    {
      size: 'sm',
      color: 'success',
      isInRange: true,
      class: {
        step: 'bg-success',
      },
    },
    {
      size: 'sm',
      color: 'warning',
      isInRange: true,
      class: {
        step: 'bg-warning',
      },
    },
    {
      size: 'sm',
      color: 'danger',
      isInRange: true,
      class: {
        step: 'bg-danger',
      },
    },
    // size && !isVertical
    {
      size: 'sm',
      isVertical: false,
      class: {
        track:
          'my-[calc((var(--nextui-spacing-5)-var(--nextui-spacing-1))/2)] h-1 border-x-[calc(var(--nextui-spacing-5)/2)]',
      },
    },
    {
      size: 'md',
      isVertical: false,
      class: {
        track:
          'my-[calc((var(--nextui-spacing-6)-var(--nextui-spacing-3))/2)] h-3 border-x-[calc(var(--nextui-spacing-6)/2)]',
      },
    },
    {
      size: 'lg',
      isVertical: false,
      class: {
        track:
          'my-[calc((var(--nextui-spacing-7)-var(--nextui-spacing-5))/2)] h-7 border-x-[calc(var(--nextui-spacing-7)/2)]',
      },
    },
    // size && isVertical
    {
      size: 'sm',
      isVertical: true,
      class: {
        track:
          'mx-[calc((var(--nextui-spacing-5)-var(--nextui-spacing-1))/2)] w-1 border-y-[calc(var(--nextui-spacing-5)/2)]',
      },
    },
    {
      size: 'md',
      isVertical: true,
      class: {
        track:
          'mx-[calc((var(--nextui-spacing-6)-var(--nextui-spacing-3))/2)] w-3 border-y-[calc(var(--nextui-spacing-6)/2)]',
      },
    },
    {
      size: 'lg',
      isVertical: true,
      class: {
        track:
          'mx-[calc((var(--nextui-spacing-7)-var(--nextui-spacing-5))/2)] w-7 border-y-[calc(var(--nextui-spacing-7)/2)]',
      },
    },
    // color && !isVertical && hasSingleThumb
    {
      color: 'foreground',
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: 'border-l-foreground',
      },
    },
    {
      color: 'primary',
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: 'border-l-primary',
      },
    },
    {
      color: 'secondary',
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: 'border-l-secondary',
      },
    },
    {
      color: 'success',
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: 'border-l-success',
      },
    },
    {
      color: 'warning',
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: 'border-l-warning',
      },
    },
    {
      color: 'danger',
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: 'border-l-danger',
      },
    },
    // color && isVertical && hasSingleThumb
    {
      color: 'foreground',
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: 'border-b-foreground',
      },
    },
    {
      color: 'primary',
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: 'border-b-primary',
      },
    },
    {
      color: 'secondary',
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: 'border-b-secondary',
      },
    },
    {
      color: 'success',
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: 'border-b-success',
      },
    },
    {
      color: 'warning',
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: 'border-b-warning',
      },
    },
    {
      color: 'danger',
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: 'border-b-danger',
      },
    },
    // isVertical && !hasSingleThumb
    {
      isVertical: true,
      hasSingleThumb: false,
      class: {
        track: 'border-b-default-300/50',
      },
    },
    // !isVertical && !hasSingleThumb
    {
      isVertical: false,
      hasSingleThumb: false,
      class: {
        track: 'border-l-default-300/50',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    radius: 'full',
    hideValue: false,
    hideThumb: false,
    isDisabled: false,
    disableThumbScale: false,
    showOutline: false,
  },
})

export type SliderVariantProps = VariantProps<typeof slider>
export type SliderSlots = keyof ReturnType<typeof slider>

export { slider }
