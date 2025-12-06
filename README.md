# SecureDocs - Secure File Management System 🔐📁

A modern, secure file management system built with Laravel that provides enterprise-grade document storage, collaboration, and blockchain-backed permanent archiving.

**GitHub:** https://github.com/Purgatory69/SECUREDOCS.git

## 🚀 Features

### Core File Management
- **📁 Hierarchical Folder Structure**: Organize files in nested folders with drag-and-drop support
- **📤 Advanced Upload System**: Multi-file uploads with progress tracking and resumable uploads
- **🔍 Smart Search**: Full-text search across all documents with AI-powered suggestions
- **🗂️ File Organization**: Automatic categorization using AI/ML algorithms
- **📋 Batch Operations**: Select multiple files for bulk actions (move, delete, share)

### Security & Authentication
- **🔐 Multi-Factor Authentication**: WebAuthn biometric authentication + TOTP
- **👥 Role-Based Access Control**: User, and Admin roles
- **📊 Activity Tracking**: Comprehensive audit logs for all user actions
- **🔔 Real-Time Notifications**: Email and in-app notifications for security events
- **🌍 Session Management**: Trusted devices and suspicious activity detection

### Premium Features
- **🤖 AI-Powered Features**: Automatic file categorization and content analysis
- **⛓️ Blockchain Storage**: Permanent archiving on Arweave
- **💎 Premium Subscriptions**: Enhanced storage limits and advanced features
- **🔒 Encrypted Storage**: End-to-end encryption for sensitive documents

### & Sharing
- **👥 File Sharing**: Share files and folders with granular permissions


### Administration
- **👨‍💼 Admin Dashboard**: User management, analytics, and system monitoring
- **📊 Usage Analytics**: Storage usage, activity reports, and performance metrics
- **⚙️ System Configuration**: Database schema visualization and API endpoints
- **🔧 Maintenance Tools**: Automated cleanup and optimization scripts

## 🛠️ Technology Stack

- **Backend**: Laravel 12.x (PHP 8.2+)
- **Frontend**: JavaScript ES6+, TailwindCSS, Livewire
- **Database**: PostgreSQL with Supabase
- **Authentication**: Laravel Jetstream + WebAuthn
- **Storage**: Local storage + Blockchain (Arweave)
- **AI/ML**: Custom categorization engine
- **Deployment**: Github + Cloudflare Tunnels

## 📋 Requirements

### System Requirements

**Operating System:**
- Windows 9+ / macOS 10.15+ / Linux (Ubuntu 20.04+)

### Software Requirements

**Backend:**
- **PHP 8.2 or higher** - Download from https://www.php.net/downloads
  - Required extensions: OpenSSL, PDO, Mbstring, Tokenizer, JSON, BCMath, Ctype, Fileinfo
  - Verify: `php -v`

- **Composer** - PHP dependency manager - Download from https://getcomposer.org/download/
  - Verify: `composer --version`

**Frontend:**
- **Node.js 18+ with npm** - Download from https://nodejs.org/
  - Verify: `node -v` and `npm -v`

**Database:**
- **PostgreSQL 13+** (optional for local) - Download from https://www.postgresql.org/download/
  - OR use **Supabase** (cloud PostgreSQL) - Sign up at https://supabase.com
  - Verify: `psql --version`

### External Services (for full features)

