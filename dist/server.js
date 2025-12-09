// src/server.ts
// Import the necessary modules from the MCP SDK and our custom modules
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import dotenv from "dotenv";
import express from 'express';
// Load environment variables
dotenv.config();
import { testDbConnection } from './database/index.js';
import { registerBasicTools } from './tools/basicTools.js';
import { registerDatabaseTools } from './tools/databaseTools.js';
import { setupRoutes } from './routes/index.js';
// 配置管理
const APP_PORT = parseInt(process.env.APP_PORT || "3000");
// 工具列表跟踪
const registeredTools = [];
// Export for routes access
export { registeredTools };
// Create an instance of the MCP server
const server = new McpServer({
    name: "mcp-streamable-http",
    version: "1.0.0",
});
const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // set to undefined for stateless servers
});
// Create an Express application for serving HTTP endpoints
const app = express();
// 配置Express应用
app.use(express.json());
// Main application setup
async function main() {
    console.log('Starting MCP Streamable HTTP Server...');
    // Test database connection
    await testDbConnection();
    // Register all tools first (before connecting to transport)
    registerBasicTools(server, registeredTools);
    registerDatabaseTools(server, registeredTools);
    // Connect to transport
    await server.connect(transport);
    // Setup routes
    setupRoutes(app, server, transport, registeredTools);
    // Start the Express server
    app.listen(APP_PORT, () => {
        console.log(`MCP Streamable HTTP Server listening on port ${APP_PORT}`);
        console.log(`Health check: http://localhost:${APP_PORT}/health`);
        console.log(`Tools list: http://localhost:${APP_PORT}/tools`);
        console.log(`MCP endpoint: http://localhost:${APP_PORT}/mcp`);
        console.log(`Available tools: ${registeredTools.map(tool => tool.name).join(', ')}`);
    });
}
// Start the application
main().catch((error) => {
    console.error('Error starting the application:', error);
    process.exit(1);
});
