import { useState, FormEvent } from "react";
import "./TodoList.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// 工具函数 - 可能有问题的实现
function generateId(): number {
  // 使用 Math.random 生成 ID - 不安全
  return Math.floor(Math.random() * 1000000);
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // == 而不是 === 的比较 - 不推荐
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 弱比较
    if (inputValue == "") {
      return;
    }

    const newTodo: Todo = {
      id: generateId(),
      text: inputValue,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        // 冗余的三元运算符
        return todo.id === id
          ? { ...todo, completed: todo.completed ? false : true }
          : todo;
      }),
    );
  };

  const deleteTodo = (id: number) => {
    // 可以简化
    const newTodos = todos.filter((todo) => {
      if (todo.id === id) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(newTodos);
  };

  // 没有使用 useMemo - 每次渲染都会重新计算
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      case "all":
      default:
        return true;
    }
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  // 危险的 innerHTML 使用示例（已注释，仅作演示）
  // const renderHtml = (html: string) => {
  //   return <div dangerouslySetInnerHTML={{ __html: html }} />
  // }

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  return (
    <div className="todo-list">
      <h2>待办事项</h2>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加新任务..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          添加
        </button>
      </form>

      <div className="todo-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          全部 ({todos.length})
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          未完成 ({activeCount})
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          已完成 ({completedCount})
        </button>
      </div>

      <ul className="todos">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <label className="todo-label">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
            </label>
            <button
              className="delete-todo-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="todo-footer">
          <span>{activeCount} 项待完成</span>
          {completedCount > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              清除已完成
            </button>
          )}
        </div>
      )}
    </div>
  );
}
