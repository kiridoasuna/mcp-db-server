// 类型定义文件

/**
 * 工具注册信息
 */
export interface ToolRegistration {
  name: string;
  description: string;
}

/**
 * 数据库连接配置
 */
export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
}

/**
 * 统一响应格式
 */
export interface ApiResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}
