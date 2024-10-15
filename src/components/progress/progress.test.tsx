import { render, screen } from '@testing-library/react-native'
import React from 'react'
import { NativeModules, View } from 'react-native'

import Progress from './progress'

NativeModules.SettingsManager = {
  settings: {
    AppleLocale: 'en_US',
    AppleLanguages: ['en'],
  },
}

describe('Progress', () => {
  it('should render correctly', () => {
    const view = render(<Progress aria-label="progress" />)

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<View>()

    render(<Progress ref={ref} aria-label="progress" />)

    expect(ref.current).not.toBeNull()
  })

  it('should contain progress aria attributes', () => {
    render(<Progress aria-label="progress" testID="progress" />)
    const view = screen.queryByTestId('progress')

    expect(view?.props.role).toBe('progressbar')

    expect(view?.props['aria-valuemin']).toBe(0)
    expect(view?.props['aria-valuemax']).toBe(100)
    expect(view?.props['aria-valuenow']).toBe(0)
    expect(view?.props['aria-valuetext']).toBe('0%')
  })

  it('should display the correct value', () => {
    render(<Progress aria-label="progress" value={55} showValueLabel />)

    const value = screen.queryByText('55%')

    expect(value).not.toBeNull()
  })

  it('should support label value formatting', () => {
    render(
      <Progress
        aria-label="progress"
        testID="progress"
        formatOptions={{ style: 'currency', currency: 'ARS' }}
        value={55}
      />
    )

    const value = screen.queryByTestId('progress')

    expect(value?.props['aria-valuetext']).toMatch(/ARS\s55\.00/)
  })

  it('should ignore a value under the minimum', () => {
    render(<Progress aria-label="progress" testID="progress" value={-1} />)

    const value = screen.queryByTestId('progress')

    expect(value?.props['aria-valuenow']).toBe(0)
  })

  it('should ignore a value under the minimum', () => {
    render(<Progress aria-label="progress" testID="progress" value={101} />)

    const value = screen.queryByTestId('progress')

    expect(value?.props['aria-valuenow']).toBe(100)
  })

  it('should render a value label', () => {
    render(<Progress showValueLabel aria-label="progress" value={55} />)

    expect(screen.getByText('55%')).not.toBeNull()
  })

  it('the aria-valuenow should not be set if isIndeterminate is true', () => {
    render(<Progress isIndeterminate aria-label="progress" testID="progress" />)

    const value = screen.queryByTestId('progress')

    expect(value?.props['aria-valuenow']).toBeUndefined()
  })
})
