import { showNotification } from './ui.js';

// --- Upload Modal ---

let currentUploadFiles = [];
let fetchedPremiumOnce = false;
let isPremiumUser = null;

async function ensurePremiumStatus() {
    if (fetchedPremiumOnce && isPremiumUser !== null) return isPremiumUser;
    try {
        // Check user premium status from user data or a simple endpoint
        const user = window.authUser || null;
        isPremiumUser = user?.is_premium || false;
    } catch (e) {
        isPremiumUser = false;
    } finally {
        fetchedPremiumOnce = true;
    }
    return isPremiumUser;
}

function applyPremiumUX() {
    const premiumCards = document.querySelectorAll('label[data-premium-option="true"]');
    const mappings = [
        { badge: 'badgeVectorize', desc: 'descVectorize', text: window.I18N.upload.aiProcess },
    ];

    if (isPremiumUser) {
        // Hide premium badges and remove "Premium required" phrasing
        mappings.forEach(({ badge, desc, text }) => {
            const b = document.getElementById(badge);
            const d = document.getElementById(desc);
            if (b) b.classList.add('hidden');
            if (d) d.textContent = text;
        });

        premiumCards.forEach(label => {
            const input = label.querySelector('input[type="radio"]');
            const card = label.querySelector('.rounded-lg');
            if (input) input.disabled = false;
            if (card) card.classList.remove('opacity-60', 'cursor-not-allowed');
        });
    } else {
        // Keep badges visible and disable selection of premium-only options
        mappings.forEach(({ badge, desc }) => {
            const b = document.getElementById(badge);
            const d = document.getElementById(desc);
            if (b) b.classList.remove('hidden');
            if (d && !/Premium required/i.test(d.textContent)) {
                // Ensure the copy indicates premium-only
                d.textContent = d.textContent + ' (Premium required)';
            }
        });

        premiumCards.forEach(label => {
            const input = label.querySelector('input[type="radio"]');
            const card = label.querySelector('.rounded-lg');
            if (input) input.disabled = true;
            if (card) card.classList.add('opacity-60', 'cursor-not-allowed');

            if (!label.dataset.listenerAttached) {
                label.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const std = document.getElementById('standardUpload');
                    if (std) std.checked = true;
                    showNotification(window.I18N.upload.subscribePremium, 'warning');
                });
                label.dataset.listenerAttached = 'true';
            }
        });
    }
}

function showUploadModal() {
    // console.log('🔵 [UPLOAD] showUploadModal called');
    
    // Close the "New" dropdown when opening upload modal
    const newDropdown = document.getElementById('newDropdown');
    if (newDropdown) {
        newDropdown.classList.add('opacity-0', 'invisible', 'translate-y-[-10px]', 'scale-95');
        newDropdown.classList.remove('opacity-100', 'visible', 'translate-y-0', 'scale-100');
        // console.log('🔵 [UPLOAD] Closed new dropdown');
    }
    
    // Clean up any leftover duplicate resolution modals
    const existingDuplicateModal = document.getElementById('duplicateResolutionModal');
    if (existingDuplicateModal) {
        existingDuplicateModal.remove();
         console.log('🔵 [UPLOAD] Removed existing duplicate modal');
    }
    
    const uploadModal = document.getElementById('uploadModal');

    
    // console.log('🔵 [UPLOAD] Modal element found, current classes:', uploadModal.className);
    // console.log('🔵 [UPLOAD] Modal has hidden class:', uploadModal.classList.contains('hidden'));
    
    uploadModal.classList.remove('hidden');
    
    // console.log('🔵 [UPLOAD] After removing hidden, classes:', uploadModal.className);
    // console.log('🔵 [UPLOAD] Modal display style:', window.getComputedStyle(uploadModal).display);
    
    // Ensure upload button is properly reset when modal opens
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    
    // If there's already a file selected, enable the button
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        if (uploadBtn) uploadBtn.disabled = false;
         console.log('🔵 [UPLOAD] Upload button enabled (files already selected)');
    } else {
        // No file selected, keep button disabled
        if (uploadBtn) uploadBtn.disabled = true;
        console.log('🔵 [UPLOAD] Upload button disabled (no files selected)');
    }
    
    // console.log('✅ [UPLOAD] Modal should now be visible');
}

