# ⚡ SecureDocs - Quick Start Guide

Fast setup for experienced developers. For detailed instructions, see `SETUP_GUIDE_NEW_PC.md`.

---

## 🚀 5-Minute Setup

### 1. Clone & Install
```bash
git clone https://github.com/Purgatory69/SECUREDOCS.git
cd securedocs
composer install
npm install
php artisan key:generate
```

### 2. Configure .env
```bash
cp .env.example .env
# Edit .env with your credentials (see ENV_KEYS_GUIDE.md)
```

### 3. Database & Build
```bash
php artisan migrate
npm run build
```

### 4. Start Servers (3 terminals)
```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev

# Terminal 3
php artisan queue:work
```

### 5. Access Application
- Frontend: http://localhost:8000
- Admin: http://localhost:8000/admin

---

## 🔑 Required Environment Variables

### Minimum Setup (Development)
```env
APP_NAME=SecureDocs
APP_ENV=local
APP_KEY=base64:YOUR_KEY_HERE
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database (Supabase)
DB_CONNECTION=pgsql
DB_HOST=aws-0-ap-northeast-1.pooler.supabase.com
DB_PORT=6543
DB_DATABASE=postgres
DB_USERNAME=postgres.YOUR_PROJECT_ID
DB_PASSWORD=YOUR_PASSWORD

# Email (Brevo)
MAIL_MAILER=smtp
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=YOUR_BREVO_USERNAME
MAIL_PASSWORD=YOUR_BREVO_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="SecureDocs"

# Supabase Storage
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
SUPABASE_BUCKET_PUBLIC=docs

# N8N Webhooks
N8N_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/xxxxx
N8N_DEFAULT_CHAT_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/xxxxx/chat
N8N_PREMIUM_CHAT_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/xxxxx/chat

# WebAuthn
WEBAUTHN_RELYING_PARTY_NAME="SecureDocs"
WEBAUTHN_RP_ID=localhost
WEBAUTHN_RELYING_PARTY_ID=localhost
WEBAUTHN_RELYING_PARTY_ORIGIN=http://localhost:8000
```

---

## 📋 Service Accounts Needed

| Service | Purpose | Sign Up | Free? |
|---------|---------|---------|-------|
| **Supabase** | Database | https://supabase.com | ✅ Yes |
| **Brevo** | Email | https://brevo.com | ✅ Yes |
| **N8N** | Automation | https://n8n.cloud | ✅ Yes |
| **PayMongo** | Payments | https://paymongo.com | ✅ Yes (test) |
| **Bundlr** | Blockchain | https://bundlr.network | ❌ No (needs funding) |

---

## 🔗 Getting Credentials

### Supabase
1. Create project at https://supabase.com
2. Go to **Settings → Database**
3. Copy: Host, Port, Database, Username, Password
4. Go to **Settings → API**
5. Copy: Project URL, Anon Key, Service Role Key

### Brevo
1. Sign up at https://brevo.com
2. Go to **Settings → SMTP & API**
3. Copy: SMTP Host, Port, Username, Password

### N8N
1. Sign up at https://n8n.cloud
2. Create 3 workflows (see N8N_SETUP_GUIDE.md)
3. Copy webhook URLs for each

### PayMongo (Optional)
1. Sign up at https://paymongo.com
2. Go to **Developers → API Keys**
3. Copy: Public Key, Secret Key

---

## 🧪 Verify Installation

```bash
# Check database connection
php artisan tinker
>>> DB::connection()->getPdo();

# Check email configuration
>>> Mail::raw('Test', function($m) { $m->to('test@example.com'); });

# Check Supabase storage
>>> Storage::disk('supabase')->exists('test.txt');

# Exit tinker
>>> exit
```

---

## 📊 Project Structure

```
securedocs/
├── app/                    # Laravel application code
│   ├── Http/Controllers/   # API controllers
│   ├── Models/             # Database models
│   └── Jobs/               # Background jobs
├── resources/
│   ├── js/                 # JavaScript modules
│   ├── css/                # Stylesheets
│   └── views/              # Blade templates
├── routes/                 # API and web routes
├── database/
│   ├── migrations/         # Database schema
│   └── seeders/            # Sample data
├── storage/
│   ├── logs/               # Application logs
│   └── app/                # File storage
├── .env                    # Environment variables
├── composer.json           # PHP dependencies
└── package.json            # Node.js dependencies
```

---

## 🚀 Common Commands

```bash
# Development
php artisan serve              # Start Laravel server
npm run dev                    # Start Vite dev server
php artisan queue:work         # Start queue worker

# Database
php artisan migrate            # Run migrations
php artisan migrate:rollback   # Undo last migration
php artisan db:seed            # Seed sample data
php artisan tinker             # Interactive shell

# Cache & Routes
php artisan cache:clear        # Clear cache
php artisan route:clear        # Clear route cache
php artisan config:clear       # Clear config cache

# Testing
php artisan test               # Run tests
php artisan test --filter=Auth # Run specific tests

# Production
npm run build                  # Build assets
php artisan config:cache       # Cache config
php artisan route:cache        # Cache routes
```

---

## 🔐 Admin Setup

```bash
# Make first user admin
php artisan tinker
>>> $user = User::first();
>>> $user->role = 'admin';
>>> $user->save();
>>> exit
```

Access admin dashboard: http://localhost:8000/admin

---

## 📱 Features

### Core
- ✅ File upload/download
- ✅ Folder management
- ✅ File search
- ✅ Public sharing (MediaFire-style)
- ✅ Activity logging

### Security
- ✅ WebAuthn biometric login
- ✅ 2FA authentication
- ✅ OTP protection
- ✅ Session management
- ✅ Audit trails

### Premium
- ✅ AI file categorization
- ✅ Blockchain storage (Arweave)
- ✅ AI chat integration
- ✅ Advanced search
- ✅ File versioning

### Admin
- ✅ User management
- ✅ Analytics dashboard
- ✅ System configuration
- ✅ Activity monitoring

---

## 🐛 Troubleshooting

### "Connection refused"
```bash
# Check Supabase credentials
php artisan tinker
>>> DB::connection()->getPdo();
```

### "SMTP connection failed"
```bash
# Check Brevo credentials in .env
# Verify port 587 is open
# Test with: php artisan mail:send
```

### "Webhook not working"
- Verify N8N webhook URL is correct
- Check N8N workflow is activated
- Test with curl or Postman

### "File upload fails"
- Check Supabase bucket exists
- Verify bucket permissions
- Check storage logs

---

## 📚 Documentation

- **Full Setup:** `SETUP_GUIDE_NEW_PC.md`
- **Environment Variables:** `ENV_KEYS_GUIDE.md`
- **N8N Setup:** `N8N_SETUP_GUIDE.md`
- **API Documentation:** `routes/api.php`
- **Database Schema:** `docs/DATABASE_SCHEMA.md`

---

## 🚀 Deployment

### Docker
```bash
docker-compose up -d
```

### Traditional Server
```bash
# Build assets
npm run build

# Set permissions
chmod -R 755 storage bootstrap/cache

# Run migrations
php artisan migrate --force

# Optimize
php artisan config:cache
php artisan route:cache
```

---

## 🆘 Support

- **Documentation:** See `docs/` folder
- **Issues:** Check GitHub issues
- **Community:** N8N community forum
- **Email:** support@securedocs.com

---

**Ready to go! 🎉**

Next steps:
1. Copy `.env.example` to `.env`
2. Fill in credentials from your service accounts
3. Run `php artisan migrate`
4. Start the three servers
5. Visit http://localhost:8000

For detailed instructions, see `SETUP_GUIDE_NEW_PC.md`
