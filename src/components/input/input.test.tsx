import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import type { TextInput } from 'react-native'

import Input from './input'

describe('Input', () => {
  it('should render correctly', () => {
    const view = render(<Input label="test input" />)

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<TextInput>()

    render(<Input label="test input" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('should have aria-invalid when invalid', () => {
    render(<Input placeholder="test placeholder" isInvalid={true} />)

    expect(
      screen.queryByPlaceholderText('test placeholder')?.props['aria-invalid']
    ).toBe(true)
  })

  it('should have aria-readonly when isReadOnly', () => {
    render(<Input placeholder="test placeholder" isReadOnly={true} />)

    expect(
      screen.queryByPlaceholderText('test placeholder')?.props['aria-readonly']
    ).toBe(true)
  })

  it('should have disabled attribute when isDisabled', () => {
    render(<Input placeholder="test placeholder" isDisabled={true} />)

    expect(
      screen.queryByPlaceholderText('test placeholder')?.props['disabled']
    ).toBe(true)
  })

  it('should disable the clear button when isDisabled', () => {
    render(<Input isClearable isDisabled value="text" />)

    const clearButton = screen.getByRole('button')

    expect(clearButton?.props.accessibilityState.disabled).toBe(true)
  })

  it('should call dom event handlers only once', () => {
    const onFocus = jest.fn()

    render(
      <Input
        label="test input"
        placeholder="test placeholder"
        onFocus={onFocus}
      />
    )

    const input = screen.getByPlaceholderText('test placeholder')
    fireEvent(input, 'focus')
    fireEvent(input, 'blur')

    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it('should clear the value and onClear is triggered', () => {
    const onClear = jest.fn()
    const ref = React.createRef<TextInput>()

    render(
      <Input
        ref={ref}
        isClearable
        defaultValue="text"
        label="test input"
        onClear={onClear}
      />
    )

    const clearButton = screen.getByRole('button')

    fireEvent.press(clearButton)

    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('should disable clear button when isReadOnly is true', () => {
    const onClear = jest.fn()

    const ref = React.createRef<TextInput>()

    render(
      <Input
        ref={ref}
        isClearable
        isReadOnly
        label="test input"
        onClear={onClear}
      />
    )

    const clearButton = screen.getByRole('button')

    expect(clearButton).not.toBeNull()

    fireEvent.press(clearButton)

    expect(onClear).not.toHaveBeenCalled()
  })
})