function hideUploadModal() {
    // console.log('🔴 [UPLOAD] hideUploadModal called');
    const uploadModal = document.getElementById('uploadModal');
    if (!uploadModal) {
        console.error('❌ [UPLOAD] Upload modal element not found in hideUploadModal!');
        return;
    }
    
    console.log('🔴 [UPLOAD] Before hiding, classes:', uploadModal.className);
    uploadModal.classList.add('hidden');
    console.log('🔴 [UPLOAD] After hiding, classes:', uploadModal.className);
    
    resetUploadForm();
    console.log('✅ [UPLOAD] Modal hidden and form reset');
}

function resetUploadForm() {
    const fileInput = document.getElementById('fileInput');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadBtn = document.getElementById('uploadBtn');
    const dropZone = document.getElementById('dropZone');
    const processingOptions = document.getElementById('processingOptions');
    
    if (fileInput) fileInput.value = '';
    if (uploadProgress) uploadProgress.classList.add('hidden');
    if (uploadBtn) uploadBtn.disabled = true;
    if (dropZone) {
        dropZone.classList.remove('border-primary', 'ring-2', 'ring-primary/40');
        const dropZoneContent = document.getElementById('dropZoneContent');
        if (dropZoneContent) {
            dropZoneContent.innerHTML = `
                <div class="dropzone-img text-3xl mb-4">
                    <img src="/file.png" alt="File" class="opacity-50 w-12 h-12">
                </div>
                <p class="dropzone-text text-sm mb-1">${window.I18N.upload.dragDrop}</p>
                <p class="dropzone-text text-xs">${window.I18N.upload.maxFileSize}</p>
            `;
        }
    }
    if (processingOptions) {
        processingOptions.style.display = 'none';
        document.getElementById('standardUpload').checked = true;
    }
    currentUploadFiles = [];
    
    // Clear file list display
    const fileListContainer = document.getElementById('fileList');
    if (fileListContainer) {
        fileListContainer.innerHTML = '';
    }
}

function handleDragOver(e) {
    e.preventDefault();
    document.getElementById('dropZone').classList.add('border-primary', 'ring-2', 'ring-primary/40');
}

function handleDragLeave() {
    document.getElementById('dropZone').classList.remove('border-primary', 'ring-2', 'ring-primary/40');
}

function handleDrop(e) {
    e.preventDefault();
    document.getElementById('dropZone').classList.remove('border-primary', 'ring-2', 'ring-primary/40');
    const files = e.dataTransfer.files;
    if (files.length) {
        document.getElementById('fileInput').files = files;
        handleFiles(files);
    }
}

