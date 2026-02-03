import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Counter } from './Counter'

describe('Counter', () => {
  it('should render with default value', () => {
    render(<Counter />)
    expect(screen.getByText('零')).toBeInTheDocument()
  })

  it('should render with custom initial value', () => {
    render(<Counter initialValue={10} />)
    expect(screen.getByText('中等正数')).toBeInTheDocument()
  })

  it('should increment count when +1 button is clicked', () => {
    render(<Counter />)
    const incrementBtn = screen.getByText('+1')
    fireEvent.click(incrementBtn)
    expect(screen.getByText('小正数')).toBeInTheDocument()
  })

  it('should decrement count when -1 button is clicked', () => {
    render(<Counter initialValue={5} />)
    const decrementBtn = screen.getByText('-1')
    fireEvent.click(decrementBtn)
    // 4 is still a small positive number
    expect(screen.getByText('小正数')).toBeInTheDocument()
  })

  it('should multiply by 10 when ×10 button is clicked', () => {
    render(<Counter initialValue={5} />)
    const multiplyBtn = screen.getByText('×10')
    fireEvent.click(multiplyBtn)
    // 50 is a medium positive number
    expect(screen.getByText('中等正数')).toBeInTheDocument()
  })

  it('should divide by 2 when ÷2 button is clicked', () => {
    render(<Counter initialValue={10} />)
    const divideBtn = screen.getByText('÷2')
    fireEvent.click(divideBtn)
    // 5 is a small positive number
    expect(screen.getByText('小正数')).toBeInTheDocument()
  })

  it('should reset to initial value when reset button is clicked', () => {
    render(<Counter initialValue={5} />)
    const incrementBtn = screen.getByText('+1')
    fireEvent.click(incrementBtn)
    fireEvent.click(incrementBtn)
    
    const resetBtn = screen.getByText('重置')
    fireEvent.click(resetBtn)
    expect(screen.getByText('小正数')).toBeInTheDocument()
  })

  it('should show correct status for negative numbers', () => {
    render(<Counter initialValue={0} />)
    const decrementBtn = screen.getByText('-1')
    fireEvent.click(decrementBtn)
    expect(screen.getByText('负数')).toBeInTheDocument()
  })

  it('should show correct status for zero', () => {
    render(<Counter initialValue={0} />)
    expect(screen.getByText('零')).toBeInTheDocument()
  })

  it('should display history section', () => {
    render(<Counter initialValue={0} />)
    expect(screen.getByText('历史记录')).toBeInTheDocument()
  })

  it('should display counter title', () => {
    render(<Counter />)
    expect(screen.getByText('计数器')).toBeInTheDocument()
  })
})
