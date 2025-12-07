# INSTALLATION GUIDE

The following is the step-by-step procedure to set up SecureDocs on your local machine to ensure smooth utilization of the system.

## Quick Installation Table

| Step | Description |
|------|-------------|
| **1. Verify Prerequisites** | Check if you have all required software installed on your system. If not, download and install from the links provided in the README.md Requirements section.<br><br>Verify installation by running:<br>`php -v`<br>`composer --version`<br>`node -v`<br>`npm -v` |
| **2. Clone Repository** | Access the system's GitHub repository:<br>https://github.com/Purgatory69/SECUREDOCS.git<br><br>Clone the repository by typing these commands in a terminal:<br>`cd directory-you-will-use`<br>`git clone https://github.com/Purgatory69/SECUREDOCS.git`<br>`cd SECUREDOCS` |
| **3. Copy Environment File** | Copy the localhost environment configuration file:<br>`cp .env.localhost .env`<br><br>This file is pre-configured for local development at `http://localhost:8000` with all necessary settings for:<br>- Local database connection<br>- WebAuthn biometric login<br>- Email testing<br>- N8N integration<br><br>⚠️ **IMPORTANT:** Before continuing, read [DOCUMENTATION_INDEX.md](docs/setup-guides/DOCUMENTATION_INDEX.md) for complete API keys and configuration details. |
| **4. Setup Brevo Email Service** | Configure Brevo for email functionality:<br><br>1. Go to https://www.brevo.com<br>2. Sign up and create account<br>3. Go to Settings → SMTP & API<br>4. Copy SMTP credentials:<br>   - `MAIL_HOST=smtp-relay.brevo.com`<br>   - `MAIL_PORT=587`<br>   - `MAIL_USERNAME` (your Brevo email)<br>   - `MAIL_PASSWORD` (your SMTP key)<br>5. Update `.env` with your credentials<br>6. For localhost testing, use `MAIL_MAILER=log` to log emails instead of sending<br><br>📖 **See:** [DOCUMENTATION_INDEX.md](docs/setup-guides/DOCUMENTATION_INDEX.md) for detailed instructions |
| **5. Setup N8N Account & Workflows** | Create N8N account for webhooks:<br><br>1. Go to https://n8n.cloud<br>2. Sign up and create workspace named `SecureDocs`<br>3. Import pre-built workflows from `n8n workflows/` folder:<br>   - `default chat bot.json`<br>   - `premium workflow.json`<br>4. Activate workflows and copy webhook URLs<br>5. Update webhook URLs in `.env`:<br>   - `N8N_WEBHOOK_URL`<br>   - `N8N_DEFAULT_CHAT_WEBHOOK_URL`<br>   - `N8N_PREMIUM_CHAT_WEBHOOK_URL`<br><br>📖 **See:** [N8N_SETUP_GUIDE.md](docs/setup-guides/N8N_SETUP_GUIDE.md) for detailed instructions |
| **6. Setup PayMongo Account** | Create PayMongo account for payment processing:<br><br>1. Go to https://paymongo.com<br>2. Sign up and create account<br>3. Go to Settings → API Keys<br>4. Copy test keys:<br>   - `PAYMONGO_PUBLIC_KEY` (pk_test_...)<br>   - `PAYMONGO_SECRET_KEY` (sk_test_...)<br>5. Update `.env` with your keys<br>6. For production, use live keys when ready<br><br>⚠️ **Note:** Test keys are already in `.env.localhost` for development |
| **7. Generate Application Key** | Generate the Laravel application encryption key:<br>`php artisan key:generate`<br><br>This creates a unique key for your application instance and stores it in the `.env` file. |
| **8. Install PHP Dependencies** | Open a terminal in the project directory and install PHP dependencies:<br>`composer install`<br><br>This downloads and installs all required PHP packages defined in `composer.json`. |
| **9. Install Node Dependencies** | In the same terminal, install Node.js dependencies:<br>`npm install`<br><br>This downloads and installs all required JavaScript packages for frontend development. |
| **10. Run Database Migrations** | Execute the database migrations to create all required tables:<br>`php artisan migrate`<br><br>This sets up the PostgreSQL database schema using Supabase credentials from `.env`. |
| **11. Build Frontend Assets** | Build the frontend assets for development:<br>`npm run build`<br><br>This compiles TailwindCSS, JavaScript, and other frontend resources. |
| **12. Split Terminal & Start Servers** | Split the terminal in your IDE (VS Code: View > Terminal > Split Terminal) to run multiple servers simultaneously. |
| | **Terminal 1 - Laravel Server:**<br>Run the Laravel development server:<br>`php artisan serve`<br><br>This starts the backend server at `http://localhost:8000` |
| | **Terminal 2 - Frontend Dev Server:**<br>Run the Vite development server:<br>`npm run dev`<br><br>This starts the frontend development server with hot module replacement for real-time updates. |
| | **Terminal 3 - Queue Worker (Optional):**<br>Run the queue worker for background jobs:<br>`php artisan queue:work`<br><br>This processes background tasks like email sending and file processing. |
| **13. Access Application** | Open your web browser and navigate to:<br>`http://localhost:8000`<br><br>You should see the SecureDocs login page. Create an account and start using the application. |

