import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import { View } from 'react-native'

import Chip from './chip'

describe('Chip', () => {
  it('should render correctly', () => {
    const view = render(<Chip />)

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<View>()

    render(<Chip ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it.todo('should render with dot variant')

  it('should support startContent', () => {
    render(<Chip startContent={<View testID="start-icon" />} />)

    expect(screen.getByTestId('start-icon')).not.toBeNull()
  })

  it('should support endContent', () => {
    render(<Chip startContent={<View testID="end-icon" />} />)

    expect(screen.getByTestId('end-icon')).not.toBeNull()
  })

  it('should display a close button if onClose is passed', () => {
    render(<Chip onClose={() => {}} />)

    expect(screen.getByRole('button')).not.toBeNull()
  })

  it('should call onClose when close button is pressed', () => {
    const onClose = jest.fn()
    render(<Chip onClose={onClose} />)

    fireEvent.press(screen.getByRole('button'))

    expect(onClose).toHaveBeenCalled()
  })
})
