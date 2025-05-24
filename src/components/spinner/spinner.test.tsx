import { render, screen } from '@testing-library/react-native'
import React from 'react'
import type { View } from 'react-native'

import Spinner from './spinner'

describe('Spinner', () => {
  it('should render correctly', () => {
    const view = render(<Spinner />)

    expect(() => view.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<View>()

    render(<Spinner ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('should render with label when passed ', () => {
    render(<Spinner label="Loading" />)

    expect(screen.getByText('Loading')).toBeTruthy()
  })

  it('should render with label when children is passed', () => {
    render(<Spinner>Custom label</Spinner>)

    expect(screen.getByText('Custom label')).toBeTruthy()
  })
})