---

## Detailed Step-by-Step Instructions

### Step 1: Verify Prerequisites

Before starting, ensure you have all required software installed:

**Windows Users:**
```bash
# Check PHP
php -v

# Check Composer
composer --version

# Check Node.js
node -v
npm -v
```

**macOS Users:**
```bash
# Using Homebrew
php -v
composer --version
node -v
npm -v
```

**Linux Users:**
```bash
# Using apt
php -v
composer --version
node -v
npm -v
```

If any command is not found, refer to the Requirements section in README.md for installation instructions.

### Step 2: Clone the Repository

```bash
# Navigate to your desired directory
cd path/to/your/projects

# Clone the repository
git clone https://github.com/Purgatory69/SECUREDOCS.git

# Enter the project directory
cd SECUREDOCS
```

### Step 3: Copy Environment File

```bash
# Copy the pre-configured localhost environment file
cp .env.localhost .env
```

This file includes:
- Database connection to Supabase
- Brevo SMTP email configuration
- N8N webhook URLs
- WebAuthn settings for localhost
- PayMongo test keys
- All other necessary environment variables

#### ⚠️ Important: API Keys & Configuration

Before proceeding with the next steps, you **MUST** review the complete setup guides for detailed information about:
- **API Keys & Credentials** - How to obtain and configure all external service keys
- **Environment Variables** - Complete reference for all `.env` settings
- **Service Accounts** - Creating accounts for Supabase, Brevo, N8N, PayMongo, Bundlr
- **Production Deployment** - How to configure for production environments

**👉 Read this first:** [DOCUMENTATION_INDEX.md](docs/setup-guides/DOCUMENTATION_INDEX.md)

This guide will direct you to:
- [DOCUMENTATION_INDEX.md](docs/setup-guides/DOCUMENTATION_INDEX.md) - Complete navigation and learning paths
- [QUICK_START.md](docs/setup-guides/QUICK_START.md) - Fast 5-minute setup reference
- [N8N_SETUP_GUIDE.md](docs/setup-guides/N8N_SETUP_GUIDE.md) - N8N webhook configuration
- [LOCALHOST_SETUP.md](docs/setup-guides/LOCALHOST_SETUP.md) - Local development details

**Note:** The `.env.localhost` file has test/placeholder credentials. For production or to use real services, you'll need to obtain your own API keys from each service provider.

### Step 4: Generate Application Key

```bash
# Generate the Laravel application key
php artisan key:generate
```

You should see: `Application key [base64:...] set successfully.`

### Step 5: Install PHP Dependencies

```bash
# Install all PHP packages
composer install
```

This may take a few minutes. Wait for it to complete.

### Step 6: Install Node Dependencies

```bash
# Install all JavaScript packages
npm install
```

This may take a few minutes. Wait for it to complete.

### Step 7: Run Database Migrations

```bash
# Run all migrations to set up the database
php artisan migrate
```

You should see output like:
```
Migrating: 2024_01_01_000000_create_users_table
Migrated: 2024_01_01_000000_create_users_table
...
```

### Step 8: Build Frontend Assets

```bash
# Build frontend assets for development
npm run build
```

This compiles TailwindCSS and JavaScript files.

