import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import type { View } from 'react-native'

import Radio from './radio'
import RadioGroup, { type RadioGroupProps } from './radio-group'

describe('Radio', () => {
  it('should render correctly', () => {
    const view = render(
      <RadioGroup>
        <Radio value="1">Option 1</Radio>
      </RadioGroup>
    )

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded - group', () => {
    const ref = React.createRef<View>()

    render(
      <RadioGroup ref={ref} label="Options">
        <Radio value="1">Option 1</Radio>
      </RadioGroup>
    )
    expect(ref.current).not.toBeNull()
  })

  it('ref should be forwarded - option', () => {
    const ref = React.createRef<View>()

    render(
      <RadioGroup label="Options">
        <Radio ref={ref} value="1">
          Option 1
        </Radio>
      </RadioGroup>
    )
    expect(ref.current).not.toBeNull()
  })

  it('should work correctly with initial value', () => {
    render(
      <RadioGroup defaultValue="2" label="Options">
        <Radio testID="radio-test-1" value="1">
          Option 1
        </Radio>
      </RadioGroup>
    )

    expect(screen.getByTestId('radio-test-1').props.checked).toBe(false)

    render(
      <RadioGroup defaultValue="2" label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio testID="radio-test-2" value="2">
          Option 1
        </Radio>
      </RadioGroup>
    )

    expect(screen.getByTestId('radio-test-2').props.checked).toBe(true)
  })

  it('should change value after press', () => {
    render(
      <RadioGroup defaultValue="1" label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio testID="radio-test-2" value="2">
          Option 2
        </Radio>
      </RadioGroup>
    )

    const radio2 = screen.getByTestId('radio-test-2')

    fireEvent.press(radio2)

    expect(radio2.props.checked).toBe(true)
  })

  it('should ignore events when disabled', () => {
    render(
      <RadioGroup label="Options">
        <Radio isDisabled testID="radio-test-1" value="1">
          Option 1
        </Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
    )

    const radio1 = screen.getByTestId('radio-test-1')

    fireEvent.press(radio1)

    expect(radio1.props.checked).toBe(false)
  })

  it('should work correctly with "onValueChange" prop', () => {
    const onValueChange = jest.fn()

    render(
      <RadioGroup
        defaultValue="1"
        label="Options"
        onValueChange={onValueChange}
      >
        <Radio value="1">Option 1</Radio>
        <Radio testID="radio-test-2" value="2">
          Option 2
        </Radio>
      </RadioGroup>
    )

    let radio2 = screen.getByTestId('radio-test-2')

    fireEvent.press(radio2)

    expect(onValueChange).toBeCalledWith('2')

    expect(radio2.props.checked).toBe(true)
  })

  it('should work correctly with controlled value', () => {
    const onValueChange = jest.fn()

    const Component = ({ onValueChange }: Omit<RadioGroupProps, 'value'>) => {
      const [value, setValue] = React.useState('1')

      return (
        <RadioGroup
          label="Options"
          value={value}
          onValueChange={(next) => {
            setValue(next)
            onValueChange?.(next as any)
          }}
        >
          <Radio value="1">Option 1</Radio>
          <Radio testID="radio-test-2" value="2">
            Option 2
          </Radio>
        </RadioGroup>
      )
    }

    render(<Component onValueChange={onValueChange} />)

    let radio2 = screen.getByTestId('radio-test-2')

    fireEvent.press(radio2)

    expect(onValueChange).toBeCalled()

    expect(radio2.props.checked).toBe(true)
  })

  it('should support help text description', () => {
    render(
      <RadioGroup
        testID="test-radiogroup"
        description="Help text"
        label="Options"
      >
        <Radio value="1">Option 1</Radio>
      </RadioGroup>
    )

    const description = screen.getByText('Help text')
    expect(description).toBeTruthy()
  })

  it('should support help text description for the individual radios', () => {
    render(
      <RadioGroup description="Help text" label="Options">
        <Radio description="Help text for option 1" value="1">
          Option 1
        </Radio>
        <Radio description="Help text for option 2" value="2">
          Option 2
        </Radio>
      </RadioGroup>
    )

    const radio1 = screen.getByText('Help text for option 1')
    const radio2 = screen.getByText('Help text for option 2')

    expect(radio1).toBeTruthy()
    expect(radio2).toBeTruthy()
  })
})
