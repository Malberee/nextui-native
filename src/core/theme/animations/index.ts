export const animations = {
  animation: {
    'spinner-ease-spin': 'spinner-spin 0.8s ease-in-out infinite',
    'spinner-linear-spin': 'spinner-spin 0.8s linear infinite',
    'indeterminate-bar':
      'indeterminate-bar 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite normal none running',
  },
  keyframes: {
    'shimmer': {
      '100%': {
        transform: 'translateX(100%)',
      },
    },
    'spinner-spin': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
    'indeterminate-bar': {
      '0%': {
        transform: 'translateX(-50%) scaleX(0.2)',
      },
      '100%': {
        transform: 'translateX(100%) scaleX(1)',
      },
    },
  },
}
