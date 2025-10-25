const { app } = require('@azure/functions');

app.http('DataSync', {
    methods: ['POST', 'GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('🔄 Data Sync triggered');

        try {
            let payload = {};
            if (request.method === 'POST') {
                const body = await request.text();
                payload = body ? JSON.parse(body) : {};
            }

            context.log('📦 Sync payload:', payload);

            // Simulate data processing
            const result = {
                success: true,
                message: 'Data sync completed',
                action: '🔄 Data processed and synced',
                timestamp: new Date().toISOString(),
                stats: {
                    recordsProcessed: Math.floor(Math.random() * 100) + 1,
                    source: payload.source || 'unknown',
                    destination: payload.destination || 'cloud-storage',
                    syncTime: Date.now()
                }
            };

            context.log('✅ Sync result:', result);

            return {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(result)
            };

        } catch (error) {
            context.log('❌ Sync error:', error);
            return {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Sync failed: ' + error.message,
                    timestamp: new Date().toISOString()
                })
            };
        }
    }
});