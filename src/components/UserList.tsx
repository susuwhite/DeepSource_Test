import { useState, useEffect } from "react";
import "./UserList.css";

// 故意使用 any 类型 - DeepSource 应该检测到这个问题
interface User {
  id: number;
  name: string;
  email: string;
  data: any; // 不推荐使用 any
}

// 未使用的变量 - DeepSource 应该检测到
const UNUSED_CONSTANT = "this is never used";

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 未使用的 state - DeepSource 应该检测到
  const [unusedState, setUnusedState] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // 异步函数没有正确处理错误
  async function fetchUsers() {
    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUsers: User[] = [
        { id: 1, name: "张三", email: "zhangsan@example.com", data: {} },
        { id: 2, name: "李四", email: "lisi@example.com", data: {} },
        { id: 3, name: "王五", email: "wangwu@example.com", data: {} },
      ];

      setUsers(mockUsers);
      setLoading(false);
    } catch (e) {
      // 错误处理不完整 - 应该记录具体错误
      setError("加载失败");
      setLoading(false);
    }
  }

  // 复杂度较高的函数 - DeepSource 可能会标记
  function processUserData(user: User): string {
    let result = "";

    if (user.name) {
      if (user.name.length > 0) {
        if (user.name.includes("张")) {
          result = "姓张的用户: " + user.name;
        } else if (user.name.includes("李")) {
          result = "姓李的用户: " + user.name;
        } else if (user.name.includes("王")) {
          result = "姓王的用户: " + user.name;
        } else {
          result = "其他用户: " + user.name;
        }
      } else {
        result = "未知用户";
      }
    } else {
      result = "无名用户";
    }

    return result;
  }

  // 删除用户 - 使用 index 作为 key 的反模式
  const handleDelete = (id: number) => {
    // 直接修改数组 - 不推荐的做法
    const newUsers = users.filter((u) => u.id !== id);
    setUsers(newUsers);
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-list">
      <h2>用户列表</h2>
      <ul>
        {/* 使用 index 作为 key - 不推荐 */}
        {users.map((user, index) => (
          <li key={index} className="user-item">
            <div className="user-info">
              <span className="user-name">{processUserData(user)}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(user.id)}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
