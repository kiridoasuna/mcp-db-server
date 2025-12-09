import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
const server = new McpServer({
    name: "mcp-streamable-http",
    version: "1.0.0",
});
// Get Chuck Norris joke tool
// const getChuckJoke = server.tool(
//   "get-chuck-joke",
//   "Get a random Chuck Norris joke",
//   async () => {
//     const response = await fetch("https://api.chucknorris.io/jokes/random");
//     const data = await response.json();
//     return {
//       content: [
//         {
//           type: "text",
//           text: data.value,
//         },
//       ],
//     };
//   }
// );
// calculate A + B tool
const calculateAddition = server.tool("calculate-addition", "Calculate the sum of two numbers A and B", {
    a: z.number().describe("First number to add"),
    b: z.number().describe("Second number to add"),
}, async (params) => {
    try {
        console.log("Received addition params:", params); // 打印收到的参数
        const sum = params.a + params.b;
        console.log("Calculated sum:", sum); // 打印计算结果
        return {
            content: [
                {
                    type: "text",
                    text: `The sum of ${params.a} and ${params.b} is ${sum}`,
                },
            ],
        };
    }
    catch (error) {
        console.error("Error in calculateAddition:", error); // 捕获并打印错误
        throw error; // 重新抛出错误，让MCP SDK返回错误响应
    }
});
// 加班申请工具
const overtimeApplication = server.tool("overtime-application", "Submit an overtime application", {
    userId: z.string().describe("User ID of the applicant"),
    supervisor: z.string().describe("Direct supervisor's name"),
    applyTime: z.string().describe("Application submission time (format: YYYY-MM-DD)"),
    reason: z.string().describe("Reason for overtime application")
}, async (params) => {
    try {
        console.log("Received overtime application:", params);
        // 这里可以添加实际的业务逻辑，比如存储到数据库、发送通知等
        // 模拟申请提交成功
        return {
            content: [
                {
                    type: "text",
                    text: `加班申请提交成功！
                  申请人ID: ${params.userId}
                  直属领导: ${params.supervisor}
                  申请时间: ${params.applyTime}
                  加班原因: ${params.reason}
                  您的申请已提交至${params.supervisor}处等待审批。`
                }
            ]
        };
    }
    catch (error) {
        console.error("Error in overtimeApplication:", error);
        throw error;
    }
});
const app = express();
app.use(express.json());
const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // set to undefined for stateless servers
});
// Setup routes for the server
const setupServer = async () => {
    await server.connect(transport);
};
app.post("/mcp", async (req, res) => {
    console.log("Received MCP request:", req.body);
    try {
        await transport.handleRequest(req, res, req.body);
    }
    catch (error) {
        console.error("Error handling MCP request:", error);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: "2.0",
                error: {
                    code: -32603,
                    message: "Internal server error",
                },
                id: null,
            });
        }
    }
});
app.get("/mcp", async (req, res) => {
    console.log("Received GET MCP request");
    res.writeHead(405).end(JSON.stringify({
        jsonrpc: "2.0",
        error: {
            code: -32000,
            message: "Method not allowed.",
        },
        id: null,
    }));
});
app.delete("/mcp", async (req, res) => {
    console.log("Received DELETE MCP request");
    res.writeHead(405).end(JSON.stringify({
        jsonrpc: "2.0",
        error: {
            code: -32000,
            message: "Method not allowed.",
        },
        id: null,
    }));
});
// Start the server
const PORT = process.env.PORT || 3000;
setupServer()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`MCP Streamable HTTP Server listening on port ${PORT}`);
        // console.log(`Available tools: ${server.tool.map(tool => tool.name).join(", ")}`);
    });
})
    .catch((error) => {
    console.error("Failed to set up the server:", error);
    process.exit(1);
});
