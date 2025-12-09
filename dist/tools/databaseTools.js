import { z } from 'zod';
import { getTableNameAndComment, getTableColumnDetail, getTableForeignKeys, getTableIndexes, getTableRowCount, getDatabaseEngine, executeSql } from '../database/index.js';
/**
 * 注册数据库工具
 */
export function registerDatabaseTools(server, registeredTools) {
    console.log('Registering database tools...');
    // MySQL数据库工具 - 获取数据库所有表名和注释
    server.registerTool('getTableNameAndComment', {
        description: '获取数据库所有表名和注释',
        inputSchema: {}, // 无参数
    }, async () => {
        try {
            const rows = await getTableNameAndComment();
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(rows, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            console.error('Error in getTableNameAndComment:', error);
            throw error;
        }
    });
    registeredTools.push({
        name: 'getTableNameAndComment',
        description: '获取数据库所有表名和注释'
    });
    // MySQL数据库工具 - 获取表字段详细信息
    server.registerTool('getTableColumnDetail', {
        description: '获取表字段详细信息',
        inputSchema: {
            tableName: z.string().describe('表名')
        },
    }, async (params) => {
        try {
            const rows = await getTableColumnDetail(params.tableName);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(rows, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            console.error('Error in getTableColumnDetail:', error);
            throw error;
        }
    });
    registeredTools.push({
        name: 'getTableColumnDetail',
        description: '获取表字段详细信息'
    });
    // MySQL数据库工具 - 获取表外键关系
    server.registerTool('getTableForeignKeys', {
        description: '获取表外键关系',
        inputSchema: {
            tableName: z.string().describe('表名')
        },
    }, async (params) => {
        try {
            const rows = await getTableForeignKeys(params.tableName);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(rows, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            console.error('Error in getTableForeignKeys:', error);
            throw error;
        }
    });
    registeredTools.push({
        name: 'getTableForeignKeys',
        description: '获取表外键关系'
    });
    // MySQL数据库工具 - 获取表索引信息
    server.registerTool('getTableIndexes', {
        description: '获取表索引信息',
        inputSchema: {
            tableName: z.string().describe('表名')
        },
    }, async (params) => {
        try {
            const rows = await getTableIndexes(params.tableName);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(rows, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            console.error('Error in getTableIndexes:', error);
            throw error;
        }
    });
    registeredTools.push({
        name: 'getTableIndexes',
        description: '获取表索引信息'
    });
    // MySQL数据库工具 - 获取表行数
    server.registerTool('getTableRowCount', {
        description: '获取指定表的行数',
        inputSchema: {
            tableName: z.string().describe('表名')
        },
    }, async (params) => {
        try {
            const rows = await getTableRowCount(params.tableName);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(rows, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            console.error('Error in getTableRowCount:', error);
            throw error;
        }
    });
    registeredTools.push({
        name: 'getTableRowCount',
        description: '获取指定表的行数'
    });
    // MySQL数据库工具 - 获取数据库的引擎
    server.registerTool('getDatabaseEngine', {
        description: '获取数据库的引擎',
        inputSchema: {
            tableName: z.string().describe('表名')
        },
    }, async (params) => {
        try {
            const rows = await getDatabaseEngine(params.tableName);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(rows, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            console.error('Error in getDatabaseEngine:', error);
            throw error;
        }
    });
    registeredTools.push({
        name: 'getDatabaseEngine',
        description: '获取数据库的引擎'
    });
    // MySQL数据库工具 - 执行自定义SQL查询
    server.registerTool('executeSql', {
        description: '执行自定义SQL查询，注意：此工具存在SQL注入风险，生产环境中应谨慎使用',
        inputSchema: {
            sql: z.string().describe('要执行的SQL语句')
        },
    }, async (params) => {
        try {
            const rows = await executeSql(params.sql);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(rows, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            console.error('Error in executeSql:', error);
            throw error;
        }
    });
    registeredTools.push({
        name: 'executeSql',
        description: '执行自定义SQL查询，注意：此工具存在SQL注入风险，生产环境中应谨慎使用'
    });
}
