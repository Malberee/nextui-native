const solid = {
  wrapper: {
    default: 'bg-default',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    foreground: 'bg-foreground',
  },
  content: {
    default: 'text-default-foreground',
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    success: 'text-success-foreground',
    warning: 'text-warning-foreground',
    danger: 'text-danger-foreground',
    foreground: 'text-background',
  },
}

const shadow = {
  wrapper: {
    default: 'shadow-lg shadow-default/50 bg-default',
    primary: 'shadow-lg shadow-primary/40 bg-primary',
    secondary:
      'shadow-lg shadow-secondary/40 bg-secondary text-secondary-foreground',
    success: 'shadow-lg shadow-success/40 bg-success',
    warning: 'shadow-lg shadow-warning/40 bg-warning',
    danger: 'shadow-lg shadow-danger/40 bg-danger',
    foreground: 'shadow-lg shadow-foreground/40 bg-foreground',
  },
  content: {
    default: 'text-default-foreground',
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    success: 'text-success-foreground',
    warning: 'text-warning-foreground',
    danger: 'text-danger-foreground',
    foreground: 'text-background',
  },
}

const bordered = {
  wrapper: {
    default: 'bg-transparent border-default',
    primary: 'bg-transparent border-primary',
    secondary: 'bg-transparent border-secondary',
    success: 'bg-transparent border-success',
    warning: 'bg-transparent border-warning',
    danger: 'bg-transparent border-danger',
    foreground: 'bg-transparent border-foreground',
  },
  content: {
    default: 'text-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    foreground: 'text-foreground',
  },
}

const flat = {
  wrapper: {
    default: 'bg-default/40',
    primary: 'bg-primary/20',
    secondary: 'bg-secondary/20',
    success: 'bg-success/20 ',
    warning: 'bg-warning/20',
    danger: 'bg-danger/20',
    foreground: 'bg-foreground/10',
  },
  content: {
    default: 'text-default-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success-600 dark:text-success',
    warning: 'text-warning-600 dark:text-warning',
    danger: 'text-danger dark:text-danger-500',
    foreground: 'text-foreground',
  },
}

const faded = {
  wrapper: {
    default: 'border-default bg-default-100',
    primary: 'border-default bg-default-100',
    secondary: 'border-default bg-default-100',
    success: 'border-default bg-default-100',
    warning: 'border-default bg-default-100',
    danger: 'border-default bg-default-100',
    foreground: 'border-default bg-default-100',
  },
  content: {
    default: 'text-default-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    foreground: 'text-foreground',
  },
}

const light = {
  wrapper: {
    default: 'bg-transparent',
    primary: 'bg-transparent',
    secondary: 'bg-transparent',
    success: 'bg-transparent',
    warning: 'bg-transparent',
    danger: 'bg-transparent',
    foreground: 'bg-transparent',
  },
  content: {
    default: 'text-default-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    foreground: 'text-foreground',
  },
}

const ghost = {
  wrapper: {
    default: 'group border-default active:!bg-default',
    primary: 'group border-primary active:!bg-primary',
    secondary: 'group border-secondary active:!bg-secondary',
    success: 'group border-success active:!bg-success',
    warning: 'group border-warning active:!bg-warning',
    danger: 'group border-danger active:!bg-danger',
    foreground: 'group border-foreground active:!bg-foreground',
  },
  content: {
    default: 'text-default-foreground',
    primary: 'text-primary group-active:!text-primary-foreground',
    secondary: 'text-secondary group-active:!text-secondary-foreground',
    success: 'text-success group-active:!text-success-foreground',
    warning: 'text-warning group-active:!text-warning-foreground',
    danger: 'text-danger group-active:!text-danger-foreground',
    foreground: 'text-foreground',
  },
}

export const colorVariants = {
  solid,
  shadow,
  bordered,
  flat,
  faded,
  light,
  ghost,
}
