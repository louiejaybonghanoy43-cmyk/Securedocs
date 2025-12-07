# 🖥️ LocalHost Setup Guide for SecureDocs

Complete guide for running SecureDocs on `localhost:8000` for local development and testing.

---

## 📋 Overview

This guide covers setting up SecureDocs on your local machine using:
- **URL:** `http://localhost:8000`
- **Database:** Supabase (cloud, same as production)
- **Email:** Brevo SMTP (same as production)
- **N8N:** Cloud webhooks (same as production)
- **Port Forwarding:** Cloudflare tunnel (optional, for testing webhooks)

---

## 🚀 Quick Setup

### 1. Use the Localhost .env File

```bash
# Copy the pre-configured localhost .env
cp .env.localhost .env

# Generate app key (if needed)
php artisan key:generate
```

### 2. Install Dependencies

```bash
composer install
npm install
```

### 3. Run Migrations

```bash
php artisan migrate
```

### 4. Build Assets

```bash
npm run build
```

### 5. Start Development Servers

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
# Runs on http://localhost:8000
```

**Terminal 2 - Vite Dev Server:**
```bash
npm run dev
# Watches for asset changes
```

**Terminal 3 - Queue Worker (Optional):**
```bash
php artisan queue:work
# Processes background jobs
```

### 6. Access Application

- **Frontend:** http://localhost:8000
- **Admin Dashboard:** http://localhost:8000/admin
- **Login:** Use your registered account

---

## ⚠️ IMPORTANT: CORS Issue - Use `localhost:8000` NOT `127.0.0.1:8000`

### The Problem

If you access the app via `http://127.0.0.1:8000` instead of `http://localhost:8000`, you'll get CORS errors:

```
Access to script at 'http://localhost:8000/build/assets/app-D6TJVtCB.js' 
from origin 'http://127.0.0.1:8000' has been blocked by CORS policy
```

### Why This Happens

- Your app is accessed via `127.0.0.1:8000` (IP address)
- But assets are loaded from `localhost:8000` (hostname)
- Browsers treat these as **different origins** → CORS error
- Assets won't load → Application breaks

### The Solution

**Always use:** `http://localhost:8000`

**Never use:** `http://127.0.0.1:8000`

### How to Fix If You Already Have CORS Errors

1. **Clear browser cache:**
   - Press `Ctrl + Shift + Delete`
   - Clear all cache and cookies

2. **Clear Laravel cache:**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

3. **Restart your server:**
   ```bash
   php artisan serve
   ```

4. **Access the correct URL:**
   - Go to `http://localhost:8000` (not 127.0.0.1)
   - Refresh the page

### Bookmark This

To avoid confusion, bookmark: `http://localhost:8000`

---

## 🔑 Key Differences from Production

### What Changed in .env.localhost

| Setting | Production | Localhost |
|---------|-----------|-----------|
| `APP_URL` | `https://securedocs.live` | `http://localhost:8000` |
| `FORCE_HTTPS` | `true` | `false` |
| `SESSION_DOMAIN` | `securedocs.live` | `localhost` |
| `SESSION_SECURE_COOKIE` | `true` | `false` |
| `WEBAUTHN_RP_ID` | `securedocs.live` | `localhost` |
| `WEBAUTHN_RELYING_PARTY_ORIGIN` | `https://securedocs.live` | `http://localhost:8000` |
| `MAIL_FROM_ADDRESS` | `noreply@securedocs.live` | `noreply@localhost` |
| `PAYMONGO_WEBHOOK_URL` | `https://securedocs.live/webhook/paymongo` | `http://localhost:8000/webhook/paymongo` |

### What Stayed the Same

- ✅ Database (Supabase) - Same credentials
- ✅ Email (Brevo) - Same SMTP settings
- ✅ N8N Webhooks - Same URLs
- ✅ Supabase Storage - Same bucket
- ✅ PayMongo Keys - Same test keys
- ✅ Blockchain Settings - Same configuration

---

## 🔐 WebAuthn Configuration for Localhost

WebAuthn requires specific configuration for localhost development:

### What's Configured in .env.localhost

```env
WEBAUTHN_RELYING_PARTY_NAME="SecureDocs"
WEBAUTHN_RP_ID=localhost
WEBAUTHN_RELYING_PARTY_ID=localhost
WEBAUTHN_RELYING_PARTY_ORIGIN=http://localhost:8000
```

### How to Test WebAuthn Locally

1. **Create Account:**
   - Register at http://localhost:8000/register
   - Verify email (check Brevo logs)

2. **Enable WebAuthn:**
   - Go to Settings → Security
   - Click "Add Biometric Authentication"
   - Follow the WebAuthn prompt
   - Use your device's biometric (fingerprint, face, etc.)