- **Supabase Account** - Database & file storage (https://supabase.com)
- **Brevo Account** - Email service (https://brevo.com)
- **N8N Account** - AI & automation (https://n8n.cloud)
- **PayMongo Account** - Payment processing (https://paymongo.com) - Optional
- **Bundlr Account** - Blockchain storage (https://bundlr.network) - Optional

### Installation Instructions by OS

#### Windows

1. **PHP 8.2+**
   - Download from https://windows.php.net/download/
   - Add PHP to PATH
   - Verify: `php -v`

2. **Composer**
   - Download installer from https://getcomposer.org/Composer-Setup.exe
   - Run installer
   - Verify: `composer --version`

3. **Node.js 18+**
   - Download from https://nodejs.org/
   - Run installer
   - Verify: `node -v` and `npm -v`

4. **PostgreSQL 13+** (optional)
   - Download from https://www.postgresql.org/download/windows/
   - Run installer
   - Verify: `psql --version`

#### macOS

```bash
# Using Homebrew (install from https://brew.sh if needed)

# PHP 8.2+
brew install php@8.2
brew link php@8.2
php -v

# Composer
brew install composer
composer --version

# Node.js 18+
brew install node
node -v
npm -v

# PostgreSQL 13+ (optional)
brew install postgresql
psql --version
```

#### Linux (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# PHP 8.2+
sudo apt install php8.2 php8.2-cli php8.2-common php8.2-pdo php8.2-mbstring php8.2-tokenizer php8.2-json php8.2-bcmath php8.2-ctype php8.2-fileinfo php8.2-curl php8.2-xml
php -v

# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer --version

# Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs
node -v
npm -v

# PostgreSQL 13+ (optional)
sudo apt install postgresql postgresql-contrib
psql --version
```

### Verify Installation

Run this to check all requirements:

```bash
# Check PHP
php -v

# Check Composer
composer --version

# Check Node.js and npm
node -v
npm -v

# Check PostgreSQL (if installed locally)
psql --version
```

All should show version numbers without errors.

## 🚀 Installation

**Start here:** [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) - Step-by-step installation with detailed table format

For comprehensive setup guides, see the **[Setup Guides Documentation](docs/setup-guides/)**:

- **[QUICK_START.md](docs/setup-guides/QUICK_START.md)** - Fast 5-minute setup for experienced developers
- **[SETUP_GUIDE_NEW_PC.md](docs/setup-guides/SETUP_GUIDE_NEW_PC.md)** - Complete step-by-step guide for new PC setup
- **[LOCALHOST_SETUP.md](docs/setup-guides/LOCALHOST_SETUP.md)** - Local development setup with localhost:8000
- **[ENV_KEYS_GUIDE.md](docs/setup-guides/ENV_KEYS_GUIDE.md)** - Detailed environment variable reference
- **[N8N_SETUP_GUIDE.md](docs/setup-guides/N8N_SETUP_GUIDE.md)** - N8N webhook configuration guide
- **[DOCUMENTATION_INDEX.md](docs/setup-guides/DOCUMENTATION_INDEX.md)** - Navigation and learning paths

### Quick Setup (5 minutes)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd securedocs
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Configure environment**
   ```bash
   # Copy the localhost configuration
   cp .env.localhost .env
   
   php artisan key:generate
   ```
   
   **For production deployment:** See [SETUP_GUIDE_NEW_PC.md](docs/setup-guides/SETUP_GUIDE_NEW_PC.md) for detailed production configuration.

4. **Database & Build**
   ```bash
   php artisan migrate
   npm run build
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1: Laravel server
   php artisan serve

   # Terminal 2: Vite dev server
   npm run dev

   # Terminal 3: Queue worker (optional)
   php artisan queue:work
   ```

### Environment Files

- **`.env.localhost`** - Pre-configured for local development (localhost:8000)
- **`.env`** - Your actual configuration (created from `.env.localhost`)

**Local Development Setup:**
```bash
cp .env.localhost .env
```

**Production Setup:**
For production/cloud deployment, follow the detailed guide in [SETUP_GUIDE_NEW_PC.md](docs/setup-guides/SETUP_GUIDE_NEW_PC.md) which includes:
- Creating service accounts (Supabase, Brevo, N8N, PayMongo, Bundlr)
- Configuring all environment variables
- Database setup and migrations
- Asset building and optimization

## 🔧 Configuration

### Environment Variables

Key configuration options in `.env`:

```env
# Application
APP_NAME=SecureDocs
APP_ENV=local
APP_DEBUG=true

# Database (Supabase)
DB_CONNECTION=pgsql
DB_HOST=db.your-project.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-password


# AI Features
OPENAI_API_KEY=your-openai-key

# Notifications
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:
- `users` - User accounts and profiles
- `files` - File metadata and storage information
- `folders` - Hierarchical folder structure
- `user_sessions` - Authentication sessions
- `notifications` - User notifications
- `activity_logs` - Audit trail

View the complete schema documentation in `docs/schema/DATABASE_SCHEMA_FULL.md`.

## 📖 Usage

### User Registration & Authentication
1. Register a new account or login with existing credentials
2. Set up 2FA using WebAuthn (biometric) or TOTP app
3. Verify your email address for full access

### File Management
1. **Upload Files**: Click "Upload" or drag files to the upload area
2. **Create Folders**: Right-click in file area or use the "New Folder" button
3. **Organize Files**: Drag files between folders or use batch operations
4. **Search**: Use the search bar to find files by name or content

### Premium Features
1. **Upgrade to Premium**: Access subscription management in your profile
2. **AI Categorization**: Enable automatic file organization
3. **Blockchain Storage**: Archive important files permanently

### Administration (Admin Users Only)
1. Access admin dashboard at `/admin`
2. Manage users, view analytics, and configure system settings
3. Monitor activity logs and security events

## 🔒 Security Features

- **End-to-End Encryption**: Files encrypted before storage
- **Access Control**: Granular permissions for files and folders
- **Audit Logging**: All actions tracked with timestamps and user context
- **Suspicious Activity Detection**: Automated monitoring for security threats
- **Secure Authentication**: WebAuthn biometric authentication support
- **Session Security**: Automatic logout on suspicious activity

## 🌐 API Endpoints

The application provides a RESTful API for integrations:

- `GET /api/files` - List user files
- `POST /api/files` - Upload new file
- `GET /api/files/{id}` - Download file
- `PATCH /api/files/{id}` - Update file metadata
- `DELETE /api/files/{id}` - Delete file
- `POST /api/files/{id}/share` - Share file with permissions

View complete API documentation in the routes files.

## 🧪 Testing

Run the test suite:
```bash
php artisan test
```

Run specific test categories:
```bash
php artisan test --filter FileManagement
php artisan test --filter Authentication
```

## 🚀 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Production Deployment
1. Configure production environment variables
2. Run database migrations
3. Build and optimize assets: `npm run build`
4. Set up web server (Nginx/Apache) with PHP-FPM
5. Configure SSL certificates
6. Set up background job processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run the test suite: `php artisan test`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@securedocs.com
- 📖 Documentation: [docs/](docs/)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- Laravel Framework - The foundation of this application
- Supabase - Database and real-time features
- Arweave/Bundlr - Decentralized storage solutions
- WebAuthn - Modern authentication standard

---

**SecureDocs** - Where security meets simplicity in document management.
