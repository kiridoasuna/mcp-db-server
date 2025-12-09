// 配置管理文件
import dotenv from 'dotenv';
// 加载环境变量
dotenv.config();
// 应用服务器配置
export const SERVER_CONFIG = {
    PORT: parseInt(process.env.PORT || "3000")
};
// 数据库配置
export const DB_CONFIG = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "example_db",
    port: parseInt(process.env.DB_PORT || "3306"),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