3. **Test Login:**
   - Logout
   - Go to http://localhost:8000/login
   - Click "Login with Biometrics"
   - Use your registered biometric

### Troubleshooting WebAuthn

**Error: "Invalid origin"**
- Ensure `WEBAUTHN_RELYING_PARTY_ORIGIN=http://localhost:8000`
- Don't use `127.0.0.1` - must be `localhost`
- Clear browser cache and cookies

**Error: "RP ID mismatch"**
- Ensure `WEBAUTHN_RP_ID=localhost`
- Must match the domain you're accessing from

**Biometric not available**
- Some browsers require HTTPS for WebAuthn
- Use Firefox or Chrome on Windows/Mac for local testing
- On mobile, use the device's native browser

---

## 🌐 Port Forwarding with Cloudflare Tunnel

If you need to test webhooks from external services (N8N, PayMongo), use Cloudflare tunnel:

### 1. Install Cloudflare Tunnel

```bash
# Download cloudflared.exe (already in your setup)
# Or install: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
```

### 2. Create Tunnel

```bash
cloudflared.exe tunnel login
# Follow the browser prompt to authenticate
```

### 3. Create Configuration

Create `cloudflared.yml` in your project root:

```yaml
tunnel: securedocs-local
credentials-file: C:\Users\LENOVO\.cloudflared\YOUR_TUNNEL_ID.json

ingress:
  - hostname: securedocs-local.YOUR_DOMAIN.workers.dev
    service: http://localhost:8000
  - service: http_status:404
```

### 4. Run Tunnel

```bash
cloudflared.exe tunnel run securedocs-local
# Your app is now accessible at: https://securedocs-local.YOUR_DOMAIN.workers.dev
```

### 5. Update Webhook URLs

If using tunnel, update these in your `.env`:

```env
# For testing webhooks from external services
PAYMONGO_WEBHOOK_URL=https://securedocs-local.YOUR_DOMAIN.workers.dev/webhook/paymongo

# N8N webhooks stay the same (they call your app)
# But your app needs to call them back, so tunnel helps with that
```

---

## 📧 Email Testing

### Testing Email Locally

1. **Brevo is configured** - Emails will be sent to real addresses

2. **View sent emails:**
   - Go to https://app.brevo.com
   - Check "Transactional" → "Logs"
   - See all emails sent from localhost

3. **Test email sending:**
   ```bash
   php artisan tinker
   >>> Mail::raw('Test email', function($m) { $m->to('test@example.com'); });
   >>> exit
   ```

### Using Mailhog (Alternative)

If you want to capture emails locally without sending:

```bash
# Download Mailhog: https://github.com/mailhog/MailHog/releases
# Run: mailhog.exe

# Update .env
MAIL_HOST=127.0.0.1
MAIL_PORT=1025

# Access UI at: http://localhost:8025
```

---

## 🧪 Testing Features Locally

### File Upload
1. Login to http://localhost:8000
2. Click "Upload" or drag files
3. Files stored in Supabase (same as production)

### File Search
1. Upload some files
2. Use search bar
3. Search works with Supabase storage

### N8N Integration
1. Upload a file
2. Click "Share to AI"
3. File sent to N8N webhook
4. Check N8N logs at https://app.n8n.io

### WebAuthn
1. Register account
2. Add biometric in settings
3. Logout and login with biometric
4. Works on localhost with proper config

### PayMongo Webhooks
1. Create payment (test mode)
2. PayMongo sends webhook to `http://localhost:8000/webhook/paymongo`
3. If using tunnel: `https://securedocs-local.YOUR_DOMAIN.workers.dev/webhook/paymongo`
4. Check webhook logs in PayMongo dashboard

### Blockchain (Arweave)
1. Upload file
2. Click "Upload to Arweave"
3. File uploaded to Arweave (same as production)
4. Check balance in Bundlr dashboard

---

## 🐛 Troubleshooting

### "Connection refused" on Database

**Problem:** Can't connect to Supabase
```
SQLSTATE[HY000]: General error: could not connect to server
```

**Solution:**
```bash
# Check credentials in .env
# Verify Supabase project is active
# Check firewall allows port 6543
# Test connection:
php artisan tinker
>>> DB::connection()->getPdo();
>>> exit
```

### "Session domain mismatch"

**Problem:** Cookies not working
```
Session domain mismatch error
```

**Solution:**
- Ensure `SESSION_DOMAIN=localhost` in .env
- Clear browser cookies
- Restart Laravel server

### "WebAuthn origin mismatch"

