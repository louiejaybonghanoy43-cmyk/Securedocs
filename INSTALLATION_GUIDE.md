# INSTALLATION GUIDE

The following is the step-by-step procedure to set up SecureDocs on your local machine to ensure smooth utilization of the system.

## Quick Installation Table

| Step | Description |
|------|-------------|
| **1. Verify Prerequisites** | Check if you have all required software installed on your system. If not, download and install from the links provided in the README.md Requirements section. |
| | **Verify installation by running:** |
| | ```bash
   php -v
   composer --version
   node -v
   npm -v
   ``` |
| **2. Clone Repository** | Access the system's GitHub repository: |
| | https://github.com/Purgatory69/SECUREDOCS.git |
| | **Clone the repository:** |
| | ```bash
   cd directory-you-will-use
   git clone https://github.com/Purgatory69/SECUREDOCS.git
   cd SECUREDOCS
   ``` |
| **3. Copy Environment File** | Copy the localhost environment configuration file: |
| | ```bash
   cp .env.localhost .env
   ``` |
| | This file is pre-configured for local development at `http://localhost:8000` with all necessary settings for: |
| | - Local database connection |
| | - WebAuthn biometric login |
| | - Email testing |
| | - N8N integration |
| | |
| | ⚠️ **IMPORTANT:** Before continuing, read [DOCUMENTATION_INDEX.md](docs/setup-guides/DOCUMENTATION_INDEX.md) for complete API keys and configuration details. |
| **3.5 Review Complete Guides** | **MUST READ:** [DOCUMENTATION_INDEX.md](docs/setup-guides/DOCUMENTATION_INDEX.md) |
| | **This guide covers:** |
| | - How to obtain API keys from all services |
| | - Complete environment variable reference |
| | - Creating service accounts (Supabase, Brevo, N8N, PayMongo, Bundlr) |
| | - Production deployment configuration |
| | |
| | **Links to:** |
| | - [QUICK_START.md](docs/setup-guides/QUICK_START.md) - Fast setup reference |
| | - [LOCALHOST_SETUP.md](docs/setup-guides/LOCALHOST_SETUP.md) - Local development |
| | - [N8N_SETUP_GUIDE.md](docs/setup-guides/N8N_SETUP_GUIDE.md) - N8N webhooks |
| **4. Generate Application Key** | Generate the Laravel application encryption key: |
| | ```bash
   php artisan key:generate
   ``` |
| | This creates a unique key for your application instance and stores it in the `.env` file. |
| **5. Install PHP Dependencies** | Open a terminal in the project directory and install PHP dependencies: |
| | ```bash
   composer install
   ``` |
| | This downloads and installs all required PHP packages defined in `composer.json`. |
| **6. Install Node Dependencies** | Install Node.js dependencies: |
| | ```bash
   npm install
   ``` |
| | This downloads and installs all required JavaScript packages for frontend development. |
| **7. Run Database Migrations** | Execute the database migrations: |
| | ```bash
   php artisan migrate
   ``` |
| | This sets up the PostgreSQL database schema using Supabase credentials from `.env`. |
| **8. Build Frontend Assets** | Build the frontend assets for development: |
| | ```bash
   npm run build
   ``` |
| | This compiles TailwindCSS, JavaScript, and other frontend resources. |
| **9. Split Terminal & Start Servers** | Split the terminal in your IDE (VS Code: View > Terminal > Split Terminal) to run multiple servers simultaneously. |
| **9.1 Terminal 1 - Laravel Server** | Run the Laravel development server: |
| | ```bash
   php artisan serve
   ``` |
| | This starts the backend server at `http://localhost:8000` |
| **9.2 Terminal 2 - Frontend Dev Server** | Run the Vite development server: |
| | ```bash
   npm run dev
   ``` |
| | This starts the frontend development server with hot module replacement for real-time updates. |
| **9.3 Terminal 3 - Queue Worker (Optional)** | Run the queue worker for background jobs: |
| | ```bash
   php artisan queue:work
   ``` |
| | This processes background tasks like email sending and file processing. |
| **10. Access Application** | Open your web browser and navigate to: |
| | `http://localhost:8000` |
| | You should see the SecureDocs login page. Create an account and start using the application. |

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
