/**
 * 类型定义文件
 */

// 使用 any 的接口 - 应该避免
export interface ApiResponse {
  data: any;
  error?: any;
  meta?: any;
}

// 良好的类型定义示例
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId?: number;
  createdAt: Date;
}

// 过于宽泛的类型
export type AnyFunction = (...args: any[]) => any;

// 联合类型示例
export type Status = "idle" | "loading" | "success" | "error";

// 泛型类型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// 工具类型
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// 复杂嵌套类型 - 可能难以维护
export interface ComplexNestedType {
  level1: {
    level2: {
      level3: {
        level4: {
          value: string;
        };
      };
    };
  };
}
