# 🤖 N8N Setup Guide for SecureDocs

Complete step-by-step guide for setting up N8N webhooks for file vectorization, chat, and AI categorization.

---

## 📋 What is N8N?

N8N is a workflow automation platform that connects different services. In SecureDocs, it handles:

1. **File Vectorization** - Converting files to vectors for AI search
2. **Chat Integration** - Processing user chat messages with AI
3. **AI Categorization** - Automatically organizing files by type

---

## 🚀 Step 1: Create N8N Account

### 1.1 Sign Up
1. Go to https://n8n.cloud
2. Click "Sign up"
3. Enter email address
4. Create password
5. Verify email
6. Create workspace name

### 1.2 Create Workspace
1. After login, you'll see "Workspaces"
2. Click "Create new workspace"
3. Name it: `SecureDocs`
4. Click "Create"

---

## 🔗 Step 2: Create Vectorization Webhook

This webhook processes files for AI search capability.

### 2.1 Create New Workflow
1. In N8N dashboard, click "New"
2. Select "Workflow"
3. Name it: `SecureDocs - File Vectorization`
4. Click "Create"

### 2.2 Add Webhook Trigger
1. In the workflow editor, click "Add node"
2. Search for "Webhook"
3. Select "Webhook" (the trigger node)
4. Configure:
   - **HTTP Method:** POST
   - **Authentication:** None (or Basic if you want security)
   - Click "Save"

### 2.3 Get Webhook URL
1. In the Webhook node, look for "Webhook URL"
2. Copy the full URL (looks like: `https://your-n8n-instance.app.n8n.cloud/webhook/xxxxx`)
3. Save this URL - you'll need it for `.env`

### 2.4 Add Processing Nodes
Add nodes to process the file data:

**Option A: Simple Echo (Testing)**
1. Click "Add node"
2. Search for "Set"
3. Select "Set" node
4. This just echoes back the data
5. Connect Webhook → Set

**Option B: With AI Processing (Production)**
1. Click "Add node"
2. Search for "OpenAI" or "Hugging Face"
3. Select your AI provider
4. Configure API key
5. Set up prompt for vectorization
6. Connect Webhook → AI node

### 2.5 Add Response Node
1. Click "Add node"
2. Search for "Respond to Webhook"
3. Select "Respond to Webhook"
4. Set response to:
   ```json
   {
     "success": true,
     "message": "File vectorized successfully"
   }
   ```
5. Connect previous node → Respond to Webhook

### 2.6 Save Workflow
1. Click "Save" button
2. Click "Activate" to enable the webhook
3. You should see "Webhook is now active"

### 2.7 Test Webhook
```bash
# Test with curl
curl -X POST https://your-n8n-instance.app.n8n.cloud/webhook/xxxxx \
  -H "Content-Type: application/json" \
  -d '{
    "file_id": 123,
    "file_name": "test.pdf",
    "file_size": 1024000
  }'
```

### 2.8 Add to .env
```env
N8N_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/xxxxx
```

---

## 💬 Step 3: Create Default Chat Webhook

This webhook handles chat messages for free tier users.

### 3.1 Create New Workflow
1. Click "New" → "Workflow"
2. Name it: `SecureDocs - Default Chat`
3. Click "Create"

### 3.2 Add Webhook Trigger
1. Click "Add node"
2. Search for "Webhook"
3. Select "Webhook"
4. Configure:
   - **HTTP Method:** POST
   - **Authentication:** None
   - Click "Save"

### 3.3 Get Webhook URL
1. Copy the webhook URL
2. Save for `.env`

### 3.4 Add Chat Processing
1. Click "Add node"
2. Search for "OpenAI" or "Anthropic"
3. Select your AI provider
4. Configure with API key
5. Set system prompt:
   ```
   You are a helpful assistant for SecureDocs, a file management system.
   Help users with their files and storage questions.
   Keep responses concise and helpful.
   ```
6. Connect Webhook → AI node

### 3.5 Add Response Node
1. Click "Add node"
2. Search for "Respond to Webhook"
3. Set response to:
   ```json
   {
     "success": true,
     "response": "{{ $node.OpenAI.json.choices[0].message.content }}"
   }
   ```
4. Connect AI node → Respond to Webhook

### 3.6 Save & Activate
1. Click "Save"
2. Click "Activate"
3. Copy webhook URL

### 3.7 Add to .env
```env
N8N_DEFAULT_CHAT_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/xxxxx/chat
```

