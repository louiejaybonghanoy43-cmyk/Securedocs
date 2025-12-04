<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Disable foreign key checks temporarily
        DB::statement('SET session_replication_role = replica;');
        
        // Create tables in order of dependencies
        
        // 1. Users table (core)
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('two_factor_secret')->nullable();
            $table->text('two_factor_recovery_codes')->nullable();
            $table->timestamp('two_factor_confirmed_at')->nullable();
            $table->string('role')->default('user');
            $table->boolean('is_premium')->default(false);
            $table->boolean('email_notifications_enabled')->default(true);
            $table->boolean('login_notifications_enabled')->default(true);
            $table->boolean('security_notifications_enabled')->default(true);
            $table->boolean('activity_notifications_enabled')->default(false);
            $table->string('profile_photo_path', 2048)->nullable();
            $table->unsignedBigInteger('current_team_id')->nullable();
            $table->rememberToken();
            $table->timestamps();
            
            // Check constraint for role
            $table->rawIndex("(CASE WHEN role IN ('user', 'record admin', 'admin') THEN 1 ELSE NULL END)", 'users_role_check');
        });
        
        // 2. Sessions table
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->text('payload');
            $table->integer('last_activity')->index();
        });
        
        // 3. User Sessions table (for tracking)
        Schema::create('user_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('session_id')->unique();
            $table->string('ip_address', 45);
            $table->text('user_agent');
            $table->string('device_type')->nullable();
            $table->string('browser')->nullable();
            $table->string('location_country', 2)->nullable();
            $table->string('location_city')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_activity_at')->index();
            $table->timestamp('expires_at');
            $table->timestamps();
            
            $table->index(['is_active', 'last_activity_at'], 'idx_user_sessions_active');
            $table->index('session_id', 'idx_user_sessions_session_id');
            $table->unique(['user_id', 'session_id'], 'user_sessions_session_id_key');
        });
        
        // 4. Password Reset Tokens
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
        
        // 5. Personal Access Tokens
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable');
            $table->string('name');
            $table->string('token')->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
            
            $table->index(['tokenable_type', 'tokenable_id'], 'personal_access_tokens_tokenable_type_tokenable_id_index');
        });
        
        // 6. WebAuthn Credentials
        Schema::create('webauthn_credentials', function (Blueprint $table) {
            $table->id();
            $table->morphs('authenticatable');
            $table->string('name');
            $table->text('credential_id');
            $table->text('public_key');
            $table->string('origin');
            $table->string('rp_id');
            $table->binary('user_handle')->nullable();
            $table->text('transports')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            
            $table->index(['authenticatable_type', 'authenticatable_id'], 'webauthn_credentials_authenticatable_index');
            $table->index('origin', 'webauthn_credentials_origin_index');
            $table->index('rp_id', 'webauthn_credentials_rp_id_index');
            $table->index('user_handle', 'webauthn_credentials_user_handle_index');
        });
        
        // 7. Files table (core file management)
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_size')->nullable();
            $table->string('file_type')->nullable();
            $table->string('mime_type')->nullable();
            $table->timestamps();
            $table->foreignId('parent_id')->nullable()->constrained('files')->onDelete('cascade');
            $table->boolean('is_folder')->default(false);
            $table->timestamp('deleted_at')->nullable();
            $table->boolean('is_permanent_stored')->default(false)->comment('Whether file is stored on Pinata IPFS');
            $table->boolean('is_vectorized')->default(false);
            $table->timestamp('vectorized_at')->nullable();
            $table->boolean('is_permanent_storage')->nullable()->default(false)->comment('Whether this file is permanently stored (undeletable)');
            $table->boolean('is_confidential')->nullable()->default(false);
            $table->timestamp('confidential_enabled_at')->nullable();
            $table->text('arweave_url')->nullable();
            $table->boolean('uploading')->nullable()->default(false);
            $table->boolean('is_arweave')->nullable()->default(false);
            $table->uuid('share_token')->nullable()->unique();
            $table->string('url_slug')->nullable();
            $table->text('full_path')->nullable();
            $table->uuid('uuid')->nullable()->unique();
            
            // Indexes for performance
            $table->index(['user_id', 'deleted_at', 'parent_id', 'is_folder', 'file_name'], 'idx_files_listing');
            $table->index(['user_id', 'id'], 'idx_files_parent_lookup')->where('is_folder', true);
            $table->index('deleted_at', 'idx_files_deleted_at');
            $table->index('is_permanent_stored', 'idx_files_is_blockchain_stored');
            $table->index('is_permanent_storage', 'idx_files_permanent_storage');
            $table->index(['user_id', 'created_at'], 'idx_files_user_created');
            $table->index(['user_id', 'is_folder'], 'idx_files_user_folder');
            $table->index(['user_id', 'file_size'], 'idx_files_user_size');
            $table->index(['user_id', 'file_type'], 'idx_files_user_type');
            $table->index(['user_id', 'updated_at'], 'idx_files_user_updated');
            $table->index(['user_id', 'deleted_at'], 'idx_files_trash')->whereNotNull('deleted_at');
            
            // Full-text search index
            DB::statement("CREATE INDEX idx_files_search_text ON files USING gin(to_tsvector('english', COALESCE(file_name, '') || ' ' || COALESCE(file_type, '') || ' ' || COALESCE(mime_type, '')))");
        });
        
        // 8. System Activities
        Schema::create('system_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('file_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('target_user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('activity_type');
            $table->string('action');
            $table->string('entity_type')->nullable();
            $table->string('entity_id')->nullable();
            $table->text('description');
            $table->json('metadata')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('session_id')->nullable();
            $table->string('location_country', 2)->nullable();
            $table->string('location_city')->nullable();
            $table->string('device_type')->nullable();
            $table->string('browser')->nullable();
            $table->string('risk_level')->default('low');
            $table->boolean('requires_audit')->default(false);
            $table->boolean('is_suspicious')->default(false);
            $table->timestamp('created_at');
            
            $table->index(['activity_type', 'action'], 'idx_system_activities_type_action');
            $table->index('created_at', 'idx_system_activities_created_at');
            $table->index('file_id', 'idx_system_activities_file_id');
            $table->index('user_id', 'idx_system_activities_user_id');
            $table->index('risk_level', 'idx_system_activities_risk_level');
            $table->index(['requires_audit', 'is_suspicious'], 'idx_system_activities_audit');
        });
        
        // 9. Notifications
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type');
            $table->morphs('notifiable');
            $table->text('data');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            
            $table->index(['notifiable_type', 'notifiable_id'], 'notifications_notifiable_type_notifiable_id_index');
            $table->index(['user_id', 'created_at'], 'idx_notifications_user_created');
            $table->index(['user_id', 'read_at'], 'idx_notifications_user_read');
        });
        
        // 10. File OTP Security
        Schema::create('file_otp_security', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('file_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('permanent_storage_id')->nullable()->constrained()->onDelete('cascade');
            $table->boolean('is_otp_enabled')->default(false);
            $table->string('otp_code')->nullable();
            $table->timestamp('otp_expires_at')->nullable();
            $table->integer('otp_attempts')->default(0);
            $table->integer('max_otp_attempts')->default(3);
            $table->timestamp('last_otp_sent_at')->nullable();
            $table->timestamp('last_successful_access_at')->nullable();
            $table->integer('total_access_count')->default(0);
            $table->boolean('require_otp_for_download')->default(true);
            $table->boolean('require_otp_for_preview')->default(false);
            $table->integer('otp_valid_duration_minutes')->default(10);
            $table->timestamps();
            $table->boolean('require_otp_for_arweave_upload')->default(false);
            $table->boolean('require_otp_for_ai_share')->default(false);
            
            $table->index('user_id', 'idx_file_otp_security_user_id');
            $table->index('file_id', 'idx_file_otp_security_file_id');
            $table->index('permanent_storage_id', 'idx_file_otp_security_permanent_storage_id');
            $table->index('is_otp_enabled', 'idx_file_otp_security_otp_enabled');
        });
        
        // 11. Arweave URLs
        Schema::create('arweave_urls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('url');
            $table->string('file_name')->nullable();
            $table->timestamps();
            $table->boolean('is_encrypted')->default(false)->comment('Whether the file is encrypted before upload to Arweave');
            $table->string('encryption_method')->nullable()->default(null)->comment('Encryption method used (e.g., AES-256-GCM)');
            $table->string('password_hash')->nullable()->default(null)->comment('Hashed password for file access (bcrypt)');
            $table->string('salt')->nullable()->default(null)->comment('Salt used for key derivation');
            $table->string('iv')->nullable()->default(null)->comment('Initialization vector for encryption');
            $table->integer('access_count')->default(0)->comment('Number of times file has been accessed');
            $table->timestamp('last_accessed_at')->nullable()->comment('Last time file was accessed');
            $table->decimal('upload_cost_matic', 10, 8)->nullable()->default(null)->comment('Cost paid in MATIC for Arweave upload');
            $table->decimal('upload_cost_usd', 10, 4)->nullable()->default(null)->comment('Cost in USD at time of upload');
            $table->string('transaction_id')->nullable()->default(null)->comment('Bundlr/Arweave transaction ID');
            $table->json('bundlr_receipt')->nullable()->comment('Full Bundlr upload receipt data');
            $table->bigInteger('file_size_bytes')->nullable()->comment('Original file size in bytes');
            $table->string('mime_type')->nullable()->default(null)->comment('MIME type of the uploaded file');
            $table->json('gateway_urls')->nullable()->comment('Alternative gateway URLs for accessing the file');
            
            $table->unique(['user_id', 'url'], 'arweave_urls_user_id_url_key');
            $table->index('user_id', 'idx_arweave_urls_user_id');
            $table->index('created_at', 'idx_arweave_urls_created_at');
            $table->index(['user_id', 'is_encrypted'], 'idx_arweave_urls_encrypted');
            $table->index('transaction_id', 'idx_arweave_urls_transaction');
            $table->index(['user_id', 'upload_cost_matic'], 'idx_arweave_urls_cost');
        });
        
        // 12. Public Shares
        Schema::create('public_shares', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('file_id')->constrained()->onDelete('cascade');
            $table->string('share_token')->unique()->comment('Unique token used in public URLs');
            $table->string('share_type');
            $table->boolean('is_one_time')->default(false)->comment('If true, link expires after first download');
            $table->integer('download_count')->default(0);
            $table->integer('max_downloads')->nullable()->comment('Maximum downloads allowed (NULL = unlimited)');
            $table->timestamp('expires_at')->nullable();
            $table->boolean('password_protected')->default(false)->comment('Premium feature - password protection for shares');
            $table->string('password_hash')->nullable();
            $table->timestamps();
            
            $table->check("share_type IN ('file', 'folder')");
            $table->index('share_token', 'idx_public_shares_token');
            $table->index('file_id', 'idx_public_shares_file_id');
            $table->index('user_id', 'idx_public_shares_user_id');
            $table->index('expires_at', 'idx_public_shares_expires_at');
        });
        
        // 13. Shared File Copies
        Schema::create('shared_file_copies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('original_share_id')->constrained('public_shares')->onDelete('cascade');
            $table->foreignId('copied_by_user_id')->constrained()->onDelete('cascade');
            $table->foreignId('copied_file_id')->constrained()->onDelete('cascade');
            $table->timestamp('copied_at')->useCurrent();
            
            $table->index('original_share_id', 'idx_shared_file_copies_share_id');
            $table->index('copied_by_user_id', 'idx_shared_file_copies_user_id');
        });
        
        // 14. AI/Vectorization tables
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->text('content')->nullable();
            $table->json('metadata')->nullable();
            $table->vector('embedding', 1536)->nullable(); // Assuming OpenAI embeddings
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('file_id')->nullable()->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->index('file_id', 'idx_documents_file');
        });
        
        Schema::create('document_metadata', function (Blueprint $table) {
            $table->text('id')->primary();
            $table->text('title')->nullable();
            $table->text('url')->nullable();
            $table->timestamps();
            $table->text('schema')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('file_id')->nullable()->constrained()->onDelete('cascade');
            
            $table->index('file_id', 'idx_docmeta_file');
        });
        
        Schema::create('document_rows', function (Blueprint $table) {
            $table->id();
            $table->text('dataset_id')->nullable();
            $table->json('row_data')->nullable();
            $table->foreignId('file_id')->nullable()->constrained()->onDelete('cascade');
            
            $table->index('file_id', 'idx_docrows_file');
        });
        
        // 15. Payment tables
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('plan');
            $table->string('status')->default('active');
            $table->timestamp('starts_at');
            $table->timestamp('ends_at')->nullable();
            $table->decimal('amount', 8, 2);
            $table->string('currency', 3)->default('USD');
            $table->string('payment_method')->nullable();
            $table->boolean('auto_renew')->default(false);
            $table->timestamps();
            
            $table->index('user_id', 'idx_subscriptions_user_id');
            $table->index('status', 'idx_subscriptions_status');
        });
        
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('subscription_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('amount', 8, 2);
            $table->string('currency', 3)->default('USD');
            $table->string('status')->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('payment_intent_id')->unique();
            $table->json('metadata')->nullable();
            $table->timestamps();
            
            $table->index('user_id', 'idx_payments_user_id');
            $table->index('status', 'idx_payments_status');
            $table->index('payment_intent_id', 'idx_payments_intent_id');
        });
        
        Schema::create('user_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // card, bank_account, etc.
            $table->string('provider'); // stripe, paypal, etc.
            $table->string('provider_id');
            $table->boolean('is_default')->default(false);
            $table->json('metadata')->nullable();
            $table->timestamps();
            
            $table->index('user_id', 'idx_user_payment_methods_user_id');
        });
        
        // 16. Cache tables
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->text('value');
            $table->integer('expiration');
        });
        
        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration');
        });
        
        // 17. Queue tables
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index();
            $table->text('payload');
            $table->smallInteger('attempts')->default(0);
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });
        
        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->text('payload');
            $table->text('exception');
            $table->timestamp('failed_at')->useCurrent();
        });
        
        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->integer('total_jobs');
            $table->integer('pending_jobs');
            $table->integer('failed_jobs');
            $table->text('failed_job_ids');
            $table->text('options')->nullable();
            $table->integer('cancelled_at')->nullable();
            $table->integer('created_at');
            $table->integer('finished_at')->nullable();
        });
        
        // 18. Chat History
        Schema::create('chat_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('message');
            $table->string('role'); // user, assistant, system
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
        
        // 19. Migrations table (Laravel system)
        Schema::create('migrations', function (Blueprint $table) {
            $table->id();
            $table->string('migration');
            $table->integer('batch');
        });
        
        // Re-enable foreign key checks
        DB::statement('SET session_replication_role = DEFAULT;');
        
        // Create functions
        DB::unprepared("
            CREATE OR REPLACE FUNCTION public.update_file_otp_security_updated_at()
            RETURNS trigger
            LANGUAGE plpgsql
            AS \$\$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            \$\$;
        ");
        
        DB::unprepared("
            CREATE OR REPLACE FUNCTION public.update_ids_from_metadata()
            RETURNS trigger
            LANGUAGE plpgsql
            AS \$\$
            begin
                -- Check if the metadata contains the user_id and file_id
                if new.metadata ? 'user_id' then
                    -- Update the user_id column with the value from metadata
                    update public.documents
                    set user_id = (new.metadata ->> 'user_id')::bigint
                    where id = new.id;
                end if;
            
                if new.metadata ? 'file_id' then
                    -- Update the file_id column with the value from metadata
                    update public.documents
                    set file_id = (new.metadata ->> 'file_id')::bigint
                    where id = new.id;
                end if;
            
                return new;
            end;
            \$\$;
        ");
        
        // Create triggers
        DB::unprepared("
            CREATE TRIGGER trigger_file_otp_security_updated_at
            BEFORE UPDATE ON public.file_otp_security
            FOR EACH ROW
            EXECUTE FUNCTION public.update_file_otp_security_updated_at();
        ");
        
        DB::unprepared("
            CREATE TRIGGER set_ids_from_metadata
            AFTER INSERT ON public.documents
            FOR EACH ROW
            EXECUTE FUNCTION public.update_ids_from_metadata();
        ");
        
        // Create views
        DB::unprepared("
            CREATE OR REPLACE VIEW public.file_activity_summary AS
            SELECT f.id AS file_id,
                f.file_name,
                f.user_id AS owner_id,
                count(sa.id) AS total_activities,
                count(DISTINCT sa.user_id) AS unique_users,
                count(
                    CASE
                        WHEN ((sa.action)::text = 'accessed'::text) THEN 1
                        ELSE NULL::integer
                    END) AS access_count,
                max(sa.created_at) AS last_activity_at,
                count(
                    CASE
                        WHEN (sa.created_at >= (now() - '24:00:00'::interval)) THEN 1
                        ELSE NULL::integer
                    END) AS activities_24h
            FROM (files f
                LEFT JOIN system_activities sa ON ((f.id = sa.file_id)))
            GROUP BY f.id, f.file_name, f.user_id;
        ");
        
        DB::unprepared("
            CREATE OR REPLACE VIEW public.recent_activities AS
            SELECT sa.id,
                sa.user_id,
                sa.file_id,
                sa.target_user_id,
                sa.activity_type,
                sa.action,
                sa.entity_type,
                sa.entity_id,
                sa.description,
                sa.metadata,
                sa.ip_address,
                sa.user_agent,
                sa.session_id,
                sa.location_country,
                sa.location_city,
                sa.device_type,
                sa.browser,
                sa.risk_level,
                sa.requires_audit,
                sa.is_suspicious,
                sa.created_at,
                concat(u.firstname, ' ', u.lastname) AS user_name,
                u.email AS user_email,
                f.file_name,
                concat(target_user.firstname, ' ', target_user.lastname) AS target_user_name
            FROM (((system_activities sa
                JOIN users u ON ((sa.user_id = u.id)))
                LEFT JOIN files f ON ((sa.file_id = f.id)))
                LEFT JOIN users target_user ON ((sa.target_user_id = target_user.id)))
            ORDER BY sa.created_at DESC;
        ");
        
        DB::unprepared("
            CREATE OR REPLACE VIEW public.user_activity_summary AS
            SELECT u.id AS user_id,
                concat(u.firstname, ' ', u.lastname) AS name,
                u.email,
                count(sa.id) AS total_activities,
                count(
                    CASE
                        WHEN (sa.created_at >= (now() - '24:00:00'::interval)) THEN 1
                        ELSE NULL::integer
                    END) AS activities_24h,
                count(
                    CASE
                        WHEN (sa.created_at >= (now() - '7 days'::interval)) THEN 1
                        ELSE NULL::integer
                    END) AS activities_7d,
                count(
                    CASE
                        WHEN (sa.created_at >= (now() - '30 days'::interval)) THEN 1
                        ELSE NULL::integer
                    END) AS activities_30d,
                max(sa.created_at) AS last_activity_at,
                count(
                    CASE
                        WHEN (((sa.risk_level)::text = 'high'::text) OR ((sa.risk_level)::text = 'critical'::text)) THEN 1
                        ELSE NULL::integer
                    END) AS high_risk_activities
            FROM (users u
                LEFT JOIN system_activities sa ON ((u.id = sa.user_id)))
            GROUP BY u.id, u.firstname, u.lastname, u.email;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop views first
        DB::statement('DROP VIEW IF EXISTS public.file_activity_summary');
        DB::statement('DROP VIEW IF EXISTS public.recent_activities');
        DB::statement('DROP VIEW IF EXISTS public.user_activity_summary');
        
        // Drop triggers
        DB::statement('DROP TRIGGER IF EXISTS trigger_file_otp_security_updated_at ON public.file_otp_security');
        DB::statement('DROP TRIGGER IF EXISTS set_ids_from_metadata ON public.documents');
        
        // Drop functions
        DB::statement('DROP FUNCTION IF EXISTS public.update_file_otp_security_updated_at()');
        DB::statement('DROP FUNCTION IF EXISTS public.update_ids_from_metadata()');
        
        // Drop tables in reverse order of dependencies
        Schema::dropIfExists('chat_histories');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('cache_locks');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('user_payment_methods');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('subscriptions');
        Schema::dropIfExists('document_rows');
        Schema::dropIfExists('document_metadata');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('shared_file_copies');
        Schema::dropIfExists('public_shares');
        Schema::dropIfExists('arweave_urls');
        Schema::dropIfExists('file_otp_security');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('system_activities');
        Schema::dropIfExists('files');
        Schema::dropIfExists('webauthn_credentials');
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('user_sessions');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('users');
        Schema::dropIfExists('migrations');
    }
};
