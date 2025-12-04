@extends('layouts.app')

@section('content')
<div class = "hidden" data-page="user-dashboard"></div>


<header class="col-span-2 flex items-center px-4 bg-[#141326] z-10 h-18">
    <div style="margin-bottom: 13px;" class="ml-4 flex items-center space-x-3 mr-10">
        <img src="{{ asset('logo-white.png') }}" alt="SecureDocs logo" class="w-8 h-8" style="margin-top:20px;">
        <div style="padding-right: 30px;" class="flex flex-col relative">
            <div class="text-white text-l font-bold">SECURE<span class="text-[#f89c00]">DOCS</span></div>
            <div class="absolute top-full text-xs text-gray-400">
                {{ auth()->user()->is_premium ? __('auth.db_premium') : __('auth.db_standard') }}
            </div>
        </div>
    </div>

    <div style="margin-left: -5px; outline: none;" class="flex-grow max-w-[720px] relative pl-6 flex items-center gap-2">
        <div class="relative flex-1">
            <img src="{{ asset('magnifying-glass.png') }}" class="absolute top-1/2 -translate-y-1/2 w-4 h-4" style="left: 18px;">
            <input type="text" id="mainSearchInput" placeholder="{{ __('auth.db_search') }}"
                class="w-full py-3 pl-12 pr-12 mt-4 mb-4 rounded-full border-none bg-[#3C3F58] text-base text-white focus:outline-none focus:shadow-md"
                style="color: white; outline: none; padding-right: 20px;"
                onfocus="this.style.setProperty('--placeholder-opacity', '0.5');"
                onblur="this.style.setProperty('--placeholder-opacity', '0.5');">
        </div>
        <button id="advanced-search-button" 
                class="mt-4 mb-4 px-4 py-3 bg-[#3C3F58] hover:bg-[#55597C] text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2"
                title="Advanced Search">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            <span>Advanced</span>
        </button>
    </div>

    <div class="flex items-center ml-auto gap-4">
        <!-- Bundlr Wallet Widget (Premium Only) -->
        @if(auth()->user()->is_premium)
        <div class="relative">
            <button id="bundlrWalletBtn" 
                    class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition" 
                    style="background-color: #3C3F58;"
                    title="Bundlr Wallet"
                    onmouseover="this.style.filter='brightness(1.1)';"
                    onmouseout="this.style.filter='';">
                <img src="{{ asset('Bundlr-1.png') }}" alt="Bundlr Wallet" style="margin-left: -1px;" class="w-5 h-5 object-contain">
            </button>
            
            <!-- Bundlr Wallet Dropdown -->
            <div id="bundlrWalletDropdown" class="absolute p-2 right-0 mt-3 bg-[#3C3F58] text-gray-100 rounded-xl shadow-xl z-50 opacity-0 invisible translate-y-[-10px] transition-all duration-200" style="width: 330px;">
                <div class="px-4 py-3 pt-4 pb-4">
                    <div class="flex items-center justify-between"> <div> <div class="text-sm font-medium">{{ __('auth.db_wallet_header') }}</div>
                        <div class="text-xs text-gray-400" id="walletStatus">{{ __('auth.db_wallet_initialize_connect') }}</div> </div>
                        <button id="initializeBundlrBtn" class="px-3 pt-2 pb-2 py-1.5 bg-[#f89c00] hover:brightness-110 text-black font-semibold rounded-full text-sm transition-all duration-200">          
                            {{ __('auth.db_wallet_initialize') }}
                        </button>
                    </div>
                </div>
                <div class="border-b border-[#55597C] ml-4 mr-4"></div>
                <div class="px-4 py-3 ">
                    <div class="flex items-center justify-between">
                        <span class="text-sm">{{ __('auth.db_wallet_balance') }}</span>
                        <span id="walletBalanceDetail" class="text-sm font-semibold" style="color: #4AD991;">-- MATIC</span>
                    </div>
                </div>
                <div class="border-t border-[#55597C] ml-4 mr-4"></div>
                <div class="p-4 space-y-3">
                    <div class="space-y-2">
                        <div class="text-xs text-gray-400 mb-2">
                            {{ __('auth.db_wallet_need_matic') }}
                        </div>
                        <div class="flex gap-2 mt-1">
                        <select id="fundAmountSelect" class="flex-1 pl-3 pr-8 py-2 bg-[#55597C] rounded-full text-sm border-none appearance-none bg-no-repeat" onchange="handleFundAmountChange()" style="background-image: url('{{ asset('caret-down.png') }}');
                        background-position: right 1rem center; background-size: 0.5rem;">
                                <option value="0.01">0.01 MATIC</option>
                                <option value="0.05">0.05 MATIC</option>
                                <option value="0.1">0.1 MATIC</option>
                                <option value="0.5">0.5 MATIC</option>
                                <option value="1">1 MATIC</option>
                                <option value="custom">{{ __('auth.db_wallet_custom') }}</option>
                            </select>
                            <button id="fundBundlrBtn" style="background-color: #4AD991;
                            color:black;" class="px-6 py-2 hover:brightness-110 rounded-full text-sm font-semibold transition-all duration-200" disabled>
                                {{ __('auth.db_wallet_fund') }}
                            </button>
                        </div>
                        <div id="customAmountContainer" class="hidden pt-2">
                            <input type="number" 
                                   id="customAmountInput" 
                                   placeholder="{{ __('auth.db_wallet_enter_amount') }}" 
                                   min="0.001" 
                                   max="100" 
                                   step="0.001"
                                   class="w-full px-3 py-2 bg-[#3C3F58] border border-[#55597C] rounded text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none">
                        </div>
                        <div class="pt-2 brightness-100 transition-all duration-200">
                            <button id="refreshBalanceBtn" class="w-full px-3 py-2 bg-[#3C3F58] text-white font-semibold border-2 border-[#55597C] hover:brightness-110 hover:bg-[#55597C] rounded-full text-sm transition-all duration-200">
                                {{ __('auth.db_wallet_refresh') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif

        <div id="notification-localization-data" 
            class="hidden" 
            data-loading="{{ __('auth.db_loading') }}"
            data-no-notifications="{{ __('auth.msg_no_notifications') }}"
            data-time-just-now="{{ __('auth.time_just_now') }}"
            data-time-ago-m="{{ __('auth.time_ago_m') }}"
            data-time-ago-h="{{ __('auth.time_ago_h') }}"
            data-time-ago-d="{{ __('auth.time_ago_d') }}"
            data-delete-all-confirm="{{ __('auth.msg_delete_all_confirm') }}"
            data-all-deleted="{{ __('auth.msg_all_deleted') }}"
            data-delete-failed="{{ __('auth.msg_delete_failed') }}"
            data-load-failed="{{ __('auth.msg_load_notif_failed') }}"
        ></div>

        <script>
            const notifLocalData = document.getElementById('notification-localization-data');
            if (notifLocalData) {
                window.I18N = window.I18N || {};
                window.I18N.notifications = {
                    loading: notifLocalData.getAttribute('data-loading'),
                    noNotifications: notifLocalData.getAttribute('data-no-notifications'),
                    timeJustNow: notifLocalData.getAttribute('data-time-just-now'),
                    timeAgoM: notifLocalData.getAttribute('data-time-ago-m'),
                    timeAgoH: notifLocalData.getAttribute('data-time-ago-h'),
                    timeAgoD: notifLocalData.getAttribute('data-time-ago-d'),
                    deleteAllConfirm: notifLocalData.getAttribute('data-delete-all-confirm'),
                    allDeleted: notifLocalData.getAttribute('data-all-deleted'),
                    deleteFailed: notifLocalData.getAttribute('data-delete-failed'),
                    loadFailed: notifLocalData.getAttribute('data-load-failed'),
                };
            }
        </script>
        
        <div class="relative">
            <button id="notificationBell" class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3C3F58] transition-colors" title="Notifications" aria-label="Notifications">
            <img src="{{ asset('notifications.png') }}" alt="Notifications" class="w-6 h-6 object-contain">
            </button>
            <span id="notificationBadge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full">0</span>
            
            <div id="notificationDropdown" style="width: 400px;" class="absolute right-0 mt-3 w-80 bg-[#3C3F58] text-gray-100 rounded-lg shadow-xl z-50 opacity-0 invisible translate-y-[-10px] transition-all duration-200">    
                <div class="px-4 py-3 border-b border-gray-900/50 flex items-center justify-between">
                    <div class="text-sm font-medium">{{ __('auth.db_notifications') }}</div>
                    <button id="markAllRead" class="text-xs px-2 py-1 rounded bg-[#3C3F58] hover:brightness-110 transition-transform">{{ __('auth.db_mark_all_read') }}</button>
                </div>
                <div id="notificationsList" class="max-h-80 overflow-auto">
                    <div class="p-4 text-center text-gray-400">{{ __('auth.db_loading') }}</div>
                </div>
                <div class="px-4 py-2 border-t border-gray-900/50 flex items-center justify-between">
                    <button id="deleteAllNotifications" class="text-xs px-3 py-1 rounded-full text-red-400 hover:bg-red-600 hover:text-white transition-all" title="{{ __('auth.db_clear_all') }}">
                        {{ __('auth.db_clear_all') }}
                    </button>
                    <a id="viewAllNotifications" href="#" class="text-xs px-3 py-1 rounded-lg text-white hover:bg-[#55597C] transition-colors">{{ __('auth.db_expand') }}</a>
                </div>
            </div>
        </div>
        
        <div class="relative inline-block mr-2">
            <div id="userProfileBtn"
                class="w-10 h-10 rounded-full flex items-center justify-center text-xl mr-2 cursor-pointer transition"
                style="background-color: #3C3F58;"
                onmouseover="this.style.filter='brightness(1.1)';"
                onmouseout="this.style.filter='';">
                <img src="{{ asset('user-shape.png') }}" alt="Profile" class="w-6 h-6 object-contain">
            </div>
            <div id="profileDropdown" 
                class="absolute top-[54px] right-0 w-[280px] bg-[#3C3F58] text-white rounded-lg shadow-lg z-50 overflow-hidden opacity-0 invisible translate-y-[-10px] transition-all duration-200">
                <div class="p-4 border-border-color flex items-center">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl mr-4 cursor-pointer transition"
                        style="background-color: #55597C;">
                        <img src="{{ asset('user-shape.png') }}" alt="Profile" class="w-6 h-6 object-contain">
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-base font-medium mb-1">{{ Str::limit(Auth::user()->name, 20) }}</div>
                        <div style="font-size: 12px;" class="text-sm text-gray-400">{{ Str::limit(Auth::user()->email, 25) }}</div>
                    </div>
                </div>
                <ul class="list-none">
                    <li class="h-px bg-gray-600 my-1 ml-4 mr-4" style="background-color: #55597C;"></li>
                    <li>
                        <a href="{{ route('profile.show') }}"
                        class="p-4 flex items-center cursor-pointer"
                        style="transition: background-color 0.2s;"
                        onmouseover="this.style.backgroundColor='#55597C';"
                        onmouseout="this.style.backgroundColor='';">
                        <img src="/user-shape.png" class="mr-4 w-4 h-4 ml-1" alt="Profile Settings">
                        <span class="text-sm">{{ __('auth.db_profile_settings') }}</span>
                        </a>
                    </li>


                    <li>
                        <a href="{{ route('webauthn.index') }}"
                        class="p-4 flex items-center cursor-pointer"
                        style="transition: background-color 0.2s;"
                        onmouseover="this.style.backgroundColor='#55597C';"
                        onmouseout="this.style.backgroundColor='';">
                        <img src="/fingerprint.png" class="mr-4 w-4 h-4 ml-1" alt="Biometric Login">
                        <span class="text-sm">{{ __('auth.db_biometrics') }}</span>
                        </a>
                    </li>

                    <li>
                        <a href="{{ route('profile.sessions') }}"
                        class="p-4 flex items-center cursor-pointer"
                        style="transition: background-color 0.2s;"
                        onmouseover="this.style.backgroundColor='#55597C';"
                        onmouseout="this.style.backgroundColor='';">
                        <img src="/shield.png" class="mr-4 w-4 h-4 ml-1" alt="Account Security">
                        <span class="text-sm">{{ __('auth.db_account_security') }}</span>
                        </a>
                    </li>
                    <li class="h-px my-1 ml-4 mr-4" style="background-color: #55597C;"></li>
                    <!-- <li class="h-px bg-border-color my-1"></li> -->
                    <!-- ======================================= -->
                    <!-- OPTION 2: DROPDOWN TO THE LEFT SIDE -->
                    <li class="relative"> 
                        <div id="headerLanguageToggle2" 
                        class="p-4 flex items-center justify-between cursor-pointer" 
                        style="transition: background-color 0.2s;" 
                        onmouseover="this.style.backgroundColor='#55597C';" 
                        onmouseout="this.style.backgroundColor='';"> 
                            <div class="flex items-center"> 
                                <svg class="mr-4 w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                                </svg>
                                <span class="text-sm">{{ __('auth.db_language') }}</span> 
                            </div> 
                            <!-- Image arrow positioned at the right -->
                            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="w-2 h-2 mr-2 transition-transform duration-200" id="langCaret"> 
                        </div> 
                        
                        <!-- Updated submenu with conditional hover effects -->
                        <div id="headerLanguageSubmenu2" style="background-color: #3c3f58; border: 3px solid #1F1F33" class="absolute right-0 mr-4 top-full mt-2 w-[140px] rounded-lg shadow-xl overflow-hidden transition-all duration-200 opacity-0 invisible pointer-events-none translate-y-[-10px] z-40"> 
                            <a href="{{ route('language.switch', 'en') }}"  
                            class="flex items-center px-4 py-3 text-sm transition-colors {{ app()->getLocale() == 'en' ? 'bg-[#f89c00] text-black font-bold' : 'text-white' }}"
                            @if(app()->getLocale() != 'en')
                                onmouseover="this.style.backgroundColor='#55597C';"
                                onmouseout="this.style.backgroundColor='';"
                            @endif> 
                                <span class="mr-2">🇺🇸</span> 
                                English 
                            </a> 
                            <a href="{{ route('language.switch', 'fil') }}"  
                            class="flex items-center px-4 py-3 text-sm transition-colors {{ app()->getLocale() == 'fil' ? 'bg-[#f89c00] text-black font-bold' : 'text-white' }}"
                            @if(app()->getLocale() != 'fil')
                                onmouseover="this.style.backgroundColor='#55597C';"
                                onmouseout="this.style.backgroundColor='';"
                            @endif> 
                                <span class="mr-2">🇵🇭</span> 
                                Filipino 
                            </a>
                            <a href="{{ route('language.switch', 'ceb') }}"
                            class="flex items-center px-4 py-3 text-sm transition-colors {{ app()->getLocale() == 'ceb' ? 'bg-[#f89c00] text-black font-bold' : 'text-white' }}"
                            @if(app()->getLocale() != 'ceb')
                                style="transition: background-color 0.2s;"
                                onmouseover="this.style.backgroundColor='#55597C';"
                                onmouseout="this.style.backgroundColor='';"
                            @endif>
                                <span class="mr-2">🇵🇭</span>
                                Cebuano
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="{{ route('profile.faq') }} " 
                        class="p-4 flex items-center cursor-pointer"
                        style="transition: background-color 0.2s;"
                        onmouseover="this.style.backgroundColor='#55597C';"
                        onmouseout="this.style.backgroundColor='';">
                        <img src="/info.png" class="mr-4 w-4 h-4 ml-1" alt="Security & Privacy">
                        <span class="text-sm">{{ __('auth.db_help_support') }}</span>
                        </a>
                    </li>
                    <!--
                    <li class="p-4 flex items-center cursor-pointer"
                        style="transition: background-color 0.2s;"
                        onmouseover="this.style.backgroundColor='#55597C';"
                        onmouseout="this.style.backgroundColor='';">
                        <img src="/pencil.png" class="mr-4 w-4 h-4 ml-1" alt="Security & Privacy">
                        <span class="text-sm">{{ __('auth.db_send_feedback') }}</span>
                    </li>
                    <li class="h-px bg-gray-600 my-1 ml-4 mr-4"></li>
                    -->
                    <li class="h-px bg-gray-600 my-1 ml-4 mr-4" style="background-color: #55597C;"></li>
                    <li>
                        <a href="{{ route('premium.upgrade') }}" 
                        class="p-4 flex items-center cursor-pointer"
                        style="transition: background-color 0.2s;"
                        onmouseover="this.style.backgroundColor='#55597C';"
                        onmouseout="this.style.backgroundColor='';">
                        <img src="/crown.png" class="mr-4 w-4 h-4 ml-1" alt="Premium Upgrade">
                        <span class="text-sm">{{ __('auth.db_buy_premium') }}</span>
                        </a>
                    </li>
                    <li class="h-px ml-4 mr-4" style="background-color: #55597C;"></li>
                </ul>
                <div class="pt-2 mt-2 text-center">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit"
                            class="bg-[#f89c00] px-8 text-black font-bold py-2 rounded-full cursor-pointer hover:brightness-110 transition">{{ __('auth.db_logout') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</header>
<body>



<div id="overlay" class="fixed inset-0 bg-transparent z-[5] hidden"></div>

<div id="uploadModal" class="fixed inset-0 z-50 flex  items-center justify-center hidden text-white z-[1001]">
<div style="background-color: #141326; opacity: 0.8;" class="fixed inset-0 transition-opacity" id="modalBackdropStatic"></div>
<div style="background-color: #24243B; width: 600px;" class="rounded-lg shadow-xl w-full relative z-10 transform transition-all flex flex-col max-h-[90vh] overflow-hidden">
    
    <div class="flex items-center justify-between p-6 pb-0 flex-none z-20">
        <h3 class="text-xl font-medium text-white text-text-main">{{ __('auth.db_upload_new_file') }}</h3>
        <button id="closeModalBtn" class="close-button text-text-secondary hover:text-white text-2xl focus:outline-none">
            <img src="/close.png" class="mr-2 w-3 h-3" alt="Close">
        </button>
    </div>

    <div class="p-6 overflow-y-auto flex-1">
        
        <div class="space-y-6">
            <div id="dropZone" style="border-width: 3px;"
                class="dropzone-border border-dashed rounded-lg p-8 text-center cursor-pointer">
                <div id="dropZoneContent" class="flex flex-col items-center">
                    <div class="dropzone-img text-3xl mb-4">
                        <img src="/file.png" alt="File" class="opacity-50 w-12 h-12">
                    </div>
                    <p class="dropzone-text text-sm mb-1">{{ __('auth.db_drag_drop') }}</p>
                    <p class="dropzone-text text-xs">{{ __('auth.db_max_file_size') }}</p>
                </div>
                <input type="file" id="fileInput" class="hidden" multiple>
            </div>

            <div id="fileList"></div>
            
            <div id="processingOptions" class="space-y-4" style="display: none;">
                <div class="text-sm font-medium">{{ __('auth.db_processing_options') }}</div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label class="cursor-pointer block">
                        <div class="rounded-lg border border-[#3C3F58] bg-[#1F2235] p-3 flex items-start gap-3">
                            <input id="standardUpload" type="radio" name="processingType" value="standard" class="mt-1" checked>
                            <div>
                                <div class="text-sm text-white font-medium">{{ __('auth.db_standard_upload') }}</div>
                                <div class="text-xs text-gray-400">{{ __('auth.db_store_supabase') }}</div>
                            </div>
                        </div>
                    </label>

                    <label class="cursor-pointer block" data-premium-option="true">
                        <div class="rounded-lg border border-[#3C3F58] bg-[#1F2235] p-3 flex items-start gap-3 @if(!auth()->user()->is_premium) opacity-60 cursor-not-allowed @else hover:border-[#f89c00] @endif" 
                             @if(!auth()->user()->is_premium) onclick="showPremiumUpgradeModal('ai')" @endif>
                            <input id="vectorizeUpload" type="radio" name="processingType" value="vectorize" class="mt-1" @if(!auth()->user()->is_premium) disabled @endif>
                            <div>
                                <div class="text-sm text-white font-medium flex items-center gap-2">
                                    {{ __('auth.db_ai_vectorize') }}
                                    @if(!auth()->user()->is_premium)
                                        <span id="badgeVectorize" class="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">PREMIUM</span>
                                    @endif
                                </div>
                                <div id="descVectorize" class="text-xs text-gray-400">
                                    @if(auth()->user()->is_premium)
                                        {{ __('auth.db_ai_process') }}
                                    @else
                                        {{ __('auth.db_ai_process_premium') }}
                                    @endif
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
                <div id="processingValidation" class="hidden mt-2"></div>
            </div>
            
            <div id="uploadProgress" class="hidden">
                <div class="flex justify-between text-sm mb-1">
                    <span>{{ __('auth.db_uploading') }}</span>
                    <span id="progressPercentage">0%</span>
                </div>
                <div class="w-full rounded-full h-2">
                    <div id="progressBar" class="bg-primary h-2 rounded-full" style="width: 0%"></div>
                </div>
            </div>
        </div>

        <div class="mt-8 flex justify-end gap-3">
            <button id="cancelUploadBtn" class="cancel-button py-2 px-4 rounded text-sm">{{ __('auth.cancel') }}</button>
            <button id="uploadBtn" class="confirm-button py-2 px-4 rounded text-sm" disabled>{{ __('auth.db_upload') }}</button>
        </div>
        
    </div>
</div>
</div>

<!-- Create Folder Modal -->
<div id="createFolderModal" class="fixed inset-0 z-50 flex items-center justify-center hidden text-white">
    <div style="background-color: #141326; opacity: 0.8;" class="fixed inset-0 transition-opacity"></div>
    <div style="background-color: #24243B;" class="rounded-lg shadow-xl w-full max-w-md p-6 relative z-10 transform transition-all">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-medium text-white text-text-main">{{ __('auth.db_create_new_folder') }}</h3>
            <button id="closeCreateFolderModalBtn" class="close-button text-text-secondary hover:text-white text-2xl focus:outline-none">
                <img src="/close.png" class="mr-2 w-3 h-3" alt="Close">
            </button>
        </div>
        <form id="createFolderForm">
            <div class="mb-4">
                <label for="newFolderNameInput" class="block text-sm font-medium mb-2" style="color: #9CA3AF;">{{ __('auth.db_folder_name') }}</label>
                <input type="text" id="newFolderNameInput" name="newFolderName"
                    class="w-full py-2 px-3 rounded-lg border-none bg-[#3C3F58] text-base text-white focus:outline-none focus:shadow-md placeholder-gray-400"
                    placeholder="{{ __('auth.db_enter_here') }}" required>
            </div>
            <div class="mt-6 flex justify-end gap-3">
                <button type="button" id="cancelCreateFolderBtn" class="cancel-button py-2 px-4 rounded text-sm">{{ __('auth.cancel') }}</button>
                <button type="submit" class="confirm-button py-2 px-4 rounded text-sm">{{ __('auth.db_create_folder') }}</button>
            </div>
        </form>
    </div>
</div>

<div class="bg-[#141326] py-4">
<!-- New Button container -->
<div class="relative mx-4 my-2">
    <!-- Toggle button -->
    <div id="newBtn"
     class="flex items-center py-4 px-6 rounded-full shadow-sm cursor-pointer transition-all duration-200 hover:bg-[#55597C]"
     style="background-color: #3c3f58;">
        <img src="{{ asset('add.png') }}" alt="Add" class="mr-3 w-3 h-3">
        <span class="text-sm text-white font-medium">{{ __('auth.db_upload') }}</span>
        <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="ml-auto w-2 h-2 transition-transform duration-200" id="uploadIcon">
    </div>

    <!-- Dropdown Menu - Simplified Structure -->
    <div id="newDropdown" 
     class="absolute left-0 right-0 top-full mt-2 rounded-lg z-50 bg-[#55597C] opacity-0 invisible translate-y-[-10px] transition-all duration-200"
     style="background-color: #55597C;">
        <div>
            <div id="uploadFileOption"
                class="flex items-center px-5 py-4 text-sm transition-colors text-white cursor-pointer"
                onclick="console.log('🟢 [DROPDOWN] Upload File Option clicked'); if(window.showUploadModal) { console.log('🟢 [DROPDOWN] Calling showUploadModal...'); window.showUploadModal(); } else { console.error('❌ [DROPDOWN] showUploadModal not available'); }"
                onmouseover="this.style.cssText = 'background-color: #55597C; border-radius: 0.5rem 0.5rem 0 0;';"
                onmouseout="this.style.cssText = 'border-radius: 0.5rem 0.5rem 0 0;';">
                <img src="{{ asset('file.png') }}" alt="File" class="mr-4 w-4 h-4">
                <span class="font-medium">{{ __('auth.db_new_file') }}</span>
            </div>
            
            @if(auth()->user()->is_premium)
            <div id="openClientArweaveBtn"
                class="flex items-center px-5 py-4 text-sm transition-colors text-white cursor-pointer"
                onclick="openClientArweaveModal()"
                onmouseover="this.style.cssText = 'background-color: #55597C;';"
                onmouseout="this.style.cssText = '';">
                <img src="{{ asset('link-symbol.png') }}" alt="File" class="mr-4 w-4 h-4">
                <span class="font-medium">{{ __('auth.db_blockchain_upload') }}</span>
            </div>
            @endif
            
            <div id="createFolderOption"
                class="flex items-center px-5 py-4 text-sm transition-colors text-white"
                onmouseover="this.style.cssText = 'background-color: #55597C; border-radius: 0 0 0.5rem 0.5rem;';"
                onmouseout="this.style.cssText = 'border-radius: 0 0 0.5rem 0.5rem;';">
                <img src="{{ asset('folder-closed-black-shape.png') }}" alt="File" class="mr-4 w-4 h-4">
                <span class="font-medium">{{ __('auth.db_new_folder') }}</span>
            </div>
        </div>
    </div>
</div>

     <ul id="sidebar" class="mt-4">
        <li id="my-documents-link" 
            class="py-3 px-8 flex items-center cursor-pointer rounded-r-2xl mr-4 bg-primary">
            <img src="{{ asset('folder-white-shape.png') }}" alt="Documents" class="mr-4 w-5 h-5">
            <span class="text-sm">{{ __('auth.db_my_documents') }}</span>
        </li>

        <li id="shared-with-me-link" 
            class="py-3 px-8 flex items-center cursor-pointer rounded-r-2xl mr-4 
            bg-[#141326] text-white hover:brightness-110 active:bg-[#2B2C61]">
            <svg class="mr-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span class="text-sm">{{ __('auth.db_shared_with_me') }}</span>
        </li>

        <li id="trash-link" 
            class="py-3 px-8 flex items-center cursor-pointer rounded-r-2xl mr-4 
            bg-[#141326] text-white hover:brightness-110 active:bg-[#2B2C61]">
            <img src="{{ asset('delete.png') }}" alt="Trash" class="mr-4 w-5 h-5">
            <span class="text-sm">{{ __('auth.db_trash') }}</span>
        </li>
        <li id="blockchain-storage-link"
            class="py-3 px-8 flex items-center cursor-pointer rounded-r-2xl mr-4
            bg-[#141326] text-white hover:brightness-110 active:bg-[#2B2C61]
            @if(!auth()->user()->is_premium) opacity-60 @endif" onclick="handleBlockchainClick(event)">
            <img src="{{ asset('link-symbol.png') }}" alt="Blockchain" class="mr-4 w-5 h-5">
            <span class="text-white text-sm">{{ __('auth.db_blockchain_storage') }}</span>
            
            @if(!auth()->user()->is_premium)
                <img src="/crown.png" class="mr-4 w-4 h-4 ml-auto" alt="Premium Upgrade">
            @endif
        </li>

        <style>
            /* Sidebar styles */
            #sidebar>li{background:#141326!important;color:#fff!important;transition:filter .15s;}
            #sidebar>li:hover{filter:brightness(1.5)!important;}
            #sidebar>li.bg-primary{background:#2B2C61!important;color:#fff!important;}
            #sidebar>li.bg-primary:hover{filter:none!important;}
            #sidebar>li *{color:inherit!important;}

            /* New button + dropdown */
            #newBtn{background:#3c3f58!important;}
            #newBtn:hover{background:#55597C!important;}
            #newDropdown{background:#3c3f58!important;}
        </style>
    </ul>

<!-- Storage Usage Display -->
    <li id="storage-tile" class="py-3 px-8 mt-8 flex items-center rounded-r-2xl mr-4 bg-[#141326] text-white">
        <img src="{{ asset('cloud.png') }}" alt="Storage" class="mr-4 w-5 h-5">
        <span class="text-sm">{{ __('auth.db_storage') }}</span>
    </li>
   
    <div id="storageUsageContainer" class="px-6"> 
        <div class="w-full h-2 bg-gray-600 rounded overflow-hidden">
            <div id="storageProgressBar" class="h-full transition-all duration-300 rounded" style="width: 0%; background-color: #3C3F58;"></div>
        </div>
        <div id="storageUsageText" class="text-xs text-gray-300 mt-2">Loading storage usage...</div>
        <div id="upgradePrompt" class="hidden mt-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-xs">
            <div class="flex items-center justify-between">
                <span class="text-white font-medium">Storage limit reached!</span>
                <button id="upgradeBtn" class="bg-white text-purple-600 px-2 py-1 rounded text-xs font-bold hover:bg-gray-100 transition-colors">
                    Upgrade to Premium
                </button>
            </div>
        </div>
    </div>

    <!-- JS Localization -->
    <div 
        id="storage-localization-data" 
        class="hidden" 
        data-unable-to-load="{{ __('auth.storage_unable_to_load') }}"
        data-upgrade-to-premium="{{ __('auth.storage_upgrade_to_premium') }}"
        data-get-more-storage="{{ __('auth.storage_get_more_storage') }}"
        data-current-plan="{{ __('auth.storage_current_plan') }}"
        data-premium-plan="{{ __('auth.storage_premium_plan') }}"
        data-gb-storage="{{ __('auth.storage_gb_storage') }}"
        data-blockchain-storage="{{ __('auth.storage_blockchain_storage') }}"
        data-ai-powered-search="{{ __('auth.storage_ai_powered_search') }}"
        data-priority-support="{{ __('auth.storage_priority_support') }}"
        data-maybe-later="{{ __('auth.storage_maybe_later') }}"
        data-upgrade-now="{{ __('auth.storage_upgrade_now') }}"
        data-storage-limit-exceeded="{{ __('auth.storage_limit_exceeded') }}"
        data-storage-almost-full="{{ __('auth.storage_almost_full') }}"
        data-storage-limit-approaching="{{ __('auth.storage_limit_approaching') }}"
        data-not-enough-storage="{{ __('auth.storage_not_enough_storage') }}"
        data-available="{{ __('auth.storage_available') }}"
        data-required="{{ __('auth.storage_required') }}"
        data-of="{{ __('auth.storage_of') }}"
        data-used="{{ __('auth.storage_used') }}"
        data-gb="{{ __('auth.storage_gb') }}"
        data-mb="{{ __('auth.storage_mb') }}"
    ></div>

    <script>
        // Initialize storage localization
        const storageLocalData = document.getElementById('storage-localization-data');
        if (storageLocalData) {
            window.I18N = window.I18N || {};
            window.I18N.storage = {
                unableToLoad: storageLocalData.getAttribute('data-unable-to-load'),
                upgradeToPremium: storageLocalData.getAttribute('data-upgrade-to-premium'),
                getMoreStorage: storageLocalData.getAttribute('data-get-more-storage'),
                currentPlan: storageLocalData.getAttribute('data-current-plan'),
                premiumPlan: storageLocalData.getAttribute('data-premium-plan'),
                gbStorage: storageLocalData.getAttribute('data-gb-storage'),
                blockchainStorage: storageLocalData.getAttribute('data-blockchain-storage'),
                aiPoweredSearch: storageLocalData.getAttribute('data-ai-powered-search'),
                prioritySupport: storageLocalData.getAttribute('data-priority-support'),
                maybeLater: storageLocalData.getAttribute('data-maybe-later'),
                upgradeNow: storageLocalData.getAttribute('data-upgrade-now'),
                storageLimitExceeded: storageLocalData.getAttribute('data-storage-limit-exceeded'),
                storageAlmostFull: storageLocalData.getAttribute('data-storage-almost-full'),
                storageLimitApproaching: storageLocalData.getAttribute('data-storage-limit-approaching'),
                notEnoughStorage: storageLocalData.getAttribute('data-not-enough-storage'),
                available: storageLocalData.getAttribute('data-available'),
                required: storageLocalData.getAttribute('data-required'),
                of: storageLocalData.getAttribute('data-of'),
                used: storageLocalData.getAttribute('data-used'),
                gb: storageLocalData.getAttribute('data-gb'),
                mb: storageLocalData.getAttribute('data-mb')
            };
        }
    </script>

</div>
</div>

<main style="background-color: #24243B; border-top-left-radius: 32px; margin-left: 13px;" class="p-6 overflow-y-auto">
    <input type="hidden" id="currentFolderId" value="">
    <div id="breadcrumbsContainer"class="mt-2 mb-8 text-sm text-white flex items-center justify-between">
        
        <!-- Breadcrumbs will be populated by JavaScript -->
        <div id="breadcrumbsDropdown" class="relative hidden">
            <button id="breadcrumbsMenuBtn" class="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors mr-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
            </button>
            <div id="breadcrumbsDropdownMenu" class="absolute top-full left-0 mt-1 bg-[#1F2235] border border-[#4A4D6A] rounded-lg shadow-lg z-50 min-w-[200px] hidden">
                <!-- Hidden breadcrumb items will be populated here -->
            </div>
        </div>

        <div id="breadcrumbsPath" class="flex items-center">
            <!-- Visible breadcrumb path will be populated here -->
        </div>

        <!-- Move view toggle buttons here -->
        <div id="viewToggleBtns" class="flex gap-2 ml-auto">
            <button id="btnGridLayout" data-view="grid" title="Grid view" aria-label="Grid view"
            class="view-toggle-btn active py-2 px-4 border rounded text-sm">
                <span><img src="{{ asset('grid.png') }}" alt="Documents" class="w-4 h-4"></span>
            </button>
            <button id="btnListLayout" data-view="list" title="List view" aria-label="List view"
            class="view-toggle-btn py-2 px-4 border rounded text-sm">
                <span><img src="{{ asset('list.png') }}" alt="Documents" class="w-4 h-4"></span>
            </button>
        </div>

    </div>
    <!-- <h1 id="header-title" class="text-2xl text-white font-bold mb-6">My Documents</h1> -->

    <!-- Selection Toolbar - Google Drive style -->
    <div id="selectionToolbar" class="hidden mb-4 flex items-center gap-4 px-4 py-3 bg-[#2A2D47] rounded-lg border border-[#4A4D6A] shadow-lg">
        <div class="flex items-center gap-2 text-white">
            <span id="selectionCount">0 selected</span>
        </div>
        <div class="flex items-center gap-2 ml-auto">
            <button id="selectionOpenBtn" class="flex items-center gap-2 px-3 py-2 bg-[#3C3F58] hover:bg-[#55597C] rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                <span class="btn-label">{{ __('auth.ff_open') }}</span>
            </button>
            <button id="selectionRestoreBtn" class="flex items-center gap-2 px-3 py-2 bg-[#3C3F58] hover:bg-[#55597C] rounded-lg text-sm transition-colors hidden">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M20 4l-6 6M4 20l6-6"></path>
                </svg>
                <span class="btn-label">{{ __('auth.ff_restore_action') }}</span>
            </button>
            <button id="selectionDeleteBtn" class="flex items-center gap-2 px-3 py-2 bg-[#3C3F58] hover:bg-[#55597C] rounded-lg text-sm transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <span class="btn-label">test delete</span>
            </button>
            <button id="selectionMoveBtn" class="flex items-center gap-2 px-3 py-2 bg-[#3C3F58] hover:bg-[#55597C] rounded-lg text-sm transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
                <span class="btn-label">{{ __('auth.ff_move') }}</span>
            </button>
            <button id="selectionRenameBtn" class="flex items-center gap-2 px-3 py-2 bg-[#3C3F58] hover:bg-[#55597C] rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span class="btn-label">{{ __('auth.ff_rename') }}</span>
                </button>
            <button id="selectionShareBtn" class="flex items-center gap-2 px-3 py-2 bg-[#3C3F58] hover:brightness-110 rounded-lg text-sm transition-colors text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span class="btn-label">{{ __('auth.ff_share') }}</span>
            </button>
            <button id="selectionDownloadBtn" class="flex items-center gap-2 px-3 py-2 bg-[#3C3F58] hover:brightness-110 rounded-lg text-sm transition-colors text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="btn-label">{{ __('auth.ff_download') }}</span>
            </button>
        </div>
        <button id="selectionClearBtn" class="flex items-center gap-1 px-2 py-1 bg-transparent hover:bg-[#4A4D6A] rounded text-white text-sm transition-colors ml-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>

    <!-- JS Localization -->
    <div 
        id="js-localization-data" 
        class="hidden" 
        data-my-documents="{{ __('auth.db_my_documents') }}"
    ></div>

    <script>
        window.I18N = window.I18N || {};
        
        // Read the localized text from the hidden HTML element
        const localData = document.getElementById('js-localization-data');
        if (localData) {
            window.I18N.dbMyDocuments = localData.getAttribute('data-my-documents');
        }
    </script>

    <!-- File-Folder Localization -->
    <div id="file-folder-localization-data" 
        class="hidden" 
        data-no-files-found="{{ __('auth.ff_no_files_found') }}"
        data-loading="{{ __('auth.ff_loading') }}"
        data-error-loading="{{ __('auth.ff_error_loading') }}"
        data-move-to-trash="{{ __('auth.ff_move_to_trash') }}"
        data-delete-permanently="{{ __('auth.ff_delete_permanently') }}"
        data-restore="{{ __('auth.ff_restore') }}"
        data-restore-to-root="{{ __('auth.ff_restore_to_root') }}"
        data-empty-trash="{{ __('auth.ff_empty_trash') }}"
        data-empty-trash-confirm="{{ __('auth.ff_empty_trash_confirm') }}"
        data-trash-warning="{{ __('auth.ff_trash_warning') }}"
        data-items-selected="{{ __('auth.ff_items_selected') }}"
        data-open="{{ __('auth.ff_open') }}"
        data-open-file="{{ __('auth.ff_open_file') }}"
        data-open-folder="{{ __('auth.ff_open_folder') }}"
        data-rename="{{ __('auth.ff_rename') }}"
        data-move="{{ __('auth.ff_move') }}"
        data-delete="{{ __('auth.ff_delete') }}"
        data-restore-action="{{ __('auth.ff_restore_action') }}"
        data-share="{{ __('auth.ff_share') }}"
        data-download="{{ __('auth.ff_download') }}"
        data-more-actions="{{ __('auth.ff_more_actions') }}"
        data-otp-security="{{ __('auth.ff_otp_security') }}"
        data-enable-permanent-storage="{{ __('auth.ff_enable_permanent_storage') }}"
        data-remove-from-vector="{{ __('auth.ff_remove_from_vector') }}"
        data-share-to-ai="{{ __('auth.ff_share_to_ai') }}"
        data-upload-to-arweave="{{ __('auth.ff_upload_to_arweave') }}"
        data-download-from-blockchain="{{ __('auth.ff_download_from_blockchain') }}"
        data-view-on-ipfs="{{ __('auth.ff_view_on_ipfs') }}"
        data-copy-ipfs-hash="{{ __('auth.ff_copy_ipfs_hash') }}"
        data-blockchain-info="{{ __('auth.ff_blockchain_info') }}"
        data-share-ipfs-link="{{ __('auth.ff_share_ipfs_link') }}"
        data-blockchain-history="{{ __('auth.ff_blockchain_history') }}"
        data-remove-from-blockchain="{{ __('auth.ff_remove_from_blockchain') }}"
        data-stored-on-arweave="{{ __('auth.ff_stored_on_arweave') }}"
        data-otp-protected="{{ __('auth.ff_otp_protected') }}"
        data-search-results="{{ __('auth.ff_search_results') }}"
        data-clear-search="{{ __('auth.ff_clear_search') }}"
        data-items="{{ __('auth.ff_items') }}"
        data-item="{{ __('auth.ff_item') }}"
        data-selected="{{ __('auth.ff_selected') }}"
        data-move-items="{{ __('auth.ff_move_items') }}"
        data-select-destination="{{ __('auth.ff_select_destination') }}"
        data-root-folder="{{ __('auth.ff_root_folder') }}"
        data-no-folders="{{ __('auth.ff_no_folders') }}"
        data-resolve-conflicts="{{ __('auth.ff_resolve_conflicts') }}"
        data-name-conflict="{{ __('auth.ff_name_conflict') }}"
        data-skip="{{ __('auth.ff_skip') }}"
        data-conflict-rename="{{ __('auth.ff_conflict_rename') }}"
        data-conflict-replace="{{ __('auth.ff_conflict_replace') }}"
        data-proceed="{{ __('auth.ff_proceed') }}"
        data-no-shared-files="{{ __('auth.ff_no_shared_files') }}"
        data-shared-with-me="{{ __('auth.ff_shared_with_me') }}"
        data-shared-by="{{ __('auth.ff_shared_by') }}"
        data-modified="{{ __('auth.ff_modified') }}"
        data-name="{{ __('auth.ff_name') }}"
        data-msg-folder-created="{{ __('auth.msg_folder_created') }}"
        data-msg-folder-req="{{ __('auth.msg_folder_req') }}"
        data-msg-move-success="{{ __('auth.msg_move_success') }}"
        data-msg-move-success-multi="{{ __('auth.msg_move_success_multi') }}"
        data-msg-rename-success="{{ __('auth.msg_rename_success') }}"
        data-msg-trash-emptied="{{ __('auth.msg_trash_emptied') }}"
        data-msg-restore-success="{{ __('auth.msg_restore_success') }}"
        data-msg-delete-success="{{ __('auth.msg_delete_success') }}"
        data-msg-perm-delete-success="{{ __('auth.msg_perm_delete_success') }}"
        data-msg-upload-not-init="{{ __('auth.msg_upload_not_init') }}"
        data-msg-move-limit="{{ __('auth.msg_move_limit') }}"
        data-msg-ipfs-copied="{{ __('auth.msg_ipfs_copied') }}"
        data-msg-ipfs-shared="{{ __('auth.msg_ipfs_shared') }}"
        data-msg-vec-removed="{{ __('auth.msg_vec_removed') }}"
        data-msg-vec-started="{{ __('auth.msg_vec_started') }}"
        data-confirm-restore-root="{{ __('auth.confirm_restore_root') }}"
        data-confirm-restore-vec="{{ __('auth.confirm_restore_vec') }}"
        data-confirm-download-chain="{{ __('auth.confirm_download_chain') }}"
        data-confirm-delete-perm="{{ __('auth.confirm_delete_perm') }}"
        data-confirm-move-trash="{{ __('auth.confirm_move_trash') }}"
        data-prompt-rename="{{ __('auth.prompt_rename') }}"
        data-btn-moving="{{ __('auth.btn_moving') }}"
        data-btn-renaming="{{ __('auth.btn_renaming') }}"
        data-btn-emptying="{{ __('auth.btn_emptying') }}"
        data-btn-processing="{{ __('auth.btn_processing') }}"
        data-conflict-title="{{ __('auth.conflict_title') }}"
        data-conflict-desc="{{ __('auth.conflict_desc') }}"
        data-conflict-existing="{{ __('auth.conflict_existing') }}"
        data-conflict-cannot-move="{{ __('auth.conflict_cannot_move') }}"
        data-lbl-selected-count="{{ __('auth.lbl_selected_count') }}"
        data-lbl-loading-folders="{{ __('auth.lbl_loading_folders') }}"
        data-msg-otp-sent="{{ __('auth.ff_otp_sent') }}"
        data-msg-otp-invalid="{{ __('auth.msg_otp_invalid') ?? 'Invalid OTP' }}"
        data-msg-otp-verify-req="{{ __('auth.ff_otp_verify_title') }}"
        data-msg-file-not-found="{{ __('auth.msg_file_not_found') }}"
        data-msg-ipfs-not-found="{{ __('auth.msg_ipfs_not_found') }}"
        data-msg-wallet-req="{{ __('auth.arw_step2_desc') }}"
        data-msg-insufficient-bal="{{ __('auth.msg_insufficient_bal') ?? __('auth.arw_suff_balance') }}"
        data-msg-enter-valid-name="{{ __('auth.msg_enter_valid_name') }}"
        data-msg-name-same="{{ __('auth.msg_name_same') }}"
        data-btn-copy-to-files="{{ __('auth.btn_copy_to_files') }}"
        data-msg-copying="{{ __('auth.msg_copying') }}"
        data-msg-copy-success="{{ __('auth.msg_copy_success') }}"
        data-msg-shared-link-deleted="{{ __('auth.msg_shared_link_deleted') }}"
        data-move-here="{{ __('auth.ff_move_here') }}"
        data-cancel="{{ __('auth.cancel') }}"
        data-lbl-selected-items-list="{{ __('auth.lbl_selected_items_list') }}"
        data-msg-load-selected-failed="{{ __('auth.msg_load_selected_failed') }}"
        data-msg-move-modal-failed="{{ __('auth.msg_move_modal_failed') }}"
        data-msg-no-items-move="{{ __('auth.msg_no_items_move') }}"
        data-msg-load-folders-failed="{{ __('auth.msg_load_folders_failed') }}"
        data-msg-move-failed="{{ __('auth.msg_move_failed') }}"
        data-lbl-rename-to="{{ __('auth.lbl_rename_to') }}"
        data-current-name="{{ __('auth.ff_current_name') }}"
        data-new-name="{{ __('auth.ff_new_name') }}"
        data-enter-new-name="{{ __('auth.ff_enter_new_name') }}"
        data-name-validation="{{ __('auth.ff_name_validation') }}"
        data-rename-success="{{ __('auth.msg_rename_success') }}"
        data-rename-failed="{{ __('auth.msg_rename_failed') ?? 'Failed to rename item' }}"
        data-lbl-edit-share-link="{{ __('auth.lbl_edit_share_link') }}"
        data-lbl-update-share-link="{{ __('auth.lbl_update_share_link') }}"
        data-lbl-create-share-link="{{ __('auth.lbl_create_share_link') }}"
        data-ph-enter-new-pass="{{ __('auth.ph_enter_new_pass') }}"
        data-enter-password="{{ __('auth.enter_password') }}"
        data-lbl-1-day="{{ __('auth.lbl_1_day') }}"
        data-lbl-1-week="{{ __('auth.lbl_1_week') }}"
        data-lbl-1-month="{{ __('auth.lbl_1_month') }}"
        data-lbl-3-months="{{ __('auth.lbl_3_months') }}"
        data-lbl-creating="{{ __('auth.lbl_creating') }}"
        data-lbl-updating="{{ __('auth.lbl_updating') }}"
        data-msg-pass-prot-premium="{{ __('auth.msg_pass_prot_premium') }}"
        data-msg-enter-password="{{ __('auth.msg_enter_password') }}"
        data-msg-share-otp-error="{{ __('auth.msg_share_otp_error') }}"
        data-share-warning="{{ __('auth.ff_share_warning') }}"
        data-one-time-download="{{ __('auth.one_time_download') }}"
        data-expires-in-days="{{ __('auth.expires_in_days') }}"
        data-never-expires="{{ __('auth.never_expires') }}"
        data-password-protection="{{ __('auth.password_protection') }}"
        data-premium="{{ __('auth.premium') }}"
        data-share-link-created="{{ __('auth.share_link_created') }}"
        data-share-created-success="{{ __('auth.share_created_success') }}"
        data-share-url="{{ __('auth.share_url') }}"
        data-copy="{{ __('auth.copy') }}"
        data-copied="{{ __('auth.ff_copied') }}"
        data-close="{{ __('auth.close') }}"
        data-open-link="{{ __('auth.open_link') }}"
        data-type="{{ __('auth.type') }}"
        data-file="{{ __('auth.file') }}"
        data-folder="{{ __('auth.folder') }}"
        data-access="{{ __('auth.access') }}"
        data-one-time-only="{{ __('auth.one_time_only') }}"
        data-protection="{{ __('auth.protection') }}"
        data-password-protected="{{ __('auth.password_protected') }}"
        data-expires="{{ __('auth.expires') }}"
        data-otp-settings-title="{{ __('auth.ff_otp_settings_title') }}"
        data-email-otp-protection="{{ __('auth.ff_email_otp_protection') }}"
        data-otp-require-desc="{{ __('auth.ff_otp_require_desc') }}"
        data-important-notice="{{ __('auth.ff_important_notice') }}"
        data-otp-warning-desc="{{ __('auth.ff_otp_warning_desc') }}"
        data-otp-warning-list1="{!! __('auth.ff_otp_warning_list1') !!}"
        data-otp-warning-list2="{!! __('auth.ff_otp_warning_list2') !!}"
        data-otp-warning-list3="{!! __('auth.ff_otp_warning_list3') !!}"
        data-otp-warning-list4="{!! __('auth.ff_otp_warning_list4') !!}"
        data-otp-warning-footer="{{ __('auth.ff_otp_warning_footer') }}"
        data-require-download="{{ __('auth.ff_require_download') }}"
        data-require-preview="{{ __('auth.ff_require_preview') }}"
        data-shared-link-management="{{ __('auth.ff_shared_link_management') }}"
        data-delete-shared-link-desc="{{ __('auth.ff_delete_shared_link_desc') }}"
        data-delete-shared-link-btn="{{ __('auth.ff_delete_shared_link_btn') }}"
        data-disable-otp-header="{{ __('auth.ff_disable_otp_header') }}"
        data-disable-otp-desc="{{ __('auth.ff_disable_otp_desc') }}"
        data-send-otp="{{ __('auth.ff_send_otp') }}"
        data-disable="{{ __('auth.ff_disable') }}"
        data-otp-duration="{{ __('auth.ff_otp_duration') }}"
        data-security-stats="{{ __('auth.ff_security_stats') }}"
        data-total-accesses="{{ __('auth.ff_total_accesses') }}"
        data-last-access="{{ __('auth.ff_last_access') }}"
        data-update-settings="{{ __('auth.ff_update_settings') }}"
        data-enable-otp="{{ __('auth.ff_enable_otp') }}"
        data-otp-disabled-title="{{ __('auth.ff_otp_disabled_title') }}"
        data-otp-disabled-desc="{{ __('auth.ff_otp_disabled_desc') }}"
        data-otp-verify-title="{{ __('auth.ff_otp_verify_title') }}"
        data-otp-verify-desc="{{ __('auth.ff_otp_verify_desc') }}"
        data-otp-code="{{ __('auth.ff_otp_code') }}"
        data-verify-and="{{ __('auth.ff_verify_and') }}"
        data-sending="{{ __('auth.ff_sending') }}"
        data-otp-sent-check="{{ __('auth.ff_otp_sent') }}"
        data-lbl-minutes="{{ __('auth.lbl_minutes') }}"
        data-ph-enter-otp="{{ __('auth.ph_enter_otp') }}"
        data-msg-otp-enabled-success="{{ __('auth.msg_otp_enabled_success') }}"
        data-msg-otp-disabled-success="{{ __('auth.msg_otp_disabled_success') }}"
        data-msg-otp-update-success="{{ __('auth.msg_otp_update_success') }}"
        data-msg-otp-update-failed="{{ __('auth.msg_otp_update_failed') }}"
        data-msg-otp-disable-failed="{{ __('auth.msg_otp_disable_failed') }}"
        data-msg-email-verify-req="{{ __('auth.msg_email_verify_req') }}"
        data-msg-email-verify-desc="{{ __('auth.msg_email_verify_desc') }}"
        data-btn-verify-email="{{ __('auth.btn_verify_email') }}"
        data-msg-shared-files-desc="{{ __('auth.msg_shared_files_desc') }}"
        data-lbl-files="{{ __('auth.lbl_files') }}"
        data-provider="{{ __('auth.ff_provider') }}"
        data-status="{{ __('auth.ff_status') }}"
        data-encrypted="{{ __('auth.ff_encrypted') }}"
        data-redundancy="{{ __('auth.ff_redundancy') }}"
        data-copy-hash="{{ __('auth.ff_copy_hash') }}"
        data-file-name="{{ __('auth.ff_file_name') }}"
        data-msg-load-shared-failed="{{ __('auth.msg_load_shared_failed') }}"
        data-msg-trash-empty-failed="{{ __('auth.msg_trash_empty_failed') }}"
        data-msg-perm-delete-failed="{{ __('auth.msg_perm_delete_failed') }}"
        data-msg-restore-failed="{{ __('auth.msg_restore_failed') }}"
        data-msg-share-link-failed="{{ __('auth.msg_share_link_failed') }}"
        data-msg-vec-restore-success="{{ __('auth.msg_vec_restore_success') }}"
        data-msg-vec-restore-failed="{{ __('auth.msg_vec_restore_failed') }}"
        data-msg-shared-link-delete-failed="{{ __('auth.msg_shared_link_delete_failed') }}"
        data-msg-file-access-failed="{{ __('auth.msg_file_access_failed') }}"
        data-msg-otp-verify-failed="{{ __('auth.msg_otp_verify_failed') }}"
        data-msg-arw-validating="{{ __('auth.msg_arw_validating') }}"
        data-msg-arw-ready="{{ __('auth.msg_arw_ready') }}"
        data-msg-arw-auto-select-failed="{{ __('auth.msg_arw_auto_select_failed') }}"
        data-vec-removed-title="{{ __('auth.vec_removed_title') }}"
        data-vec-removal-failed-title="{{ __('auth.vec_removal_failed_title') }}"
        data-vec-processing-started-title="{{ __('auth.vec_processing_started_title') }}"
        data-vec-processing-failed-title="{{ __('auth.vec_processing_failed_title') }}"
        data-msg-vec-removal-failed="{{ __('auth.msg_vec_removal_failed') }}"
        data-msg-vec-processing-failed="{{ __('auth.msg_vec_processing_failed') }}"
    ></div>

    <script>
        // Initialize file-folder localization
        const fileFolderLocalData = document.getElementById('file-folder-localization-data');
        if (fileFolderLocalData) {
            window.I18N = window.I18N || {};
            window.I18N.fileFolder = {
                noFilesFound: fileFolderLocalData.getAttribute('data-no-files-found'),
                loading: fileFolderLocalData.getAttribute('data-loading'),
                errorLoading: fileFolderLocalData.getAttribute('data-error-loading'),
                moveToTrash: fileFolderLocalData.getAttribute('data-move-to-trash'),
                deletePermanently: fileFolderLocalData.getAttribute('data-delete-permanently'),
                restore: fileFolderLocalData.getAttribute('data-restore'),
                restoreToRoot: fileFolderLocalData.getAttribute('data-restore-to-root'),
                emptyTrash: fileFolderLocalData.getAttribute('data-empty-trash'),
                emptyTrashConfirm: fileFolderLocalData.getAttribute('data-empty-trash-confirm'),
                trashWarning: fileFolderLocalData.getAttribute('data-trash-warning'),
                itemsSelected: fileFolderLocalData.getAttribute('data-items-selected'),
                open: fileFolderLocalData.getAttribute('data-open'),
                openFile: fileFolderLocalData.getAttribute('data-open-file'),
                openFolder: fileFolderLocalData.getAttribute('data-open-folder'),
                rename: fileFolderLocalData.getAttribute('data-rename'),
                move: fileFolderLocalData.getAttribute('data-move'),
                delete: fileFolderLocalData.getAttribute('data-delete'),
                restoreAction: fileFolderLocalData.getAttribute('data-restore-action'),
                share: fileFolderLocalData.getAttribute('data-share'),
                download: fileFolderLocalData.getAttribute('data-download'),
                moreActions: fileFolderLocalData.getAttribute('data-more-actions'),
                otpSecurity: fileFolderLocalData.getAttribute('data-otp-security'),
                enablePermanentStorage: fileFolderLocalData.getAttribute('data-enable-permanent-storage'),
                removeFromVector: fileFolderLocalData.getAttribute('data-remove-from-vector'),
                shareToAI: fileFolderLocalData.getAttribute('data-share-to-ai'),
                uploadToArweave: fileFolderLocalData.getAttribute('data-upload-to-arweave'),
                downloadFromBlockchain: fileFolderLocalData.getAttribute('data-download-from-blockchain'),
                viewOnIPFS: fileFolderLocalData.getAttribute('data-view-on-ipfs'),
                copyIPFSHash: fileFolderLocalData.getAttribute('data-copy-ipfs-hash'),
                blockchainInfo: fileFolderLocalData.getAttribute('data-blockchain-info'),
                shareIPFSLink: fileFolderLocalData.getAttribute('data-share-ipfs-link'),
                blockchainHistory: fileFolderLocalData.getAttribute('data-blockchain-history'),
                removeFromBlockchain: fileFolderLocalData.getAttribute('data-remove-from-blockchain'),
                storedOnArweave: fileFolderLocalData.getAttribute('data-stored-on-arweave'),
                otpProtected: fileFolderLocalData.getAttribute('data-otp-protected'),
                searchResults: fileFolderLocalData.getAttribute('data-search-results'),
                clearSearch: fileFolderLocalData.getAttribute('data-clear-search'),
                items: fileFolderLocalData.getAttribute('data-items'),
                item: fileFolderLocalData.getAttribute('data-item'),
                selected: fileFolderLocalData.getAttribute('data-selected'),
                moveItems: fileFolderLocalData.getAttribute('data-move-items'),
                selectDestination: fileFolderLocalData.getAttribute('data-select-destination'),
                rootFolder: fileFolderLocalData.getAttribute('data-root-folder'),
                noFolders: fileFolderLocalData.getAttribute('data-no-folders'),
                resolveConflicts: fileFolderLocalData.getAttribute('data-resolve-conflicts'),
                nameConflict: fileFolderLocalData.getAttribute('data-name-conflict'),
                skip: fileFolderLocalData.getAttribute('data-skip'),
                conflictRename: fileFolderLocalData.getAttribute('data-conflict-rename'),
                conflictReplace: fileFolderLocalData.getAttribute('data-conflict-replace'),
                proceed: fileFolderLocalData.getAttribute('data-proceed'),
                noSharedFiles: fileFolderLocalData.getAttribute('data-no-shared-files'),
                sharedWithMe: fileFolderLocalData.getAttribute('data-shared-with-me'),
                sharedBy: fileFolderLocalData.getAttribute('data-shared-by'),
                modified: fileFolderLocalData.getAttribute('data-modified'),
                name: fileFolderLocalData.getAttribute('data-name'),
                msgFolderCreated: fileFolderLocalData.getAttribute('data-msg-folder-created'),
                msgFolderReq: fileFolderLocalData.getAttribute('data-msg-folder-req'),
                msgMoveSuccess: fileFolderLocalData.getAttribute('data-msg-move-success'),
                msgMoveSuccessMulti: fileFolderLocalData.getAttribute('data-msg-move-success-multi'),
                msgRenameSuccess: fileFolderLocalData.getAttribute('data-msg-rename-success'),
                msgTrashEmptied: fileFolderLocalData.getAttribute('data-msg-trash-emptied'),
                msgRestoreSuccess: fileFolderLocalData.getAttribute('data-msg-restore-success'),
                msgDeleteSuccess: fileFolderLocalData.getAttribute('data-msg-delete-success'),
                msgPermDeleteSuccess: fileFolderLocalData.getAttribute('data-msg-perm-delete-success'),
                msgUploadNotInit: fileFolderLocalData.getAttribute('data-msg-upload-not-init'),
                msgMoveLimit: fileFolderLocalData.getAttribute('data-msg-move-limit'),
                msgIpfsCopied: fileFolderLocalData.getAttribute('data-msg-ipfs-copied'),
                msgIpfsShared: fileFolderLocalData.getAttribute('data-msg-ipfs-shared'),
                msgVecRemoved: fileFolderLocalData.getAttribute('data-msg-vec-removed'),
                msgVecStarted: fileFolderLocalData.getAttribute('data-msg-vec-started'),
                confirmRestoreRoot: fileFolderLocalData.getAttribute('data-confirm-restore-root'),
                confirmRestoreVec: fileFolderLocalData.getAttribute('data-confirm-restore-vec'),
                confirmDownloadChain: fileFolderLocalData.getAttribute('data-confirm-download-chain'),
                confirmDeletePerm: fileFolderLocalData.getAttribute('data-confirm-delete-perm'),
                confirmMoveTrash: fileFolderLocalData.getAttribute('data-confirm-move-trash'),
                promptRename: fileFolderLocalData.getAttribute('data-prompt-rename'),
                btnMoving: fileFolderLocalData.getAttribute('data-btn-moving'),
                btnRenaming: fileFolderLocalData.getAttribute('data-btn-renaming'),
                btnEmptying: fileFolderLocalData.getAttribute('data-btn-emptying'),
                btnProcessing: fileFolderLocalData.getAttribute('data-btn-processing'),
                conflictTitle: fileFolderLocalData.getAttribute('data-conflict-title'),
                conflictDesc: fileFolderLocalData.getAttribute('data-conflict-desc'),
                conflictExisting: fileFolderLocalData.getAttribute('data-conflict-existing'),
                conflictCannotMove: fileFolderLocalData.getAttribute('data-conflict-cannot-move'),
                lblSelectedCount: fileFolderLocalData.getAttribute('data-lbl-selected-count'),
                lblLoadingFolders: fileFolderLocalData.getAttribute('data-lbl-loading-folders'),
                msgOtpSent: fileFolderLocalData.getAttribute('data-msg-otp-sent'),
                msgOtpInvalid: fileFolderLocalData.getAttribute('data-msg-otp-invalid'),
                msgOtpVerifyReq: fileFolderLocalData.getAttribute('data-msg-otp-verify-req'),
                msgFileNotFound: fileFolderLocalData.getAttribute('data-msg-file-not-found'),
                msgIpfsNotFound: fileFolderLocalData.getAttribute('data-msg-ipfs-not-found'),
                msgWalletReq: fileFolderLocalData.getAttribute('data-msg-wallet-req'),
                msgInsufficientBal: fileFolderLocalData.getAttribute('data-msg-insufficient-bal'),
                msgEnterValidName: fileFolderLocalData.getAttribute('data-msg-enter-valid-name'),
                msgNameSame: fileFolderLocalData.getAttribute('data-msg-name-same'),
                btnCopyToFiles: fileFolderLocalData.getAttribute('data-btn-copy-to-files'),
                msgCopying: fileFolderLocalData.getAttribute('data-msg-copying'),
                msgCopySuccess: fileFolderLocalData.getAttribute('data-msg-copy-success'),
                msgSharedLinkDeleted: fileFolderLocalData.getAttribute('data-msg-shared-link-deleted'),
                moveHere: fileFolderLocalData.getAttribute('data-move-here'),
                cancel: fileFolderLocalData.getAttribute('data-cancel'),
                lblSelectedItemsList: fileFolderLocalData.getAttribute('data-lbl-selected-items-list'),
                msgLoadSelectedFailed: fileFolderLocalData.getAttribute('data-msg-load-selected-failed'),
                msgMoveModalFailed: fileFolderLocalData.getAttribute('data-msg-move-modal-failed'),
                msgNoItemsMove: fileFolderLocalData.getAttribute('data-msg-no-items-move'),
                msgLoadFoldersFailed: fileFolderLocalData.getAttribute('data-msg-load-folders-failed'),
                msgMoveFailed: fileFolderLocalData.getAttribute('data-msg-move-failed'),
                lblRenameTo: fileFolderLocalData.getAttribute('data-lbl-rename-to'),
                currentName: fileFolderLocalData.getAttribute('data-current-name'),
                newName: fileFolderLocalData.getAttribute('data-new-name'),
                enterNewName: fileFolderLocalData.getAttribute('data-enter-new-name'),
                nameValidation: fileFolderLocalData.getAttribute('data-name-validation'),
                renameSuccess: fileFolderLocalData.getAttribute('data-rename-success'),
                renameFailed: fileFolderLocalData.getAttribute('data-rename-failed'),
                lblEditShareLink: fileFolderLocalData.getAttribute('data-lbl-edit-share-link'),
                lblUpdateShareLink: fileFolderLocalData.getAttribute('data-lbl-update-share-link'),
                lblCreateShareLink: fileFolderLocalData.getAttribute('data-lbl-create-share-link'),
                phEnterNewPass: fileFolderLocalData.getAttribute('data-ph-enter-new-pass'),
                enterPassword: fileFolderLocalData.getAttribute('data-enter-password'),
                lbl1Day: fileFolderLocalData.getAttribute('data-lbl-1-day'),
                lbl1Week: fileFolderLocalData.getAttribute('data-lbl-1-week'),
                lbl1Month: fileFolderLocalData.getAttribute('data-lbl-1-month'),
                lbl3Months: fileFolderLocalData.getAttribute('data-lbl-3-months'),
                lblCreating: fileFolderLocalData.getAttribute('data-lbl-creating'),
                lblUpdating: fileFolderLocalData.getAttribute('data-lbl-updating'),
                msgPassProtPremium: fileFolderLocalData.getAttribute('data-msg-pass-prot-premium'),
                msgEnterPassword: fileFolderLocalData.getAttribute('data-msg-enter-password'),
                msgShareOtpError: fileFolderLocalData.getAttribute('data-msg-share-otp-error'),
                shareWarning: fileFolderLocalData.getAttribute('data-share-warning'),
                oneTimeDownload: fileFolderLocalData.getAttribute('data-one-time-download'),
                expiresInDays: fileFolderLocalData.getAttribute('data-expires-in-days'),
                neverExpires: fileFolderLocalData.getAttribute('data-never-expires'),
                passwordProtection: fileFolderLocalData.getAttribute('data-password-protection'),
                premium: fileFolderLocalData.getAttribute('data-premium'),
                shareLinkCreated: fileFolderLocalData.getAttribute('data-share-link-created'),
                shareCreatedSuccess: fileFolderLocalData.getAttribute('data-share-created-success'),
                shareUrl: fileFolderLocalData.getAttribute('data-share-url'),
                copy: fileFolderLocalData.getAttribute('data-copy'),
                copied: fileFolderLocalData.getAttribute('data-copied'),
                close: fileFolderLocalData.getAttribute('data-close'),
                openLink: fileFolderLocalData.getAttribute('data-open-link'),
                type: fileFolderLocalData.getAttribute('data-type'),
                file: fileFolderLocalData.getAttribute('data-file'),
                folder: fileFolderLocalData.getAttribute('data-folder'),
                access: fileFolderLocalData.getAttribute('data-access'),
                oneTimeOnly: fileFolderLocalData.getAttribute('data-one-time-only'),
                protection: fileFolderLocalData.getAttribute('data-protection'),
                passwordProtected: fileFolderLocalData.getAttribute('data-password-protected'),
                expires: fileFolderLocalData.getAttribute('data-expires'),
                otpSettingsTitle: fileFolderLocalData.getAttribute('data-otp-settings-title'),
                emailOtpProtection: fileFolderLocalData.getAttribute('data-email-otp-protection'),
                otpRequireDesc: fileFolderLocalData.getAttribute('data-otp-require-desc'),
                importantNotice: fileFolderLocalData.getAttribute('data-important-notice'),
                otpWarningDesc: fileFolderLocalData.getAttribute('data-otp-warning-desc'),
                otpWarningList1: fileFolderLocalData.getAttribute('data-otp-warning-list1'),
                otpWarningList2: fileFolderLocalData.getAttribute('data-otp-warning-list2'),
                otpWarningList3: fileFolderLocalData.getAttribute('data-otp-warning-list3'),
                otpWarningList4: fileFolderLocalData.getAttribute('data-otp-warning-list4'),
                otpWarningFooter: fileFolderLocalData.getAttribute('data-otp-warning-footer'),
                requireDownload: fileFolderLocalData.getAttribute('data-require-download'),
                requirePreview: fileFolderLocalData.getAttribute('data-require-preview'),
                sharedLinkManagement: fileFolderLocalData.getAttribute('data-shared-link-management'),
                deleteSharedLinkDesc: fileFolderLocalData.getAttribute('data-delete-shared-link-desc'),
                deleteSharedLinkBtn: fileFolderLocalData.getAttribute('data-delete-shared-link-btn'),
                disableOtpHeader: fileFolderLocalData.getAttribute('data-disable-otp-header'),
                disableOtpDesc: fileFolderLocalData.getAttribute('data-disable-otp-desc'),
                sendOtp: fileFolderLocalData.getAttribute('data-send-otp'),
                disable: fileFolderLocalData.getAttribute('data-disable'),
                otpDuration: fileFolderLocalData.getAttribute('data-otp-duration'),
                securityStats: fileFolderLocalData.getAttribute('data-security-stats'),
                totalAccesses: fileFolderLocalData.getAttribute('data-total-accesses'),
                lastAccess: fileFolderLocalData.getAttribute('data-last-access'),
                updateSettings: fileFolderLocalData.getAttribute('data-update-settings'),
                enableOtp: fileFolderLocalData.getAttribute('data-enable-otp'),
                otpDisabledTitle: fileFolderLocalData.getAttribute('data-otp-disabled-title'),
                otpDisabledDesc: fileFolderLocalData.getAttribute('data-otp-disabled-desc'),
                otpVerifyTitle: fileFolderLocalData.getAttribute('data-otp-verify-title'),
                otpVerifyDesc: fileFolderLocalData.getAttribute('data-otp-verify-desc'),
                otpCode: fileFolderLocalData.getAttribute('data-otp-code'),
                verifyAnd: fileFolderLocalData.getAttribute('data-verify-and'),
                sending: fileFolderLocalData.getAttribute('data-sending'),
                otpSentCheck: fileFolderLocalData.getAttribute('data-otp-sent-check'),
                lblMinutes: fileFolderLocalData.getAttribute('data-lbl-minutes'),
                phEnterOtp: fileFolderLocalData.getAttribute('data-ph-enter-otp'),
                msgOtpEnabledSuccess: fileFolderLocalData.getAttribute('data-msg-otp-enabled-success'),
                msgOtpDisabledSuccess: fileFolderLocalData.getAttribute('data-msg-otp-disabled-success'),
                msgOtpUpdateSuccess: fileFolderLocalData.getAttribute('data-msg-otp-update-success'),
                msgOtpUpdateFailed: fileFolderLocalData.getAttribute('data-msg-otp-update-failed'),
                msgOtpDisableFailed: fileFolderLocalData.getAttribute('data-msg-otp-disable-failed'),
                msgEmailVerifyReq: fileFolderLocalData.getAttribute('data-msg-email-verify-req'),
                msgEmailVerifyDesc: fileFolderLocalData.getAttribute('data-msg-email-verify-desc'),
                btnVerifyEmail: fileFolderLocalData.getAttribute('data-btn-verify-email'),
                msgSharedFilesDesc: fileFolderLocalData.getAttribute('data-msg-shared-files-desc'),
                lblFiles: fileFolderLocalData.getAttribute('data-lbl-files'),
                provider: fileFolderLocalData.getAttribute('data-provider'),
                status: fileFolderLocalData.getAttribute('data-status'),
                encrypted: fileFolderLocalData.getAttribute('data-encrypted'),
                redundancy: fileFolderLocalData.getAttribute('data-redundancy'),
                copyHash: fileFolderLocalData.getAttribute('data-copy-hash'),
                fileName: fileFolderLocalData.getAttribute('data-file-name'),
                msgLoadSharedFailed: fileFolderLocalData.getAttribute('data-msg-load-shared-failed'),
                msgTrashEmptyFailed: fileFolderLocalData.getAttribute('data-msg-trash-empty-failed'),
                msgPermDeleteFailed: fileFolderLocalData.getAttribute('data-msg-perm-delete-failed'),
                msgRestoreFailed: fileFolderLocalData.getAttribute('data-msg-restore-failed'),
                msgShareLinkFailed: fileFolderLocalData.getAttribute('data-msg-share-link-failed'),
                msgVecRestoreSuccess: fileFolderLocalData.getAttribute('data-msg-vec-restore-success'),
                msgVecRestoreFailed: fileFolderLocalData.getAttribute('data-msg-vec-restore-failed'),
                msgSharedLinkDeleteFailed: fileFolderLocalData.getAttribute('data-msg-shared-link-delete-failed'),
                msgFileAccessFailed: fileFolderLocalData.getAttribute('data-msg-file-access-failed'),
                msgOtpVerifyFailed: fileFolderLocalData.getAttribute('data-msg-otp-verify-failed'),
                msgArwValidating: fileFolderLocalData.getAttribute('data-msg-arw-validating'),
                msgArwReady: fileFolderLocalData.getAttribute('data-msg-arw-ready'),
                msgArwAutoSelectFailed: fileFolderLocalData.getAttribute('data-msg-arw-auto-select-failed'),
                vecRemovedTitle: fileFolderLocalData.getAttribute('data-vec-removed-title'),
                vecRemovalFailedTitle: fileFolderLocalData.getAttribute('data-vec-removal-failed-title'),
                vecProcessingStartedTitle: fileFolderLocalData.getAttribute('data-vec-processing-started-title'),
                vecProcessingFailedTitle: fileFolderLocalData.getAttribute('data-vec-processing-failed-title'),
                msgVecRemovalFailed: fileFolderLocalData.getAttribute('data-msg-vec-removal-failed'),
                msgVecProcessingFailed: fileFolderLocalData.getAttribute('data-msg-vec-processing-failed'),
            };
        }
    </script>

    <div 
        id="upload-localization-data" 
        class="hidden" 
        data-drag-drop="{{ __('auth.db_drag_drop') }}"
        data-max-file-size="{{ __('auth.db_max_file_size') }}"
        data-subscribe-premium="{{ __('auth.upload_subscribe_premium') }}"
        data-no-valid-files="{{ __('auth.upload_no_valid_files') }}"
        data-no-files-selected="{{ __('auth.upload_no_files_selected') }}"
        data-invalid-files="{{ __('auth.upload_invalid_files') }}"
        data-all-failed="{{ __('auth.upload_all_failed') }}"
        data-success-all="{{ __('auth.upload_success_all') }}"
        data-partial-success="{{ __('auth.upload_partial_success') }}"
        data-rejected-type="{{ __('auth.upload_rejected_type') }}"
        data-rejected-size="{{ __('auth.upload_rejected_size') }}"
        data-files-selected="{{ __('auth.upload_files_selected') }}"
        data-total-size="{{ __('auth.upload_total_size') }}"
        data-files-header="{{ __('auth.upload_files_header') }}"
        data-val-premium-req="{{ __('auth.val_premium_req') }}"
        data-val-ai-info="{{ __('auth.val_ai_info') }}"
        data-val-type-warn="{{ __('auth.val_type_warn') }}"
        data-val-cannot-proceed="{{ __('auth.val_cannot_proceed') }}"
        data-val-warnings="{{ __('auth.val_warnings') }}"
        data-val-details="{{ __('auth.val_details') }}"
        data-val-ready="{{ __('auth.val_ready') }}"
        data-val-passed="{{ __('auth.val_passed') }}"
        data-dup-title="{{ __('auth.dup_title') }}"
        data-dup-desc="{{ __('auth.dup_desc') }}"
        data-dup-existing="{{ __('auth.dup_existing') }}"
        data-dup-modified="{{ __('auth.dup_modified') }}"
        data-dup-replace="{{ __('auth.dup_replace') }}"
        data-dup-replace-desc="{{ __('auth.dup_replace_desc') }}"
        data-dup-keep="{{ __('auth.dup_keep') }}"
        data-dup-keep-desc="{{ __('auth.dup_keep_desc') }}"
        data-cancel="{{ __('auth.cancel') }}"
        data-upload="{{ __('auth.db_upload') }}"
        data-ai-process="{{ __('auth.db_ai_process') }}"
    ></div>

    <script>
        // Initialize upload localization
        const uploadLocalData = document.getElementById('upload-localization-data');
        if (uploadLocalData) {
            window.I18N = window.I18N || {};
            window.I18N.upload = {
                dragDrop: uploadLocalData.getAttribute('data-drag-drop'),
                maxFileSize: uploadLocalData.getAttribute('data-max-file-size'),
                subscribePremium: uploadLocalData.getAttribute('data-subscribe-premium'),
                noValidFiles: uploadLocalData.getAttribute('data-no-valid-files'),
                noFilesSelected: uploadLocalData.getAttribute('data-no-files-selected'),
                invalidFiles: uploadLocalData.getAttribute('data-invalid-files'),
                allFailed: uploadLocalData.getAttribute('data-all-failed'),
                successAll: uploadLocalData.getAttribute('data-success-all'),
                partialSuccess: uploadLocalData.getAttribute('data-partial-success'),
                rejectedType: uploadLocalData.getAttribute('data-rejected-type'),
                rejectedSize: uploadLocalData.getAttribute('data-rejected-size'),
                filesSelected: uploadLocalData.getAttribute('data-files-selected'),
                totalSize: uploadLocalData.getAttribute('data-total-size'),
                filesHeader: uploadLocalData.getAttribute('data-files-header'),
                valPremiumReq: uploadLocalData.getAttribute('data-val-premium-req'),
                valAiInfo: uploadLocalData.getAttribute('data-val-ai-info'),
                valTypeWarn: uploadLocalData.getAttribute('data-val-type-warn'),
                valCannotProceed: uploadLocalData.getAttribute('data-val-cannot-proceed'),
                valWarnings: uploadLocalData.getAttribute('data-val-warnings'),
                valDetails: uploadLocalData.getAttribute('data-val-details'),
                valReady: uploadLocalData.getAttribute('data-val-ready'),
                valPassed: uploadLocalData.getAttribute('data-val-passed'),
                dupTitle: uploadLocalData.getAttribute('data-dup-title'),
                dupDesc: uploadLocalData.getAttribute('data-dup-desc'),
                dupExisting: uploadLocalData.getAttribute('data-dup-existing'),
                dupModified: uploadLocalData.getAttribute('data-dup-modified'),
                dupReplace: uploadLocalData.getAttribute('data-dup-replace'),
                dupReplaceDesc: uploadLocalData.getAttribute('data-dup-replace-desc'),
                dupKeep: uploadLocalData.getAttribute('data-dup-keep'),
                dupKeepDesc: uploadLocalData.getAttribute('data-dup-keep-desc'),
                cancel: uploadLocalData.getAttribute('data-cancel'),
                upload: uploadLocalData.getAttribute('data-upload'),
                aiProcess: uploadLocalData.getAttribute('data-ai-process')
            };
        }
    </script>

<div 
        id="blockchain-localization-data" 
        class="hidden" 
        data-total-files="{{ __('auth.bc_total_files') }}"
        data-total-cost="{{ __('auth.bc_total_cost') }}"
        data-total-size="{{ __('auth.bc_total_size') }}"
        data-encrypted-count="{{ __('auth.bc_encrypted_count') }}"
        data-grid-view="{{ __('auth.bc_grid_view') }}"
        data-list-view="{{ __('auth.bc_list_view') }}"
        data-refresh-files="{{ __('auth.bc_refresh_files') }}"
        data-no-files-title="{{ __('auth.bc_no_files_title') }}"
        data-no-files-desc="{{ __('auth.bc_no_files_desc') }}"
        data-upload-btn="{{ __('auth.bc_upload_btn') }}"
        data-permanent="{{ __('auth.bc_permanent') }}"
        data-public="{{ __('auth.bc_public') }}"
        data-encrypted="{{ __('auth.bc_encrypted') }}"
        data-access-btn="{{ __('auth.bc_access_btn') }}"
        data-view-btn="{{ __('auth.bc_view_btn') }}"
        data-details-btn="{{ __('auth.bc_details_btn') }}"
        data-copy-url-btn="{{ __('auth.bc_copy_url_btn') }}"
        data-file-details-title="{{ __('auth.bc_file_details_title') }}"
        data-basic-info="{{ __('auth.bc_basic_info') }}"
        data-arweave-info="{{ __('auth.bc_arweave_info') }}"
        data-mime-type="{{ __('auth.bc_mime_type') }}"
        data-privacy="{{ __('auth.bc_privacy') }}"
        data-encryption-method="{{ __('auth.bc_encryption_method') }}"
        data-upload-cost="{{ __('auth.bc_upload_cost') }}"
        data-transaction-id="{{ __('auth.bc_transaction_id') }}"
        data-upload-date="{{ __('auth.bc_upload_date') }}"
        data-access-count="{{ __('auth.bc_access_count') }}"
        data-last-accessed="{{ __('auth.bc_last_accessed') }}"
        data-arweave-url="{{ __('auth.bc_arweave_url') }}"
        data-alt-gateways="{{ __('auth.bc_alt_gateways') }}"
        data-access-file-btn="{{ __('auth.bc_access_file_btn') }}"
        data-confirm-remove="{{ __('auth.bc_confirm_remove') }}"
        data-confirm-enable-perm="{{ __('auth.bc_confirm_enable_perm') }}"
        data-confirm-enable-perm-fee="{{ __('auth.bc_confirm_enable_perm_fee') }}"
        data-perm-enabled-success="{{ __('auth.bc_perm_enabled_success') }}"
        data-perm-enable-failed="{{ __('auth.bc_perm_enable_failed') }}"
        data-details-load-failed="{{ __('auth.bc_details_load_failed') }}"
        data-encrypt-sys-unavailable="{{ __('auth.bc_encrypt_sys_unavailable') }}"
        data-url-copied="{{ __('auth.bc_url_copied') }}"
        data-times="{{ __('auth.bc_times') }}"
        data-file-name="{{ __('auth.bc_file_name') }}"
        data-file-size="{{ __('auth.bc_file_size') }}"
        data-copy-failed="{{ __('auth.bc_copy_failed') }}"
        data-download-success="{{ __('auth.bc_download_success') }}"
        data-download-failed="{{ __('auth.bc_download_failed') }}"
        data-remove-success="{{ __('auth.bc_remove_success') }}"
        data-remove-failed="{{ __('auth.bc_remove_failed') }}"
        data-open-btn="{{ __('auth.bc_open_btn') }}"
    ></div>

    <script>
        const bcLocalData = document.getElementById('blockchain-localization-data');
        if (bcLocalData) {
            window.I18N = window.I18N || {};
            window.I18N.blockchain = {
                totalFiles: bcLocalData.getAttribute('data-total-files'),
                totalCost: bcLocalData.getAttribute('data-total-cost'),
                totalSize: bcLocalData.getAttribute('data-total-size'),
                encryptedCount: bcLocalData.getAttribute('data-encrypted-count'),
                gridView: bcLocalData.getAttribute('data-grid-view'),
                listView: bcLocalData.getAttribute('data-list-view'),
                refreshFiles: bcLocalData.getAttribute('data-refresh-files'),
                noFilesTitle: bcLocalData.getAttribute('data-no-files-title'),
                noFilesDesc: bcLocalData.getAttribute('data-no-files-desc'),
                uploadBtn: bcLocalData.getAttribute('data-upload-btn'),
                permanent: bcLocalData.getAttribute('data-permanent'),
                public: bcLocalData.getAttribute('data-public'),
                encrypted: bcLocalData.getAttribute('data-encrypted'),
                accessBtn: bcLocalData.getAttribute('data-access-btn'),
                viewBtn: bcLocalData.getAttribute('data-view-btn'),
                detailsBtn: bcLocalData.getAttribute('data-details-btn'),
                copyUrlBtn: bcLocalData.getAttribute('data-copy-url-btn'),
                fileDetailsTitle: bcLocalData.getAttribute('data-file-details-title'),
                basicInfo: bcLocalData.getAttribute('data-basic-info'),
                arweaveInfo: bcLocalData.getAttribute('data-arweave-info'),
                mimeType: bcLocalData.getAttribute('data-mime-type'),
                privacy: bcLocalData.getAttribute('data-privacy'),
                encryptionMethod: bcLocalData.getAttribute('data-encryption-method'),
                uploadCost: bcLocalData.getAttribute('data-upload-cost'),
                transactionId: bcLocalData.getAttribute('data-transaction-id'),
                uploadDate: bcLocalData.getAttribute('data-upload-date'),
                accessCount: bcLocalData.getAttribute('data-access-count'),
                lastAccessed: bcLocalData.getAttribute('data-last-accessed'),
                arweaveUrl: bcLocalData.getAttribute('data-arweave-url'),
                altGateways: bcLocalData.getAttribute('data-alt-gateways'),
                accessFileBtn: bcLocalData.getAttribute('data-access-file-btn'),
                confirmRemove: bcLocalData.getAttribute('data-confirm-remove'),
                confirmEnablePerm: bcLocalData.getAttribute('data-confirm-enable-perm'),
                confirmEnablePermFee: bcLocalData.getAttribute('data-confirm-enable-perm-fee'),
                permEnabledSuccess: bcLocalData.getAttribute('data-perm-enabled-success'),
                permEnableFailed: bcLocalData.getAttribute('data-perm-enable-failed'),
                detailsLoadFailed: bcLocalData.getAttribute('data-details-load-failed'),
                encryptSysUnavailable: bcLocalData.getAttribute('data-encrypt-sys-unavailable'),
                urlCopied: bcLocalData.getAttribute('data-url-copied'),
                times: bcLocalData.getAttribute('data-times'),
                fileName: bcLocalData.getAttribute('data-file-name'),
                fileSize: bcLocalData.getAttribute('data-file-size'),
                copyFailed: bcLocalData.getAttribute('data-copy-failed'),
                downloadSuccess: bcLocalData.getAttribute('data-download-success'),
                downloadFailed: bcLocalData.getAttribute('data-download-failed'),
                removeSuccess: bcLocalData.getAttribute('data-remove-success'),
                removeFailed: bcLocalData.getAttribute('data-remove-failed'),
                openBtn: bcLocalData.getAttribute('data-open-btn'),
            };
        }
    </script>

    <style>
    /* Search placeholder text - set for lower opacity */
    #mainSearchInput::placeholder, #newFolderNameInput::placeholder {
        color: rgba(255, 255, 255, 0.5);
        opacity: 1;
    }

    /* Grid View/List View button */
    .view-toggle-btn {
        background-color: #3C3F58 !important;
        border-color: #55597C !important;
        /* color: #9CA3AF; */
        transition: filter 0.2s ease;
    }
    .view-toggle-btn:hover {
        filter: brightness(1.1);
    }
    .view-toggle-btn.active {
        background-color: #55597C !important;
        border-color: #6B7280 !important;
        color: #FFFFFF !important;
    }

    /* /close.png */
    .close-button img, .dropzone-img img {
        filter: brightness(0) saturate(100%) invert(30%) sepia(10%) saturate(1200%) hue-rotate(210deg) brightness(120%);
        transition: filter 0.2s ease;
    }
    .close-button:hover img, .dropzone-border:hover .dropzone-img img {
        filter: brightness(0) saturate(100%) invert(30%) sepia(10%) saturate(1200%) hue-rotate(210deg) brightness(150%); 
    }

    /* Upload dropzone */
    .dropzone-border, .dropzone-text {
        border-color: #605a80; color: #605a80; font-weight: 500;
        transition: border-color 0.2s ease, color 0.2s ease;
    }
    .dropzone-border:hover, .dropzone-border:hover .dropzone-text {
        border-color: #776f9e; color: #776f9e; font-weight: 500;
    }

    /* Confirm button - New Modals */
    .confirm-button {
        background-color: #f89c00; color: black; font-weight: 600;
        transition: filter 0.2s ease;
    }
    .confirm-button:hover {
        filter: brightness(110%);
    }

    /* Cancel button - New Modals */
    .cancel-button {
        background-color: #3C3F58; color: rgba(255, 255, 255, 0.5);; font-weight: 400;
        transition: background-color 0.2s ease;
    }
    .cancel-button:hover {
        background-color: #55597C;
    }
    </style>
    <div id="filesContainer" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div class="p-4 text-center text-text-secondary col-span-full">Loading files...</div>
    </div>

    <style>
    .file-card, .file-row {
        background-color: #24243B !important;
        border-style: solid !important;
        border-width: 2px !important;
        border-color: #3C3F58 !important;
    }
    .file-card.bg-white, .file-card[class*="bg-"], .file-card.bg-white, .file-card[class*="bg-"] {
        background-color: #24243B !important;
    }
    .file-card:hover, .file-row:hover {
        background-color: #3C3F58 !important;
        border-style: solid !important;
        border-width: 2px !important;
        border-color: #55597C !important;
    }
    </style>
    <!--  Reserved colors: 3C3F58, 24243B
      .file-card:hover {background-color: #24243B !important;}
    -->

</main>

<!-- N8N Chat floating in bottom-right -->
<div id="n8n-chat-container" style="position:fixed;bottom:24px;right:24px;z-index:9999;"></div>
</div>

<!-- Advanced Search Modal -->
<div id="advancedSearchModal" class="fixed inset-0 z-50 hidden items-center justify-center">
    <div style="background-color: #141326; opacity: 0.8;" class="fixed inset-0 transition-opacity"></div>
    <div class="relative bg-[#24243B] text-white rounded-lg shadow-xl w-full max-w-4xl p-6 z-10 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">{{ __('auth.db_advanced_search') }}</h3>
            <button id="advancedSearchCloseBtn" class="text-2xl leading-none">&times;</button>
        </div>
        
        <form id="advancedSearchForm" class="space-y-8">
    <div class="flex items-center space-x-4">
        <div class="flex-grow">
            <input id="advancedSearchQuery" type="text" placeholder="{{ __('auth.db_enter_search_term') }}" 
                class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#55597C]" />
        </div>
        <div>
             <button type="button" id="clearSearchFilters" class="text-gray-400 hover:text-white text-sm font-medium">{{ __('auth.db_clear_filters') }}</button>
        </div>
    </div>
    
   <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
            <label for="searchMatchType" class="text-opacity-80 block text-sm text-gray-400 font-medium mb-2">{{ __('auth.db_match_type') }}</label>
            <select id="searchMatchType" class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none text-white appearance-none bg-no-repeat" style="background-image: url('{{ asset('caret-down.png') }}'); background-position: right 1rem center; background-size: 0.5rem;">
                <option value="contains">{{ __('auth.db_contains') }}</option>
                <option value="exact">{{ __('auth.db_exact_match') }}</option>
                <option value="starts_with">{{ __('auth.db_starts_with') }}</option>
                <option value="ends_with">{{ __('auth.db_ends_with') }}</option>
            </select>
        </div>
   
      <div>
            <label for="searchCaseSensitive" class="block text-sm text-gray-400 font-medium mb-2">{{ __('auth.db_case_sensitivity') }}</label>
            <select id="searchCaseSensitive" class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none text-white appearance-none bg-no-repeat" style="background-image: url('{{ asset('caret-down.png') }}'); background-position: right 1rem center; background-size: 0.5rem;">
                <option value="insensitive">{{ __('auth.db_case_insensitive') }}</option>
                <option value="sensitive">{{ __('auth.db_case_sensitive') }}</option>
            </select>
        </div>
        <div>
            <label for="searchFileType" class="block text-sm font-medium text-gray-400 mb-2">{{ __('auth.db_file_types') }}</label>
       <select id="searchFileType" class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none text-white appearance-none bg-no-repeat" style="background-image: url('{{ asset('caret-down.png') }}'); background-position: right 1rem center; background-size: 0.5rem;">
                <option value="">{{ __('auth.db_all_types') }}</option>
                <option value="images">{{ __('auth.db_ft_images') }}</option>
                <option value="documents">{{ __('auth.db_ft_documents') }}</option>
                <option value="spreadsheets">{{ __('auth.db_ft_spreadsheets') }}</option>
                <option value="presentations">{{ __('auth.db_ft_presentations') }}</option>
                <option value="videos">{{ __('auth.db_ft_videos') }}</option>
                <option value="audio">{{ __('auth.db_ft_audio') }}</option>
                <option value="folders">{{ __('auth.db_ft_folders') }}</option>
                <option value="files">{{ __('auth.db_ft_files_only') }}</option>
            </select>
        </div>

        <div>
            <label for="searchDateFrom" class="block text-sm text-gray-400 font-medium mb-2">{{ __('auth.db_date_from') }}</label>
            <input id="searchDateFrom" type="text" placeholder="YYYY/MM/DD" onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'"
                   class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none text-white" />
        </div>
        <div>
            <label for="searchSizeMin" class="block text-sm text-gray-400 font-medium mb-2">{{ __('auth.db_min_size') }}</label>
            <input id="searchSizeMin" type="number" min="0" placeholder="0" step="0.1" 
                   class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none text-white placeholder-gray-400" />
        </div>
        <div>
            <label for="searchSortBy" class="block text-sm text-gray-400 font-medium mb-2">{{ __('auth.db_sort_by') }}</label>
            <select id="searchSortBy" class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] 
border-none text-white appearance-none bg-no-repeat" style="background-image: url('{{ asset('caret-down.png') }}'); background-position: right 1rem center; background-size: 0.5rem;">
                <option value="updated_at">{{ __('auth.db_last_modified') }}</option>
                <option value="created_at">{{ __('auth.db_date_created') }}</option>
                <option value="file_name">{{ __('auth.db_name') }}</option>
                <option value="file_size">{{ __('auth.db_size') }}</option>
                <option value="file_type">{{ __('auth.db_type') }}</option>
            </select>
         </div>

        <div>
            <label for="searchDateTo" class="block text-sm text-gray-400 font-medium mb-2">{{ __('auth.db_date_to') }}</label>
            <input id="searchDateTo" type="text" placeholder="YYYY/MM/DD" onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'"
                   class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none text-white" />
        </div>
 
       <div>
            <label for="searchSizeMax" class="block text-sm text-gray-400 font-medium mb-2">{{ __('auth.db_max_size') }}</label>
            <input id="searchSizeMax" type="number" min="0" placeholder="1000" step="0.1"
                   class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none text-white placeholder-gray-400" />
        </div>
        <div>
            <label for="searchSortOrder" class="block text-sm text-gray-400 font-medium mb-2">{{ __('auth.db_sort_order') }}</label>
            <select id="searchSortOrder" class="w-full py-3 px-4 rounded-lg bg-[#3C3F58] border-none 
text-white appearance-none bg-no-repeat" style="background-image: url('{{ asset('caret-down.png') }}'); background-position: right 1rem center; background-size: 0.5rem;">
                 <option value="desc">{{ __('auth.db_newest_first') }}</option>
                <option value="asc">{{ __('auth.db_oldest_first') }}</option>
            </select>
        </div>
    </div>

    <div class="flex justify-end items-center pt-4">
        <div class="flex items-center space-x-4">
            <button type="button" id="cancelAdvancedSearch" class="py-3 px-6 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
                {{ __('auth.cancel') }}
         </button>
            <button type="submit" class="py-3 px-8 rounded-lg text-sm font-bold text-black bg-[#f89c00] hover:brightness-110 transition">
                {{ __('auth.db_search_btn') }}
            </button>
        </div>
    </div>
</form>
    </div>
</div>


<!-- Version History Modal - REMOVED -->

<!-- Premium Upgrade Modal -->
<div id="premiumUpgradeModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-10000">
    <div class="bg-[#1F2235] border border-[#4A4D6A] rounded-xl p-6 max-w-md mx-4">
        <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-[#f89c00] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">👑</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">{{ __('auth.db_premium_feature') }}</h3>
            <p id="premiumModalText" class="text-gray-400 mb-6">
             {{ __('auth.db_premium_required_desc') }}
            </p>
            <div class="space-y-3">
                <a href="{{ route('premium.upgrade') }}"
                        class="w-full bg-[#f89c00] hover:bg-[#e88900] text-white py-3 px-6 rounded-lg font-bold transition-colors">
                    {{ __('auth.db_upgrade_btn') }}
                </a>
                <button onclick="window.closePremiumModal()" 
                        class="w-full bg-[#3C3F58] hover:bg-[#4A4D6A] text-white py-3 px-6 rounded-lg transition-colors">
                    {{ __('auth.db_maybe_later') }}
                </button>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
    // Pass user premium status to JavaScript
    window.userIsPremium = {{ auth()->user()->is_premium ? 'true' : 'false' }};
    
    // Pass user data to JavaScript
    window.authUser = {
        id: {{ auth()->user()->id }},
        name: "{{ auth()->user()->name }}",
        email: "{{ auth()->user()->email }}",
        is_premium: {{ auth()->user()->is_premium ? 'true' : 'false' }}
    };
    
    // Handle folder navigation from share redirects
    @if(session('navigate_to_folder'))
        document.addEventListener('DOMContentLoaded', function() {
            // Wait for the file-folder module to be loaded
            setTimeout(function() {
                if (window.__files && window.__files.navigateToFolder) {
                    console.log('Navigating to folder from share redirect:', {{ session('navigate_to_folder') }});
                    window.__files.navigateToFolder({{ session('navigate_to_folder') }}, "{{ session('folder_name', 'Folder') }}");
                } else {
                    console.error('navigateToFolder function not available');
                }
            }, 2000);
        });
    @endif
    
    @if(session('navigate_to_parent'))
        document.addEventListener('DOMContentLoaded', function() {
            // Wait for the file-folder module to be loaded
            setTimeout(function() {
                if (window.__files && window.__files.navigateToFolder) {
                    console.log('Navigating to parent folder from share redirect:', {{ session('navigate_to_parent') }});
                    window.__files.navigateToFolder({{ session('navigate_to_parent') ?? 'null' }}, "Parent Folder");
                    // TODO: Select the specific file after navigation
                } else {
                    console.error('navigateToFolder function not available');
                }
            }, 2000); // Increased timeout to ensure module is loaded
        });
    @endif
</script>


<!-- Include Client-Side Arweave Modal -->
@include('modals.client-arweave-modal')

@endsection

@push('scripts')
    @vite(['resources/js/dashboard.js'])
@endpush

</body>

<!-- Inline scripts moved to modules/ui.js for better maintainability -->

</html>