async function handleFiles(files) {
    if (files.length > 0) {
        // Define allowed file types and size limits (matching backend)
        const allowedExtensions = [
            'pdf', 'doc', 'docx', 'txt', 'rtf', 'odt',
            'xls', 'xlsx', 'csv', 'ods',
            'ppt', 'pptx', 'odp',
            'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg',
            'mp4', 'avi', 'mov', 'wmv', 'flv', 'webm',
            'mp3', 'wav', 'flac', 'aac', 'ogg',
            'zip', 'rar', '7z', 'tar', 'gz',
            'json', 'xml', 'html', 'css', 'js', 'md'
        ];
        const maxFileSize = 104857600; // 100MB in bytes

        // Validate all files
        currentUploadFiles = [];
        const rejectedFiles = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file || typeof file.size !== 'number' || !file.name) {
                console.error('Invalid file object received:', file);
                rejectedFiles.push(`${file?.name || 'Unknown'}: Invalid file object`);
                continue;
            }

            // Check file extension
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
                const msg = window.I18N.upload.rejectedType
                    .replace(':name', file.name)
                    .replace(':ext', fileExtension || 'unknown');
                rejectedFiles.push(msg);
                continue;
            }

            // Check file size
            if (file.size > maxFileSize) {
                const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
                const msg = window.I18N.upload.rejectedSize
                    .replace(':name', file.name)
                    .replace(':sizeMB', fileSizeMB);
                rejectedFiles.push(msg);
                continue;
            }

            currentUploadFiles.push(file);
        }

        // Show rejection notifications
        if (rejectedFiles.length > 0) {
            const message = rejectedFiles.length === 1 
                ? rejectedFiles[0]
                : `${rejectedFiles.length} files were rejected:\n${rejectedFiles.slice(0, 3).join('\n')}${rejectedFiles.length > 3 ? '\n...' : ''}`;
            showNotification(message, 'error');
        }
        
        if (currentUploadFiles.length === 0) {
            showNotification(window.I18N.upload.noValidFiles, 'error');
            resetUploadForm();
            return;
        }
        
        // Update drop zone to show file count
        const dropZoneContent = document.getElementById('dropZoneContent');
        if (dropZoneContent) {
            const totalSize = currentUploadFiles.reduce((sum, f) => sum + (f.size || 0), 0);
            const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
            const selectedText = window.I18N.upload.filesSelected.replace(':count', currentUploadFiles.length);
            const totalText = window.I18N.upload.totalSize.replace(':size', totalSizeMB);

            dropZoneContent.innerHTML = `
                <div class="text-3xl mb-2">📄</div>
                <p class="text-sm text-white font-medium">${selectedText}</p>
                <p class="text-xs text-gray-400">${totalText}</p>
            `;
        }
        
        // Show file list
        displayFileList(currentUploadFiles);
        
        // Show processing options and run validation (if processing UI exists)
        showProcessingOptions();
        await ensurePremiumStatus();
        applyPremiumUX();
        try { await validateProcessingOptions(currentUploadFiles[0]); } catch (_) { /* noop */ }
        document.getElementById('uploadBtn').disabled = false;
    } else {
        resetUploadForm();
    }
}

