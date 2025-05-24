import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import type { View } from 'react-native'

import Checkbox, { type CheckboxProps } from './checkbox'

describe('Checkbox', () => {
  it('should render correctly', () => {
    const view = render(<Checkbox>Label</Checkbox>)

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<View>()

    render(<Checkbox ref={ref}>Option</Checkbox>)
    expect(ref.current).not.toBeNull()
  })

  it('should work correctly with initial value', () => {
    render(<Checkbox isSelected>Option</Checkbox>)

    expect(screen.getByRole('checkbox').props.checked).toBe(true)
  })

  it('should change value after click', () => {
    render(<Checkbox testID="checkbox-test">Option</Checkbox>)
    const checkbox = screen.getByRole('checkbox')

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(true)
  })

  it('should ignore events when disabled', () => {
    render(<Checkbox isDisabled>Option</Checkbox>)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(false)
  })

  it('should work correctly with indeterminate value', () => {
    render(<Checkbox isDisabled>Option</Checkbox>)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.press(checkbox)

    expect(checkbox.props.checked).toBe(false)
  })

  it('should work correctly with onValueChange prop', () => {
    const onValueChange = jest.fn()
    render(
      <Checkbox testID="checkbox-test" onValueChange={onValueChange}>
        Option
      </Checkbox>
    )

    fireEvent.press(screen.getByRole('checkbox'))

    expect(onValueChange).toHaveBeenCalled()
  })

  it('should work correctly with controlled value', () => {
    const onValueChange = jest.fn()

    const Component = (props: CheckboxProps) => {
      const [value, setValue] = React.useState(false)

      return (
        <Checkbox
          {...props}
          isSelected={value}
          onValueChange={(checked) => {
            setValue(checked)
            onValueChange(checked)
          }}
        />
      )
    }

    render(
      <Component testID="checkbox-test" onValueChange={onValueChange}>
        Option
      </Component>
    )

    fireEvent.press(screen.getByRole('checkbox'))

    expect(onValueChange).toHaveBeenCalled()
  })
})
