/**
 * 配置所有路由
 */
export function setupRoutes(app, server, transport, registeredTools) {
    console.log('Setting up routes...');
    // MCP端点 - POST请求
    app.post('/mcp', async (req, res) => {
        console.log('Received MCP request:', req.body);
        try {
            await transport.handleRequest(req, res, req.body);
        }
        catch (error) {
            console.error('Error handling MCP request:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32603,
                        message: 'Internal server error',
                    },
                    id: null,
                });
            }
        }
    });
    // MCP端点 - GET请求（不允许）
    app.get('/mcp', async (req, res) => {
        console.log('Received GET MCP request');
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: '2.0',
            error: {
                code: -32000,
                message: 'Method not allowed.',
            },
            id: null,
        }));
    });
    // MCP端点 - DELETE请求（不允许）
    app.delete('/mcp', async (req, res) => {
        console.log('Received DELETE MCP request');
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: '2.0',
            error: {
                code: -32000,
                message: 'Method not allowed.',
            },
            id: null,
        }));
    });
    // 健康检查路由
    app.get('/health', (req, res) => {
        res.json({
            status: 'healthy',
            server: 'MCP Streamable HTTP Server',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
        });
    });
    // 工具列表路由
    app.get('/tools', (req, res) => {
        res.json({
            tools: registeredTools,
            count: registeredTools.length,
        });
    });
}
