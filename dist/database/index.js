// 数据库连接管理
import mysql from 'mysql2/promise';
import { DB_CONFIG } from '../config/index.js';
// 创建数据库连接池
export const pool = mysql.createPool(DB_CONFIG);
/**
 * 测试数据库连接
 */
export async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection established successfully");
        connection.release();
    }
    catch (error) {
        console.error("Failed to connect to database:", error);
        throw error;
    }
}
/**
 * 获取数据库表名和注释
 */
export async function getTableNameAndComment() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(`SELECT TABLE_NAME as tableName, TABLE_COMMENT as comment 
       FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = ?`, [DB_CONFIG.database]);
        return rows;
    }
    finally {
        connection.release();
    }
}
/**
 * 获取表字段详细信息
 */
export async function getTableColumnDetail(tableName) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(`SELECT 
         COLUMN_NAME as columnName,
         COLUMN_TYPE as columnType,
         IS_NULLABLE as isNullable,
         COLUMN_KEY as columnKey,
         COLUMN_DEFAULT as columnDefault,
         EXTRA as extra,
         COLUMN_COMMENT as comment
       FROM information_schema.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
       ORDER BY ORDINAL_POSITION`, [DB_CONFIG.database, tableName]);
        return rows;
    }
    finally {
        connection.release();
    }
}
/**
 * 获取表外键关系
 */
export async function getTableForeignKeys(tableName) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(`SELECT 
         COLUMN_NAME as columnName,
         REFERENCED_TABLE_NAME as referencedTableName,
         REFERENCED_COLUMN_NAME as referencedColumnName
       FROM information_schema.KEY_COLUMN_USAGE 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL`, [DB_CONFIG.database, tableName]);
        return rows;
    }
    finally {
        connection.release();
    }
}
/**
 * 获取表索引信息
 */
export async function getTableIndexes(tableName) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(`SHOW INDEXES FROM ${tableName} FROM ${DB_CONFIG.database}`);
        // 格式化索引信息
        return rows.map((index) => ({
            tableName: index.Table,
            indexName: index.Key_name,
            columnName: index.Column_name,
            seqInIndex: index.Seq_in_index,
            indexType: index.Index_type,
            isUnique: index.Non_unique === 0,
            comment: index.Comment
        }));
    }
    finally {
        connection.release();
    }
}
/**
 * 获取表行数
 */
export async function getTableRowCount(tableName) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(`SELECT COUNT(*) as rowCount FROM ${tableName}`);
        return rows[0];
    }
    finally {
        connection.release();
    }
}
/**
 * 获取数据库引擎
 */
export async function getDatabaseEngine(tableName) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(`SELECT ENGINE as engine FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`, [DB_CONFIG.database, tableName]);
        return rows[0];
    }
    finally {
        connection.release();
    }
}
/**
 * 执行自定义SQL查询
 */
export async function executeSql(sql) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(sql);
        return rows;
    }
    finally {
        connection.release();
    }
}