function displayFileList(files) {
    const fileListContainer = document.getElementById('fileList');
    if (!fileListContainer) return;
    
    if (files.length === 0) {
        fileListContainer.innerHTML = '';
        return;
    }
    
    const fileItems = files.map((file, index) => {
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
        return `
            <div class="flex items-center justify-between p-3 bg-[#1F2235] rounded-lg border border-[#3C3F58] mb-2">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div class="text-2xl">📄</div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm text-white truncate">${file.name}</p>
                        <p class="text-xs text-gray-400">${fileSizeMB} MB</p>
                    </div>
                </div>
                <button onclick="window.removeFileFromUpload(${index})" class="ml-2 p-1 hover:bg-[#3C3F58] rounded transition-colors" title="Remove">
                    <svg class="w-4 h-4 text-gray-400 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
    
    fileListContainer.innerHTML = `
        <div class="mt-4">
            <div class="text-sm font-medium text-gray-300 mb-2">${window.I18N.upload.filesHeader}</div>
            ${fileItems}
        </div>
    `;
}

window.removeFileFromUpload = function(index) {
    currentUploadFiles.splice(index, 1);
    
    if (currentUploadFiles.length === 0) {
        resetUploadForm();
        return;
    }
    
    // Update UI
    displayFileList(currentUploadFiles);
    
    // Update drop zone
    const dropZoneContent = document.getElementById('dropZoneContent');
    if (dropZoneContent) {
        const totalSize = currentUploadFiles.reduce((sum, f) => sum + (f.size || 0), 0);
        const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
        const selectedText = window.I18N.upload.filesSelected.replace(':count', currentUploadFiles.length);
        const totalText = window.I18N.upload.totalSize.replace(':size', totalSizeMB);
        dropZoneContent.innerHTML = `
            <div class="text-3xl mb-2">📄</div>
            <p class="text-sm text-white font-medium">${selectedText}</p>
            <p class="text-xs text-gray-400">${totalText}</p>
        `;
    }
}

async function handleUpload() {
    if (!currentUploadFiles || currentUploadFiles.length === 0) {
        showNotification(window.I18N.upload.noFilesSelected, 'error');
        return;
    }
    
    // Validate all files
    for (const file of currentUploadFiles) {
        if (!file.name || file.size === undefined) {
            console.error('Invalid file object:', file);
            showNotification(window.I18N.upload.invalidFiles, 'error');
            return;
        }
    }

    // Check storage before upload (total size)
    const totalSize = currentUploadFiles.reduce((sum, f) => sum + (f.size || 0), 0);
    if (window.storageManager && totalSize > 0) {
        const storageCheck = window.storageManager.checkStorageBeforeUpload(totalSize);
        if (!storageCheck.allowed) {
            showNotification(storageCheck.message, 'error');
            if (storageCheck.showUpgrade) {
                setTimeout(() => {
                    window.storageManager.showUpgradeModal();
                }, 1000);
            }
            return;
        }
    }

    // For multiple files, skip duplicate check and proceed directly
    // (Duplicate handling will be done per-file during upload)
    await proceedWithMultipleUploads();
}

async function proceedWithMultipleUploads() {
    const uploadBtn = document.getElementById('uploadBtn');
    const progressContainer = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const processingType = document.querySelector('input[name="processingType"]:checked')?.value || 'standard';

    uploadBtn.disabled = true;
    progressContainer.classList.remove('hidden');

    const totalFiles = currentUploadFiles.length;
    let successCount = 0;
    let failCount = 0;
    const errors = [];

    try {
        for (let i = 0; i < currentUploadFiles.length; i++) {
            const file = currentUploadFiles[i];
            const fileNumber = i + 1;
            
            // Update progress text to show current file
            progressPercentage.textContent = `Uploading ${fileNumber}/${totalFiles}: ${file.name}`;
            
            try {
                const onProgress = (event) => {
                    const fileProgress = Math.round((event.loaded * 100) / event.total);
                    const overallProgress = Math.round(((i + (fileProgress / 100)) / totalFiles) * 100);
                    progressBar.style.width = overallProgress + '%';
                };

                let uploadResult;
                
                // Route to different upload endpoints based on processing type
                switch (processingType) {
                    case 'standard':
                        uploadResult = await handleStandardUploadSingle(file, onProgress);
                        break;
                    case 'vectorize':
                        uploadResult = await handleAiVectorizeUploadSingle(file, onProgress);
                        break;
                    default:
                        uploadResult = await handleStandardUploadSingle(file, onProgress);
                }
                
                successCount++;
            } catch (error) {
                console.error(`Failed to upload ${file.name}:`, error);
                failCount++;
                errors.push(`${file.name}: ${error.message}`);
            }
        }

        // Show summary notification
        if (successCount === totalFiles) {
            const msg = window.I18N.upload.successAll.replace(':count', totalFiles);
            showNotification(msg, 'success');
        } else if (successCount > 0) {
            const msg = window.I18N.upload.partialSuccess
                .replace(':success', successCount)
                .replace(':total', totalFiles)
                .replace(':failed', failCount);
            showNotification(msg, 'warning');
            if (errors.length > 0) {
                console.error('Upload errors:', errors);
                // Show the first specific error message
                const firstError = errors[0];
                if (firstError.includes('File type') || firstError.includes('File size')) {
                    showNotification(firstError, 'error');
                }
            }
        } else {
            showNotification(window.I18N.upload.allFailed, 'error');
        }
        
        hideUploadModal();
        
        // Trigger storage usage update
        const totalSize = currentUploadFiles.reduce((sum, f) => sum + (f.size || 0), 0);
        document.dispatchEvent(new CustomEvent('fileUploaded', { 
            detail: { fileSize: totalSize } 
        }));
        
        // Refresh file list
        const currentView = window.getCurrentViewContext ? window.getCurrentViewContext() : 'documents';
        if (currentView === 'documents' && typeof window.loadUserFiles === 'function') {
            const parentId = document.getElementById('currentFolderId')?.value || null;
            window.loadUserFiles('', 1, parentId);
        } else if (currentView === 'trash' && typeof window.loadTrashItems === 'function') {
            window.loadTrashItems();
        } else if (currentView === 'blockchain' && typeof window.loadBlockchainItems === 'function') {
            window.loadBlockchainItems();
        }
    } catch (error) {
        console.error('Upload process failed:', error);
        showNotification(`Upload failed: ${error.message}`, 'error');
        uploadBtn.disabled = false;
    }
}

// Separate upload handlers for different processing types

async function handleStandardUploadSingle(file, onProgress) {
    if (!file) {
        throw new Error('No file provided for upload');
    }
    
    const filePath = await window.uploadFileToSupabase(file, onProgress);
    
    const currentFolderIdEl = document.getElementById('currentFolderId');
    let parentId = normalizeParentId(currentFolderIdEl?.value);

    const payload = {
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        file_type: 'file',
        mime_type: file.type || 'application/octet-stream',
        parent_id: parentId,
        replace_existing: false
    };

    const response = await fetch('/files/upload/standard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Standard upload failed');
    }
    
    return result;
}


async function handleAiVectorizeUploadSingle(file, onProgress) {
    if (!file) {
        throw new Error('No file provided for upload');
    }
    
    const filePath = await window.uploadFileToSupabase(file, onProgress);
    
    const currentFolderIdEl = document.getElementById('currentFolderId');
    let parentId = normalizeParentId(currentFolderIdEl?.value);

    const payload = {
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        file_type: 'file',
        mime_type: file.type || 'application/octet-stream',
        parent_id: parentId,
        replace_existing: false
    };

    const response = await fetch('/files/upload/ai-vectorize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'AI vectorize upload failed');
    }
    
    return result;
}


// Helper functions
function normalizeParentId(parentId) {
    if (parentId === 'null' || parentId === '' || parentId === 'undefined') {
        return null;
    } else if (parentId !== null) {
        const parsed = parseInt(parentId, 10);
        if (!isNaN(parsed)) {
            return parsed;
        } else {
            return null;
        }
    }
    return null;
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remove data:mime/type;base64, prefix
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });
}

function simulateProgress(onProgress) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        onProgress({ loaded: progress, total: 100 });
    }, 200);
}

// Legacy function for backward compatibility
async function saveFileMetadata(file, filePath, processingType = 'standard') {
    const currentFolderIdEl = document.getElementById('currentFolderId');
    let parentId = normalizeParentId(currentFolderIdEl?.value);

    const payload = {
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        file_type: 'file',
        mime_type: file.type || 'application/octet-stream',
        parent_id: parentId,
        is_folder: false,
        processing_type: processingType
    };

    console.log('Saving file metadata:', payload);

    try {
        const response = await fetch('/files/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();
        console.log('Server response:', response.status, responseText);

        if (!response.ok) {
            let errorData;
            try {
                errorData = JSON.parse(responseText);
            } catch (e) {
                errorData = { message: responseText || 'Unknown server error' };
            }
            throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        const result = JSON.parse(responseText);
        console.log('File metadata saved successfully:', result);
        return result;

    } catch (error) {
        console.error('Failed to save file metadata:', error);
        throw error; // Re-throw to be caught by handleUpload
    }
}

// Processing Options Functions
function showProcessingOptions() {
    const processingOptions = document.getElementById('processingOptions');
    if (processingOptions) {
        processingOptions.style.display = 'block';
    }
}

async function validateProcessingOptions(file) {
    const vectorizeRadio = document.getElementById('vectorizeUpload');
    const validationDiv = document.getElementById('processingValidation');

    // If the processing options UI isn't present on this page, skip validation gracefully
    if (!vectorizeRadio && !validationDiv) {
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) uploadBtn.disabled = false;
        return;
    }

    // Add event listeners for validation on change
    document.querySelectorAll('input[name="processingType"]').forEach(radio => {
        radio.addEventListener('change', () => validateSelectedOption(file));
    });

    // Initial validation
    await validateSelectedOption(file);
}

async function validateSelectedOption(file) {
    const selectedType = document.querySelector('input[name="processingType"]:checked')?.value;
    const validationDiv = document.getElementById('processingValidation');
    const uploadBtn = document.getElementById('uploadBtn');
    
    // If no validation UI exists, just allow upload
    if (!validationDiv) {
        if (uploadBtn) uploadBtn.disabled = false;
        return;
    }

    if (!selectedType || selectedType === 'standard') {
        validationDiv.classList.add('hidden');
        if (uploadBtn) uploadBtn.disabled = false;
        return;
    }

    // Show validation for premium features
    validationDiv.classList.remove('hidden');
    validationDiv.innerHTML = '<div class="text-yellow-400">Validating...</div>';

    try {
        const validationResults = await validatePremiumProcessing(file, selectedType);
        displayValidationResults(validationResults, selectedType);
        
        // Enable/disable upload button based on validation
        if (uploadBtn) uploadBtn.disabled = !validationResults.canProceed;
    } catch (error) {
        validationDiv.innerHTML = `<div class="text-red-400">Validation failed: ${error.message}</div>`;
        if (uploadBtn) uploadBtn.disabled = true;
    }
}

async function validatePremiumProcessing(file, processingType) {
    const results = {
        canProceed: false,
        errors: [],
        warnings: [],
        info: []
    };

    // Check user premium status
    try {
        const isPremium = await ensurePremiumStatus();

        // Validate based on processing type
        // Blockchain validation removed - use permanent storage modal instead

        if (processingType === 'vectorize' || processingType === 'hybrid') {
            if (!isPremium) {
                results.errors.push(window.I18N.upload.valPremiumReq);
            } else {
                results.info.push(window.I18N.upload.valAiInfo);
            }
        }

        // Check file type support - supported types for AI vectorization
        const supportedTypes = [
            'pdf', 'doc', 'docx', 'txt', 'rtf', 'odt',
            'xls', 'xlsx', 'csv', 'ods',
            'ppt', 'pptx', 'odp',
            'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp',
            'mp4', 'avi', 'mov', 'wmv', 'flv', 'webm',
            'mp3', 'wav', 'flac', 'aac', 'ogg',
            'json', 'xml', 'html', 'md'
        ];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        
        if (supportedTypes.length > 0 && !supportedTypes.includes(fileExtension)) {
            const msg = window.I18N.upload.valTypeWarn.replace(':ext', fileExtension || 'unknown');
            results.warnings.push(msg);
        }

        results.canProceed = results.errors.length === 0;
        return results;

    } catch (error) {
        console.error('Validation error:', error);
        results.errors.push('Validation service unavailable');
        return results;
    }
}

function displayValidationResults(results, processingType) {
    const validationDiv = document.getElementById('processingValidation');
    if (!validationDiv) return;
    let html = '';

    if (results.errors.length > 0) {
        html += `
            <div class="bg-red-900/30 border border-red-600 rounded p-3 mb-2">
                <div class="font-medium text-red-300 mb-1">❌ ${window.I18N.upload.valCannotProceed}</div>
                <ul class="text-sm text-red-200 space-y-1">
                    ${results.errors.map(error => `<li>• ${error}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (results.warnings.length > 0) {
        html += `
            <div class="bg-yellow-900/30 border border-yellow-600 rounded p-3 mb-2">
                <div class="font-medium text-yellow-300 mb-1">⚠️ ${window.I18N.upload.valWarnings}</div>
                <ul class="text-sm text-yellow-200 space-y-1">
                    ${results.warnings.map(warning => `<li>• ${warning}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (results.info.length > 0) {
        html += `
            <div class="bg-blue-900/30 border border-blue-600 rounded p-3 mb-2">
                <div class="font-medium text-blue-300 mb-1">ℹ️ ${window.I18N.upload.valDetails}</div>
                <ul class="text-sm text-blue-200 space-y-1">
                    ${results.info.map(info => `<li>• ${info}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (results.canProceed && results.errors.length === 0) {
        const readyMsg = window.I18N.upload.valPassed.replace(':type', processingType);
        html += `
            <div class="bg-green-900/30 border border-green-600 rounded p-3">
                <div class="font-medium text-green-300">✅ ${window.I18N.upload.valReady}</div>
                <div class="text-sm text-green-200 mt-1">${readyMsg}</div>
            </div>
        `;
    }

    validationDiv.innerHTML = html;
}

function formatFileSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
}

// Duplicate file checking and resolution
async function checkForDuplicate(fileName, parentId) {
    const response = await fetch('/files/check-duplicate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            file_name: fileName,
            parent_id: parentId
        })
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Duplicate check failed');
    }

    return result;
}

function showDuplicateResolutionModal(duplicateInfo, onProceed) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'duplicateResolutionModal';
    modalOverlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]';
    
    const existingFile = duplicateInfo.existing_file;
    const suggestedName = duplicateInfo.suggested_name;
    
    const desc = window.I18N.upload.dupDesc.replace(':name', existingFile.name);
    const keepDesc = window.I18N.upload.dupKeepDesc.replace(':name', suggestedName);

    modalOverlay.innerHTML = `
        <div class="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-gray-700">
            <div class="p-6">
                <h3 class="text-xl font-semibold text-white mb-4">${window.I18N.upload.dupTitle}</h3>
                <p class="text-gray-300 mb-6">${desc}</p>
                
                <div class="bg-gray-900/50 rounded-lg p-3 mb-6 border border-gray-700">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-400">${window.I18N.upload.dupExisting}</span>
                        <span class="text-gray-300">${formatFileSize(existingFile.size)}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm mt-1">
                        <span class="text-gray-400">${window.I18N.upload.dupModified}</span>
                        <span class="text-gray-300">${existingFile.updated_at}</span>
                    </div>
                </div>
                
                <div class="space-y-3 mb-6">
                    <label class="flex items-center p-4 bg-gray-900/30 rounded-lg border-2 border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
                        <input type="radio" name="duplicateAction" value="replace" checked class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500">
                        <div class="ml-3">
                            <div class="text-white font-medium">${window.I18N.upload.dupReplace}</div>
                            <div class="text-sm text-gray-400">${window.I18N.upload.dupReplaceDesc}</div>
                        </div>
                    </label>
                    
                    <label class="flex items-center p-4 bg-gray-900/30 rounded-lg border-2 border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
                        <input type="radio" name="duplicateAction" value="keep" class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500">
                        <div class="ml-3">
                            <div class="text-white font-medium">${window.I18N.upload.dupKeep}</div>
                            <div class="text-sm text-gray-400">${keepDesc}</div>
                        </div>
                    </label>
                </div>
                
                <div class="flex gap-3">
                    <button id="duplicateCancelBtn" class="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        ${window.I18N.upload.cancel}
                    </button>
                    <button id="duplicateUploadBtn" class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                        ${window.I18N.upload.upload}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Event listeners
    const cancelBtn = modalOverlay.querySelector('#duplicateCancelBtn');
    const uploadBtn = modalOverlay.querySelector('#duplicateUploadBtn');
    
    const cleanup = () => {
        modalOverlay.remove();
    };
    
    cancelBtn.addEventListener('click', () => {
        cleanup();
        hideUploadModal(); // Also close the upload modal when cancelling
    });
    
    uploadBtn.addEventListener('click', () => {
        const selectedAction = modalOverlay.querySelector('input[name="duplicateAction"]:checked').value;
        const replaceExisting = selectedAction === 'replace';
        
        cleanup();
        proceedWithUpload(replaceExisting);
    });
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            cleanup();
            hideUploadModal(); // Also close the upload modal
        }
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            cleanup();
            hideUploadModal(); // Also close the upload modal
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

export function initializeUploadModal() {
    const uploadModal = document.getElementById('uploadModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');

    if (!uploadModal) return;

    // Event Listeners
    closeModalBtn.addEventListener('click', hideUploadModal);
    cancelUploadBtn?.addEventListener('click', hideUploadModal);
    
    // Close modal when clicking on backdrop
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            console.log('🔴 [UPLOAD] Backdrop clicked');
            e.stopPropagation();
            hideUploadModal();
        });
        console.log('✅ [UPLOAD] Backdrop click listener attached');
    } else {
        console.warn('⚠️ [UPLOAD] Modal backdrop not found');
    }
    
    // Also close when clicking outside the modal content
    uploadModal.addEventListener('click', (e) => {
        // Only close if clicking directly on the modal container (not its children)
        if (e.target === uploadModal) {
            console.log('🔴 [UPLOAD] Modal container clicked (outside content)');
            hideUploadModal();
        }
    });
    console.log('✅ [UPLOAD] Modal container click listener attached');
    
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        console.log('File input changed:', e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        } else {
            console.warn('No files selected or invalid file input');
            resetUploadForm();
        }
    });
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    uploadBtn.addEventListener('click', handleUpload);

    // Expose functions globally for testing
    window.initializeUploadModal = initializeUploadModal;
    window.handleUpload = handleUpload;
    window.showUploadModal = showUploadModal;
    
    console.log('✅ [UPLOAD] Upload modal initialization complete');
    console.log('✅ [UPLOAD] window.showUploadModal is available:', typeof window.showUploadModal === 'function');
}
