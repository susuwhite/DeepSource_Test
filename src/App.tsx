import { useState } from "react";
import "./App.css";
import { UserList } from "./components/UserList";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";

function App() {
  const [activeTab, setActiveTab] = useState<"users" | "counter" | "todos">(
    "users",
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>DeepSource Test App</h1>
        <p>用于测试 DeepSource 代码质量分析的示例项目</p>
      </header>

      <nav className="app-nav">
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          用户列表
        </button>
        <button
          className={activeTab === "counter" ? "active" : ""}
          onClick={() => setActiveTab("counter")}
        >
          计数器
        </button>
        <button
          className={activeTab === "todos" ? "active" : ""}
          onClick={() => setActiveTab("todos")}
        >
          待办事项
        </button>
      </nav>

      <main className="app-content">
        {activeTab === "users" && <UserList />}
        {activeTab === "counter" && <Counter />}
        {activeTab === "todos" && <TodoList />}
      </main>
    </div>
  );
}

export default App;
