const { app } = require('@azure/functions');

app.http('WebhookReceiver', {
    methods: ['POST', 'GET', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            };
        }

        context.log('📨 Webhook received:', request.method);

        try {
            let payload = {};
            if (request.method === 'POST') {
                const body = await request.text();
                payload = body ? JSON.parse(body) : {};
            }

            context.log('📦 Payload:', payload);

            let result = { 
                success: true, 
                message: 'Webhook processed successfully',
                timestamp: new Date().toISOString()
            };
            
            if (payload.type === 'email') {
                result.action = '📧 Email processing triggered';
                result.data = payload.data;
            } else if (payload.type === 'data') {
                result.action = '🔄 Data sync triggered';
                result.data = payload.data;
            } else if (payload.type === 'alert') {
                result.action = '🚨 Alert notification sent';
                result.data = payload.data;
            } else {
                result.action = '⚡ Generic webhook processed';
                result.receivedData = payload;
            }

            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify(result)
            };

        } catch (error) {
            context.log('❌ Webhook error:', error);
            return {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: error.message,
                    timestamp: new Date().toISOString()
                })
            };
        }
    }
});