### Step 9: Start Development Servers

You need to run 3 servers simultaneously. Split your terminal into 3 panes:

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
```

Expected output:
```
Laravel development server started: http://127.0.0.1:8000
```

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```

Expected output:
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/
```

**Terminal 3 - Queue Worker (Optional):**
```bash
php artisan queue:work
```

Expected output:
```
Processing jobs from the [default] queue...
```

### Step 10: Access the Application

Open your web browser and go to:
```
http://localhost:8000
```

You should see the SecureDocs login page.

---

## Troubleshooting

### Issue: "Command not found: php"
**Solution:** PHP is not installed or not in PATH. Install PHP 8.2+ from https://www.php.net/downloads

### Issue: "Command not found: composer"
**Solution:** Composer is not installed. Install from https://getcomposer.org/download/

### Issue: "Command not found: node"
**Solution:** Node.js is not installed. Install from https://nodejs.org/

### Issue: "SQLSTATE[HY000]: General error: 7 SSL"
**Solution:** Database connection issue. Verify Supabase credentials in `.env` file.

### Issue: "Port 8000 is already in use"
**Solution:** Another application is using port 8000. Either:
- Stop the other application
- Or run: `php artisan serve --port=8001`

### Issue: "npm: command not found"
**Solution:** Node.js or npm is not installed. Install from https://nodejs.org/

### Issue: "Module not found" errors
**Solution:** Run `npm install` and `composer install` again to ensure all dependencies are installed.

### Issue: "WebAuthn origin mismatch"
**Solution:** Make sure you're accessing the app at `http://localhost:8000` (not `127.0.0.1:8000`)

---

## Next Steps

After successful installation:

1. **Create an Account** - Register a new user account at http://localhost:8000
2. **Test Features** - Try uploading files, creating folders, sharing documents
3. **Configure Services** - Follow guides in `docs/setup-guides/` for:
   - N8N integration
   - Email testing
   - Payment processing
   - Blockchain storage
4. **Read Documentation** - Check `docs/setup-guides/LOCALHOST_SETUP.md` for local development tips

---

## Quick Reference Commands

```bash
# Start development (from project root)
php artisan serve          # Terminal 1
npm run dev                # Terminal 2
php artisan queue:work     # Terminal 3 (optional)

# Database operations
php artisan migrate        # Run migrations
php artisan migrate:fresh  # Reset database (WARNING: deletes data)
php artisan tinker         # Interactive shell

# Cache operations
php artisan cache:clear    # Clear application cache
php artisan config:cache   # Cache configuration

# Queue operations
php artisan queue:work     # Process queued jobs
php artisan queue:failed   # View failed jobs

# Useful npm commands
npm run build              # Build assets for production
npm run dev                # Start dev server with hot reload
npm run lint               # Check code quality
```

---

## For Production Deployment

For deploying to production, follow the comprehensive guide in:
**[SETUP_GUIDE_NEW_PC.md](docs/setup-guides/SETUP_GUIDE_NEW_PC.md)**

This includes:
- Creating service accounts for all external services
- Configuring production environment variables
- Setting up SSL certificates
- Database optimization
- Asset optimization
- Deployment procedures

---

## Support & Documentation

- **Quick Start:** [docs/setup-guides/QUICK_START.md](docs/setup-guides/QUICK_START.md)
- **Complete Setup:** [docs/setup-guides/SETUP_GUIDE_NEW_PC.md](docs/setup-guides/SETUP_GUIDE_NEW_PC.md)
- **Localhost Setup:** [docs/setup-guides/LOCALHOST_SETUP.md](docs/setup-guides/LOCALHOST_SETUP.md)
- **Environment Variables:** [docs/setup-guides/ENV_KEYS_GUIDE.md](docs/setup-guides/ENV_KEYS_GUIDE.md)
- **N8N Integration:** [docs/setup-guides/N8N_SETUP_GUIDE.md](docs/setup-guides/N8N_SETUP_GUIDE.md)
- **Documentation Index:** [docs/setup-guides/DOCUMENTATION_INDEX.md](docs/setup-guides/DOCUMENTATION_INDEX.md)

---

**Happy coding! 🚀 SecureDocs is now running on your local machine.**
