import { useState, useCallback } from 'react'
import './Counter.css'

interface CounterProps {
  initialValue?: number
}

export function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue)
  const [history, setHistory] = useState<number[]>([initialValue])

  // 没有使用 useCallback - 每次渲染都会创建新函数
  const increment = () => {
    const newCount = count + 1
    setCount(newCount)
    // 直接 push 到数组 - 可能导致问题
    history.push(newCount)
    setHistory([...history])
  }

  const decrement = () => {
    const newCount = count - 1
    setCount(newCount)
    history.push(newCount)
    setHistory([...history])
  }

  // 魔法数字 - 应该使用常量
  const multiplyByTen = () => {
    const newCount = count * 10
    setCount(newCount)
    history.push(newCount)
    setHistory([...history])
  }

  // 重复代码 - 可以抽取为通用函数
  const divideByTwo = () => {
    const newCount = Math.floor(count / 2)
    setCount(newCount)
    history.push(newCount)
    setHistory([...history])
  }

  const reset = useCallback(() => {
    setCount(initialValue)
    setHistory([initialValue])
  }, [initialValue])

  // 复杂的条件渲染
  const getCountStatus = () => {
    if (count < 0) {
      return <span className="status negative">负数</span>
    } else if (count === 0) {
      return <span className="status zero">零</span>
    } else if (count > 0 && count < 10) {
      return <span className="status small">小正数</span>
    } else if (count >= 10 && count < 100) {
      return <span className="status medium">中等正数</span>
    } else if (count >= 100 && count < 1000) {
      return <span className="status large">大正数</span>
    } else {
      return <span className="status huge">超大数</span>
    }
  }

  return (
    <div className="counter">
      <h2>计数器</h2>
      
      <div className="counter-display">
        <span className="count-value">{count}</span>
        {getCountStatus()}
      </div>

      <div className="counter-buttons">
        <button onClick={decrement}>-1</button>
        <button onClick={increment}>+1</button>
        <button onClick={multiplyByTen}>×10</button>
        <button onClick={divideByTwo}>÷2</button>
        <button onClick={reset} className="reset-btn">重置</button>
      </div>

      <div className="counter-history">
        <h3>历史记录</h3>
        <div className="history-list">
          {history.map((value, index) => (
            <span key={index} className="history-item">{value}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
