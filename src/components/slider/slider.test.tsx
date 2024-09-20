import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import { NativeModules, Pressable, View } from 'react-native'

import type { SliderValue } from './hooks'
import Slider from './slider'

NativeModules.SettingsManager = {
  settings: {
    AppleLocale: 'en_US',
    AppleLanguages: ['en'],
  },
}

describe('Slider', () => {
  it('should render correctly', () => {
    const view = render(<Slider />)

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<View>()

    render(<Slider ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('should support aria-label', () => {
    render(<Slider aria-label="Aria Label" testID="test-slider" />)

    const group = screen.getByTestId('test-slider')

    expect(group.props['aria-label']).toBe('Aria Label')
  })

  it('should support label', () => {
    render(<Slider label="Label" />)

    const label = screen.getByText('Label')
    expect(label).toBeTruthy()

    const output = screen.getByText('0')
    expect(output).toBeTruthy()
  })

  it('should support minValue and maxValue', () => {
    render(
      <Slider
        minValue={10}
        maxValue={20}
        renderThumb={(props) => <View {...props} testID="test-thumb" />}
      />
    )

    const output = screen.getByTestId('test-thumb')
    expect(output.props['aria-valuemin']).toBe(10)
    expect(output.props['aria-valuemax']).toBe(20)
  })

  it('should supports controlled value', async () => {
    const setValues: number[] = []

    function Test() {
      const [value, _setValue] = React.useState<SliderValue>(50)
      const setValue = React.useCallback(
        (val: SliderValue) => {
          setValues.push(val as number)
          _setValue(val)
        },
        [_setValue]
      )

      return (
        <View>
          <Slider
            label="The Label"
            value={value}
            onChange={setValue}
            renderThumb={(props) => <View {...props} testID="test-thumb" />}
          />
          <Pressable role="button" onPress={() => setValue(55)}>
            55
          </Pressable>
        </View>
      )
    }

    render(<Test />)

    const output = screen.getByText('50')
    expect(output).toBeTruthy()

    const slider = screen.getByTestId('test-thumb')
    expect(slider.props['aria-valuetext']).toBe('50')

    const button = screen.getByRole('button')

    fireEvent.press(button)

    expect(slider.props['aria-valuetext']).toBe('55')
    expect(setValues).toStrictEqual([55])
  })

  it('should support range values', () => {
    render(
      <Slider
        aria-label="Range Slider Aria Label"
        defaultValue={[10, 20]}
        renderThumb={(props) => <View {...props} testID="test-thumb" />}
      />
    )

    const [leftSlider, rightSlider] = screen.getAllByTestId('test-thumb')

    expect(leftSlider?.props['aria-valuetext']).toBe('10')
    expect(rightSlider?.props['aria-valuetext']).toBe('20')
  })

  it('should supports controlled range values', () => {
    const setValues: number[] = []

    function Test() {
      const [value, _setValue] = React.useState<SliderValue>([10, 20])
      const setValue = React.useCallback(
        (val: SliderValue) => {
          setValues.push(val as number)
          _setValue(val)
        },
        [_setValue]
      )

      return (
        <View>
          <Slider
            testID="test-slider"
            label="The Label"
            value={value}
            onChange={setValue}
            renderThumb={(props) => <View {...props} testID="test-thumb" />}
          />
          <Pressable role="button" onPress={() => setValue([15, 25])}>
            15, 25
          </Pressable>
        </View>
      )
    }

    render(<Test />)

    const [leftSlider, rightSlider] = screen.getAllByTestId('test-thumb')
    const button = screen.getByRole('button')

    expect(leftSlider?.props['aria-valuetext']).toBe('10')
    expect(rightSlider?.props['aria-valuetext']).toBe('20')

    fireEvent.press(button)

    expect(leftSlider?.props['aria-valuetext']).toBe('15')
    expect(rightSlider?.props['aria-valuetext']).toBe('25')
  })

  it('should supports marks', () => {
    render(
      <Slider
        hideThumb
        defaultValue={20}
        label="The Label"
        marks={[
          {
            value: 0.2,
            label: '20%',
          },
          {
            value: 0.5,
            label: '50%',
          },
          {
            value: 0.8,
            label: '80%',
          },
        ]}
        maxValue={1}
        minValue={0}
        step={0.1}
      />
    )

    const marks = screen.getAllByText(/%/)

    expect(marks).toHaveLength(3)
  })

  it('should move thumb after clicking mark (single thumb)', () => {
    render(
      <Slider
        defaultValue={0.2}
        label="The Label"
        renderThumb={(props) => <View {...props} testID="test-thumb" />}
        marks={[
          {
            value: 0.2,
            label: '20%',
          },
          {
            value: 0.5,
            label: '50%',
          },
          {
            value: 0.8,
            label: '80%',
          },
        ]}
        maxValue={1}
        minValue={0}
        step={0.1}
      />
    )

    const marks = screen.getAllByText(/%/)

    expect(marks).toHaveLength(3)

    fireEvent.press(marks[1]!)

    const slider = screen.getByTestId('test-thumb')

    expect(slider.props['aria-valuetext']).toBe('0.5')
  })

  it('should move thumb after clicking mark (left and right thumbs)', () => {
    render(
      <Slider
        defaultValue={[0.2, 0.8]}
        label="The Label"
        renderThumb={(props) => <View {...props} testID="test-thumb" />}
        marks={[
          {
            value: 0.2,
            label: '20%',
          },
          {
            value: 0.5,
            label: '50%',
          },
          {
            value: 0.8,
            label: '80%',
          },
        ]}
        maxValue={1}
        minValue={0}
        step={0.1}
      />
    )

    const marks = screen.getAllByText(/%/)

    expect(marks).toHaveLength(3)

    fireEvent.press(marks[1]!)

    const [leftThumb, rightThumb] = screen.getAllByTestId('test-thumb')

    expect(leftThumb?.props['aria-valuetext']).toBe('0.5')
    expect(rightThumb?.props['aria-valuetext']).toBe('0.8')
  })
})
