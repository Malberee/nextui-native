import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import type { View } from 'react-native'
import { Svg } from 'react-native-svg'

import Switch from './switch'

describe('Switch', () => {
  it('should render correctly', () => {
    const view = render(<Switch />)

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<View>()

    render(<Switch ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('should check and uncheck', () => {
    render(<Switch aria-label="switch" />)

    const checkbox = screen.getByRole('switch')

    expect(checkbox.props.checked).toBe(false)

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(true)

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(false)
  })

  it('should not check if disabled', () => {
    render(<Switch isDisabled aria-label="switch" />)

    const checkbox = screen.getByRole('switch')

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(false)
  })

  it('should be checked if defaultSelected', () => {
    render(<Switch defaultSelected aria-label="switch" />)

    const checkbox = screen.getByRole('switch')

    expect(checkbox.props.checked).toBe(true)
  })

  it('should not check if readOnly', () => {
    render(<Switch isReadOnly aria-label="switch" />)

    const checkbox = screen.getByRole('switch')

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(false)
  })

  it('should check and uncheck with controlled state', () => {
    const ControlledSwitch = ({ onValueChange }: any) => {
      const [isSelected, setIsSelected] = React.useState(false)

      return (
        <Switch
          aria-label="switch"
          isSelected={isSelected}
          onValueChange={(selected) => {
            onValueChange?.(selected)
            setIsSelected(selected)
          }}
        />
      )
    }

    const onValueChange = jest.fn()

    render(<ControlledSwitch onValueChange={onValueChange} />)

    const checkbox = screen.getByRole('switch')

    expect(checkbox.props.checked).toBe(false)

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(true)

    expect(onValueChange).toHaveBeenCalledWith(true)
  })

  it('should render the thumbIcon', () => {
    render(
      <Switch aria-label="switch" thumbIcon={<Svg testID="thumb-icon" />} />
    )

    expect(screen.getByTestId('thumb-icon')).toBeTruthy()
  })

  it('should work with thumbIcon as "function"', () => {
    const thumbIcon = jest.fn(() => <Svg testID="thumb-icon" />)

    render(<Switch aria-label="thumb-icon" thumbIcon={thumbIcon} />)

    expect(thumbIcon).toHaveBeenCalled()
    expect(screen.getByTestId('thumb-icon')).toBeTruthy()
  })

  it('should change the thumbIcon when clicked', () => {
    const thumbIcon = jest.fn((props) => {
      const { isSelected } = props

      return isSelected ? (
        <Svg testID="checked-thumb-icon" />
      ) : (
        <Svg testID="unchecked-thumb-icon" />
      )
    })

    render(<Switch aria-label="switch" thumbIcon={thumbIcon} />)

    const checkbox = screen.getByRole('switch')

    expect(checkbox.props.checked).toBe(false)

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(true)

    expect(thumbIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        isSelected: true,
      })
    )

    const checkedthumbIcon = screen.queryByTestId('checked-thumb-icon')

    expect(checkedthumbIcon).toBeTruthy()

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(false)

    expect(thumbIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        isSelected: false,
      })
    )

    const uncheckedthumbIcon = screen.queryByTestId('unchecked-thumb-icon')

    expect(uncheckedthumbIcon).toBeTruthy()
  })

  it('should work with "startContent"', () => {
    render(
      <Switch aria-label="switch" startContent={<Svg testID="start-icon" />} />
    )

    expect(screen.getByTestId('start-icon')).toBeTruthy()
  })

  it('should work with "endContent"', () => {
    render(
      <Switch aria-label="switch" endContent={<Svg testID="end-icon" />} />
    )

    expect(screen.getByTestId('end-icon')).toBeTruthy()
  })

  it('should work with "startContent" and "endContent"', () => {
    render(
      <Switch
        aria-label="switch"
        endContent={<Svg testID="end-icon" />}
        startContent={<Svg testID="start-icon" />}
      />
    )

    expect(screen.getByTestId('start-icon')).toBeTruthy()
    expect(screen.getByTestId('end-icon')).toBeTruthy()
  })
})
