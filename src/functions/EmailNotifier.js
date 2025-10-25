const { app } = require('@azure/functions');

app.http('EmailNotifier', {
    methods: ['POST', 'GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('📨 Email Notifier triggered');

        try {
            let payload = {};
            if (request.method === 'POST') {
                const body = await request.text();
                payload = body ? JSON.parse(body) : {};
            }

            context.log('📧 Notification payload:', payload);

            // Simulate email/slack/telegram notification
            const result = {
                success: true,
                message: 'Notification sent successfully',
                action: '📨 Alert delivered',
                timestamp: new Date().toISOString(),
                notification: {
                    type: payload.type || 'alert',
                    recipient: payload.to || 'admin@ikbr.fun',
                    subject: payload.subject || 'Automation Alert',
                    body: payload.message || 'Task completed successfully',
                    channel: payload.channel || 'email',
                    priority: payload.priority || 'medium',
                    sentAt: new Date().toISOString()
                }
            };

            context.log('✅ Notification result:', result);

            return {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(result)
            };

        } catch (error) {
            context.log('❌ Notification error:', error);
            return {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Notification failed: ' + error.message,
                    timestamp: new Date().toISOString()
                })
            };
        }
    }
});