---

## 💎 Step 4: Create Premium Chat Webhook

This webhook handles chat messages for premium users (more advanced AI).

### 4.1 Create New Workflow
1. Click "New" → "Workflow"
2. Name it: `SecureDocs - Premium Chat`
3. Click "Create"

### 4.2 Add Webhook Trigger
1. Click "Add node"
2. Search for "Webhook"
3. Select "Webhook"
4. Configure:
   - **HTTP Method:** POST
   - **Authentication:** None
   - Click "Save"

### 4.3 Get Webhook URL
1. Copy the webhook URL
2. Save for `.env`

### 4.4 Add Premium Chat Processing
1. Click "Add node"
2. Search for "OpenAI"
3. Select "OpenAI" (use GPT-4 for premium)
4. Configure:
   - **Model:** gpt-4 (or latest)
   - **Temperature:** 0.7 (more creative)
   - **Max Tokens:** 2000 (more detailed responses)
5. Set system prompt:
   ```
   You are an advanced AI assistant for SecureDocs, a premium file management system.
   Provide detailed, comprehensive help for file management, organization, and analysis.
   You have access to advanced features and can provide in-depth guidance.
   ```
6. Connect Webhook → OpenAI node

### 4.5 Add Response Node
1. Click "Add node"
2. Search for "Respond to Webhook"
3. Set response to:
   ```json
   {
     "success": true,
     "response": "{{ $node.OpenAI.json.choices[0].message.content }}",
     "model": "gpt-4"
   }
   ```
4. Connect OpenAI node → Respond to Webhook

### 4.6 Save & Activate
1. Click "Save"
2. Click "Activate"
3. Copy webhook URL

### 4.7 Add to .env
```env
N8N_PREMIUM_CHAT_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/xxxxx/chat
```

---

## 🤖 Step 5: Create AI Categorization Workflow (Optional)

This workflow automatically categorizes files when uploaded.

### 5.1 Create New Workflow
1. Click "New" → "Workflow"
2. Name it: `SecureDocs - AI Categorization`
3. Click "Create"

### 5.2 Add Webhook Trigger
1. Click "Add node"
2. Search for "Webhook"
3. Select "Webhook"
4. Configure:
   - **HTTP Method:** POST
   - Click "Save"

### 5.3 Add AI Processing
1. Click "Add node"
2. Search for "OpenAI"
3. Select "OpenAI"
4. Configure prompt:
   ```
   Analyze this file and categorize it into one of these categories:
   - Document
   - Image
   - Video
   - Audio
   - Code
   - Archive
   - Other
   
   File name: {{ $json.file_name }}
   File type: {{ $json.mime_type }}
   
   Respond with ONLY the category name, nothing else.
   ```
5. Connect Webhook → OpenAI node

### 5.4 Add Response Node
1. Click "Add node"
2. Search for "Respond to Webhook"
3. Set response to:
   ```json
   {
     "success": true,
     "category": "{{ $node.OpenAI.json.choices[0].message.content }}"
   }
   ```
4. Connect OpenAI node → Respond to Webhook

### 5.5 Save & Activate
1. Click "Save"
2. Click "Activate"
3. Copy webhook URL (optional - not used in current setup)

---

## 🧪 Step 6: Test All Webhooks

### 6.1 Test Vectorization Webhook
```bash
curl -X POST https://your-n8n-instance.app.n8n.cloud/webhook/vectorization-id \
  -H "Content-Type: application/json" \
  -d '{
    "file_id": 1,
    "user_id": 1,
    "file_name": "document.pdf",
    "file_size": 1024000,
    "mime_type": "application/pdf",
    "file_path": "user_1/document.pdf"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "File vectorized successfully"
}
```

### 6.2 Test Default Chat Webhook
```bash
curl -X POST https://your-n8n-instance.app.n8n.cloud/webhook/default-chat-id/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "message": "How much storage do I have?"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "response": "You can check your storage usage in your dashboard..."
}
```

### 6.3 Test Premium Chat Webhook
```bash
curl -X POST https://your-n8n-instance.app.n8n.cloud/webhook/premium-chat-id/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "message": "Analyze my file storage patterns"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "response": "Based on your storage patterns...",
  "model": "gpt-4"
}
```

---

## 📝 Complete .env Configuration

After setting up all webhooks, your `.env` should have:

```env
# N8N Webhooks
N8N_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/vectorization-id
N8N_DEFAULT_CHAT_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/default-chat-id/chat
N8N_PREMIUM_CHAT_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/premium-chat-id/chat

# AI Categorization
AI_CATEGORIZATION_ENABLED=true
AI_CATEGORIZATION_POLLING_INTERVAL=5000
```

---

## 🔒 Security Best Practices

### 1. Add Authentication to Webhooks
For production, add authentication:

1. In Webhook node, set **Authentication** to "Basic"
2. Set username and password
3. In SecureDocs, add headers:
   ```php
   $headers = [
       'Authorization' => 'Basic ' . base64_encode('username:password'),
       'Content-Type' => 'application/json'
   ];
   ```

### 2. Validate Webhook Requests
In N8N, add a validation node:

1. Click "Add node"
2. Search for "IF"
3. Add condition to check required fields
4. Only process if valid

### 3. Rate Limiting
Add rate limiting to prevent abuse:

1. Click "Add node"
2. Search for "Rate Limit"
3. Set max requests per minute
4. Connect before processing

### 4. Error Handling
Add error handling:

1. Click "Add node"
2. Search for "Error Trigger"
3. Configure error response
4. Log errors for debugging

---

## 🐛 Troubleshooting

### Webhook Not Responding
**Check:**
1. Workflow is activated (blue toggle)
2. Webhook URL is correct
3. HTTP method is POST
4. No typos in URL

### Webhook Returns Error
**Check:**
1. API keys are correct (OpenAI, etc.)
2. Request format matches expected JSON
3. Check N8N logs for errors
4. Test with simpler payload first

### Chat Not Working
**Check:**
1. OpenAI API key is valid
2. API key has sufficient credits
3. Model name is correct (gpt-3.5-turbo, gpt-4)
4. Temperature and max tokens are reasonable

### Vectorization Not Working
**Check:**
1. File path is correct
2. File exists in Supabase
3. AI provider API key is valid
4. Request timeout is sufficient

---

## 📊 Monitoring Webhooks

### View Webhook Logs
1. In N8N workflow, click "Executions"
2. See all webhook calls
3. Click on execution to see details
4. Check input/output data

### Set Up Alerts
1. Click "Add node"
2. Search for "Send Email"
3. Configure to send alerts on errors
4. Connect error handler → Email node

### Track Usage
1. In N8N dashboard, go to "Usage"
2. See API calls and costs
3. Monitor for unexpected spikes

---

## 🚀 Advanced Features

### 1. Conditional Logic
Route requests based on file type:

```
Webhook → IF (mime_type == "application/pdf")
  → PDF Processing
  → Response
  
IF (mime_type == "image/*")
  → Image Processing
  → Response
```

### 2. Database Integration
Store results in database:

1. Add "PostgreSQL" node
2. Configure Supabase connection
3. Insert vectorization results
4. Track processing history

### 3. Retry Logic
Retry failed requests:

1. Add "Retry" node
2. Set max retries (3-5)
3. Set backoff strategy (exponential)
4. Connect to error handler

### 4. Batch Processing
Process multiple files:

1. Add "Loop" node
2. Process each file
3. Collect results
4. Return summary

---

## 📚 Example Workflows

### Example 1: Simple Echo
```
Webhook → Set (echo data) → Respond to Webhook
```

### Example 2: With AI Processing
```
Webhook → OpenAI → Respond to Webhook
```

### Example 3: With Database
```
Webhook → OpenAI → PostgreSQL → Respond to Webhook
```

### Example 4: With Error Handling
```
Webhook → IF (valid)
  → OpenAI
  → PostgreSQL
  → Respond to Webhook
  
IF (invalid)
  → Error Response
```

---

## 🎓 Learning Resources

- **N8N Documentation:** https://docs.n8n.io
- **N8N Community:** https://community.n8n.io
- **N8N Templates:** https://n8n.io/workflows
- **OpenAI API:** https://platform.openai.com/docs
- **Webhook Testing:** https://webhook.site

---

## ✅ Checklist

- [ ] N8N account created
- [ ] Vectorization webhook created and tested
- [ ] Default chat webhook created and tested
- [ ] Premium chat webhook created and tested
- [ ] All webhook URLs added to `.env`
- [ ] Webhooks activated in N8N
- [ ] Test requests successful
- [ ] Error handling configured
- [ ] Monitoring set up
- [ ] Documentation saved

---

**Last Updated:** December 2024

**Need Help?** Check the N8N community forum or SecureDocs documentation.