**Problem:** Can't register biometric
```
Invalid origin for this RP ID
```

**Solution:**
- Use `http://localhost:8000` (not `127.0.0.1`)
- Ensure `WEBAUTHN_RELYING_PARTY_ORIGIN=http://localhost:8000`
- Clear browser cache

### "Email not sending"

**Problem:** Emails not received
```
SMTP connection failed
```

**Solution:**
```bash
# Check Brevo credentials
# Verify MAIL_HOST=smtp-relay.brevo.com
# Verify MAIL_PORT=587
# Test with:
php artisan tinker
>>> Mail::raw('Test', function($m) { $m->to('test@example.com'); });
```

### "N8N webhook not working"

**Problem:** Files not being vectorized
```
N8N webhook returned error
```

**Solution:**
- Check N8N webhook URL is correct
- Verify N8N workflow is activated
- Check N8N logs at https://app.n8n.io
- Test webhook with curl:
```bash
curl -X POST https://securedocs4.app.n8n.cloud/webhook/f106ab40-0651-4e2c-acc1-6591ab771828 \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### "Vite not compiling assets"

**Problem:** CSS/JS not loading
```
Module not found error
```

**Solution:**
```bash
# Kill Vite process
# Clear node_modules
rm -r node_modules
npm install

# Restart Vite
npm run dev
```

---

## 📊 Comparing Environments

### Development (Localhost)

```
URL:              http://localhost:8000
Database:         Supabase (cloud)
Email:            Brevo SMTP
Storage:          Supabase bucket
N8N:              Cloud webhooks
HTTPS:            No (http://)
Session Secure:   No
WebAuthn:         Localhost only
```

### Production (Cloud)

```
URL:              https://securedocs.live
Database:         Supabase (cloud)
Email:            Brevo SMTP
Storage:          Supabase bucket
N8N:              Cloud webhooks
HTTPS:            Yes (https://)
Session Secure:   Yes
WebAuthn:         securedocs.live only
```

---

## 🔄 Switching Between Environments

### From Localhost to Production

```bash
# Backup localhost .env
cp .env .env.localhost.backup

# Switch to production
cp .env.example .env

# Edit .env with production credentials
# Then:
php artisan config:cache
php artisan route:cache
```

### From Production to Localhost

```bash
# Backup production .env
cp .env .env.production.backup

# Switch to localhost
cp .env.localhost .env

# Then:
php artisan config:clear
php artisan route:clear
```

---

## 📝 .env.localhost Checklist

Before starting development, verify:

- [ ] `.env.localhost` exists in project root
- [ ] Copied to `.env` (or using `.env.localhost` directly)
- [ ] `APP_URL=http://localhost:8000`
- [ ] `FORCE_HTTPS=false`
- [ ] `SESSION_DOMAIN=localhost`
- [ ] `SESSION_SECURE_COOKIE=false`
- [ ] `WEBAUTHN_RP_ID=localhost`
- [ ] `WEBAUTHN_RELYING_PARTY_ORIGIN=http://localhost:8000`
- [ ] Database credentials are correct
- [ ] Brevo SMTP credentials are correct
- [ ] N8N webhook URLs are correct

---

## 🚀 Next Steps

1. **Copy `.env.localhost` to `.env`**
   ```bash
   cp .env.localhost .env
   ```

2. **Run migrations**
   ```bash
   php artisan migrate
   ```

3. **Start servers**
   ```bash
   # Terminal 1
   php artisan serve
   
   # Terminal 2
   npm run dev
   
   # Terminal 3
   php artisan queue:work
   ```

4. **Access application**
   - http://localhost:8000

5. **Create test account**
   - Register at /register
   - Verify email
   - Test features

---

## 📚 Related Documentation

- **[QUICK_START.md](QUICK_START.md)** - Fast setup reference
- **[SETUP_GUIDE_NEW_PC.md](SETUP_GUIDE_NEW_PC.md)** - Complete setup guide
- **[ENV_KEYS_GUIDE.md](ENV_KEYS_GUIDE.md)** - Environment variables reference
- **[N8N_SETUP_GUIDE.md](N8N_SETUP_GUIDE.md)** - N8N webhook setup

---

## 💡 Tips

- **Use `.env.localhost`** - Pre-configured for local development
- **Keep Supabase same** - Use production database for consistency
- **Test webhooks** - Use Cloudflare tunnel to test external webhooks
- **Check logs** - `storage/logs/laravel.log` for debugging
- **Clear cache** - Run `php artisan cache:clear` if things break
- **Restart servers** - Always restart after changing `.env`

---

**Happy local development! 🎉**

For issues, check the troubleshooting section or refer to the main setup guides.
