import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import { Text, type View } from 'react-native'

import Button from './button'

describe('Button component', () => {
  it('should render correctly', () => {
    const view = render(<Button disableRipple />)

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<View>()

    render(<Button ref={ref} disableRipple />)
    expect(ref.current).not.toBeNull()
  })

  it('should trigger onPress function', () => {
    const onPress = jest.fn()
    render(<Button testID="button" disableRipple onPress={onPress} />)

    fireEvent.press(screen.getByTestId('button'))

    expect(onPress).toHaveBeenCalled()
  })

  it('should ignore events when disabled', () => {
    const onPress = jest.fn()
    render(
      <Button testID="button" disableRipple isDisabled onPress={onPress} />
    )

    fireEvent.press(screen.getByTestId('button'))

    expect(onPress).not.toHaveBeenCalled()
  })

  it('should renders with start icon', () => {
    render(
      <Button
        disableRipple
        startContent={<Text testID="start-icon">Icon</Text>}
      >
        Button
      </Button>
    )

    expect(screen.getByTestId('start-icon')).toBeTruthy()
  })

  it('should renders with end icon', () => {
    render(
      <Button disableRipple endContent={<Text testID="end-icon">Icon</Text>}>
        Button
      </Button>
    )

    expect(screen.getByTestId('end-icon')).toBeTruthy()
  })
})
