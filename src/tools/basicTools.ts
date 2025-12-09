// 基础工具注册
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ToolRegistration } from '../types/index.js';

/**
 * 注册基础工具
 */
export function registerBasicTools(
  server: McpServer,
  registeredTools: ToolRegistration[]
): void {
  console.log('Registering basic tools...');

  // 加法计算工具
  server.registerTool(
    'calculate-addition',
    {
      description: 'Calculate the sum of two numbers A and B',
      inputSchema: {
        a: z.number().describe('First number to add'),
        b: z.number().describe('Second number to add'),
      },
    },
    async (params: { a: number; b: number }) => {
      try {
        console.log('Received addition params:', params);
        const sum = params.a + params.b;
        console.log('Calculated sum:', sum);
        return {
          content: [
            {
              type: 'text',
              text: `The sum of ${params.a} and ${params.b} is ${sum}`,
            },
          ],
        };
      } catch (error) {
        console.error('Error in calculateAddition:', error);
        throw error;
      }
    }
  );

  registeredTools.push({
    name: 'calculate-addition',
    description: 'Calculate the sum of two numbers A and B'
  });

  // 加班申请工具
  server.registerTool(
    'overtime-application',
    {
      description: 'Submit an overtime application',
      inputSchema: {
        userId: z.string().describe('User ID of the applicant'),
        supervisor: z.string().describe('Direct supervisor\'s name'),
        applyTime: z.string().describe('Application submission time (format: YYYY-MM-DD)'),
        reason: z.string().describe('Reason for overtime application')
      },
    },
    async (params: { userId: string; supervisor: string; applyTime: string; reason: string }) => {
      try {
        console.log('Received overtime application:', params);
        
        return {
          content: [
            {
              type: 'text',
              text: `加班申请提交成功！\n申请人ID: ${params.userId}\n直属领导: ${params.supervisor}\n申请时间: ${params.applyTime}\n加班原因: ${params.reason}\n您的申请已提交至${params.supervisor}处等待审批。`
            }
          ]
        };
      } catch (error) {
        console.error('Error in overtimeApplication:', error);
        throw error;
      }
    }
  );

  registeredTools.push({
    name: 'overtime-application',
    description: 'Submit an overtime application'
  });

  // Chuck Norris笑话工具
  server.registerTool(
    'get-chuck-joke',
    {
      description: 'Get a random Chuck Norris joke',
      inputSchema: {}, // 无参数
    },
    async () => {
      try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        return {
          content: [
            {
              type: 'text',
              text: data.value,
            },
          ],
        };
      } catch (error) {
        console.error('Error in getChuckJoke:', error);
        throw error;
      }
    }
  );

  registeredTools.push({
    name: 'get-chuck-joke',
    description: 'Get a random Chuck Norris joke'
  });
}
