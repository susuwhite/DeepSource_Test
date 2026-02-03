import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TodoList } from './TodoList'

describe('TodoList', () => {
  it('should render todo list header', () => {
    render(<TodoList />)
    expect(screen.getByText('待办事项')).toBeInTheDocument()
  })

  it('should render input and add button', () => {
    render(<TodoList />)
    expect(screen.getByPlaceholderText('添加新任务...')).toBeInTheDocument()
    expect(screen.getByText('添加')).toBeInTheDocument()
  })

  it('should add a new todo when form is submitted', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const addBtn = screen.getByText('添加')

    fireEvent.change(input, { target: { value: '测试任务' } })
    fireEvent.click(addBtn)

    expect(screen.getByText('测试任务')).toBeInTheDocument()
  })

  it('should not add empty todo', () => {
    render(<TodoList />)
    const addBtn = screen.getByText('添加')
    fireEvent.click(addBtn)

    // Should still show 0 todos
    expect(screen.getByText('全部 (0)')).toBeInTheDocument()
  })

  it('should toggle todo completion', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const addBtn = screen.getByText('添加')

    fireEvent.change(input, { target: { value: '测试任务' } })
    fireEvent.click(addBtn)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(screen.getByText('已完成 (1)')).toBeInTheDocument()
  })

  it('should filter todos by status', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const addBtn = screen.getByText('添加')

    // Add two todos
    fireEvent.change(input, { target: { value: '任务1' } })
    fireEvent.click(addBtn)
    fireEvent.change(input, { target: { value: '任务2' } })
    fireEvent.click(addBtn)

    // Complete one
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    // Filter by active (uncompleted)
    const activeFilter = screen.getByRole('button', { name: /未完成/ })
    fireEvent.click(activeFilter)

    expect(screen.getByText('任务2')).toBeInTheDocument()
    expect(screen.queryByText('任务1')).not.toBeInTheDocument()
  })

  it('should delete todo', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const addBtn = screen.getByText('添加')

    fireEvent.change(input, { target: { value: '要删除的任务' } })
    fireEvent.click(addBtn)

    const deleteBtn = screen.getByText('×')
    fireEvent.click(deleteBtn)

    expect(screen.queryByText('要删除的任务')).not.toBeInTheDocument()
  })

  it('should show clear completed button when there are completed todos', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const addBtn = screen.getByText('添加')

    fireEvent.change(input, { target: { value: '任务' } })
    fireEvent.click(addBtn)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(screen.getByText('清除已完成')).toBeInTheDocument()
  })
})
