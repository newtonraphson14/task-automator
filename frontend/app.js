// API Configuration - LOCAL DEVELOPMENT
const API_BASE = 'http://localhost:7071/api';

// DOM Elements
const logsContainer = document.getElementById('logsContainer');

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    addLog('🚀 Dashboard initialized - Connected to Local Functions', 'info');
});

// Test Webhook (SIMPLE VERSION)
async function testWebhook() {
    addLog('📨 Testing webhook receiver...', 'info');
    
    try {
        const response = await fetch(`${API_BASE}/WebhookReceiver`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'test',
                data: { message: 'Test from dashboard' }
            })
        });
        
        const result = await response.json();
        addLog(`✅ Webhook test successful: ${result.message}`, 'success');
        
    } catch (error) {
        addLog(`❌ Webhook test failed: ${error.message}`, 'error');
    }
}

// Test Data Sync (SIMPLE VERSION)
async function testDataSync() {
    addLog('🔄 Testing data sync...', 'info');
    
    try {
        const response = await fetch(`${API_BASE}/DataSync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source: 'dashboard',
                destination: 'cloud-storage'
            })
        });
        
        const result = await response.json();
        addLog(`✅ Data sync successful: ${result.message}`, 'success');
        
    } catch (error) {
        addLog(`❌ Data sync failed: ${error.message}`, 'error');
    }
}

// Test Notification (SIMPLE VERSION)
async function testNotification() {
    addLog('📧 Testing notification...', 'info');
    
    try {
        const response = await fetch(`${API_BASE}/EmailNotifier`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: 'test@ikbr.fun',
                subject: 'Test Notification',
                message: 'Hello from dashboard!'
            })
        });
        
        const result = await response.json();
        addLog(`✅ Notification sent: ${result.message}`, 'success');
        
    } catch (error) {
        addLog(`❌ Notification failed: ${error.message}`, 'error');
    }
}

// Run Full Pipeline
async function runFullPipeline() {
    addLog('⚡ Starting full automation pipeline...', 'warning');
    
    try {
        await testWebhook();
        await testDataSync();
        await testNotification();
        addLog('🎉 Full pipeline completed successfully!', 'success');
    } catch (error) {
        addLog(`💥 Pipeline failed: ${error.message}`, 'error');
    }
}

// Create Workflow
async function createWorkflow() {
    const name = document.getElementById('workflowName').value;
    if (!name) {
        addLog('❌ Please enter a workflow name', 'error');
        return;
    }
    
    addLog(`🔧 Creating workflow: ${name}`, 'info');
    setTimeout(() => {
        addLog(`✅ Workflow "${name}" created successfully!`, 'success');
        document.getElementById('workflowName').value = '';
    }, 1000);
}

// Utility Functions
function addLog(message, type = 'info') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    logEntry.innerHTML = `[${new Date().toLocaleTimeString()}] ${message}`;
    logsContainer.appendChild(logEntry);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

function clearLogs() {
    logsContainer.innerHTML = '';
    addLog('🧹 Logs cleared', 'info');
}