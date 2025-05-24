import { act, fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import type { View } from 'react-native'

import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'

describe('Checkbox.Group', () => {
  it('should render correctly', () => {
    const view = render(
      <CheckboxGroup defaultValue={[]} label="Select cities">
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      </CheckboxGroup>
    )

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<View>()

    render(
      <CheckboxGroup ref={ref} defaultValue={[]} label="Select cities">
        <Checkbox value="sydney" ref={ref}>
          Sydney
        </Checkbox>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      </CheckboxGroup>
    )

    expect(ref.current).not.toBeNull()
  })

  it('should work correctly with initial value', () => {
    render(
      <CheckboxGroup defaultValue={['sydney']} label="Select cities">
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      </CheckboxGroup>
    )

    expect(screen.getByRole('checkbox', { name: 'Sydney' }).props.checked).toBe(
      true
    )

    expect(
      screen.getByRole('checkbox', { name: 'Buenos Aires' }).props.checked
    ).toBe(false)
  })

  it('should change value after click', () => {
    let value = ['sydney']

    render(
      <CheckboxGroup
        defaultValue={['sydney']}
        label="Select cities"
        onChange={(val) =>
          act(() => {
            value = val
          })
        }
      >
        <Checkbox value="sydney" testID="first-checkbox">
          Sydney
        </Checkbox>
        <Checkbox value="buenos-aires" testID="second-checkbox">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>
    )

    const secondCheckbox = screen.getByTestId('second-checkbox')

    fireEvent.press(secondCheckbox)

    expect(value).toEqual(['sydney', 'buenos-aires'])
  })

  it('should ingore events when disabled', () => {
    render(
      <CheckboxGroup isDisabled defaultValue={['sydney']} label="Select cities">
        <Checkbox testID="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox testID="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>
    )

    const firstCheckbox = screen.getByTestId('first-checkbox')
    const secondCheckbox = screen.getByTestId('second-checkbox')

    expect(firstCheckbox.props.checked).toBe(true)
    expect(secondCheckbox.props.checked).toBe(false)

    secondCheckbox && fireEvent.press(secondCheckbox)

    expect(firstCheckbox.props.checked).toBe(true)
    expect(secondCheckbox.props.checked).toBe(false)
  })

  it('should work correctly with controlled value', () => {
    let checked = ['sydney']
    const onChange = jest.fn((val) => {
      checked = val
    })

    render(
      <CheckboxGroup
        value={checked}
        onChange={(checked) => {
          act(() => {
            onChange(checked)
          })
        }}
        label="Select cities"
      >
        <Checkbox testID="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox testID="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>
    )

    const secondCheckbox = screen.getByTestId('second-checkbox')

    fireEvent.press(secondCheckbox)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(checked).toEqual(['sydney', 'buenos-aires'])
  })
})
