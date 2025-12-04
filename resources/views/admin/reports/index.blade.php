@extends('layouts.admin')

@section('content')
    {{-- Header --}}
    <header style="background-color: #141326;" class="col-span-2 flex items-center px-4 z-10">
        <div style="margin-bottom: 13px;" class="ml-4 flex items-center space-x-3 mr-10">
            <img src="{{ asset('logo-white.png') }}" alt="SecureDocs logo" class="w-8 h-8" style="margin-top:20px;">
            <div style="padding-right: 30px;" class="flex flex-col relative">
                <div class="text-white text-l font-bold">SECURE<span class="text-[#f89c00]">DOCS</span></div>
                <div class="absolute top-full text-xs text-gray-400">{{ __('auth.admin_badge') }}</div>
            </div>
        </div>

        {{-- Spacer --}}
        <div class="flex-grow"></div>

        {{-- Admin Profile/Logout --}}
        <div class="relative inline-block mr-2">
            <div id="userProfileBtn"
                class="w-10 h-10 rounded-full flex items-center justify-center text-xl mr-2 cursor-pointer transition"
                style="background-color: #3C3F58;"
                onmouseover="this.style.filter='brightness(1.1)';"
                onmouseout="this.style.filter='';">
                <img src="{{ asset('user-shape.png') }}" alt="Profile" class="w-6 h-6 object-contain">
            </div>
            
            {{-- NOTE: overflow-hidden is KEPT here as requested. JS will toggle it. --}}
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
                    <li class="h-px my-1 ml-4 mr-4" style="background-color: #55597C;"></li>
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
                            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="w-2 h-2 mr-2 transition-transform duration-200" id="langCaret"> 
                        </div> 
                        
                        <div id="headerLanguageSubmenu2" style="background-color: #3c3f58; border: 3px solid #1F1F33" class="absolute right-0 mr-4 top-full mt-2 w-[140px] rounded-lg shadow-xl overflow-hidden transition-all duration-200 opacity-0 invisible pointer-events-none translate-y-[-10px] z-50"> 
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
                    <li class="h-px my-1 ml-4 mr-4" style="background-color: #55597C;"></li>
                </ul>
                <div class="mb-4 mt-4 border-border-color text-center">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit"
                            class="bg-[#f89c00] px-8 text-black font-bold py-2 rounded-full cursor-pointer hover:brightness-110 transition">{{ __('auth.db_logout') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </header>

    {{-- Sidebar --}}
    <div id="adminSidebar" style="background-color: #141326;" class="py-4 overflow-y-auto">
        <div class="px-6 py-3 mb-4">
            <h2 class="text-lg font-semibold text-white">{{ __('auth.db_admin_menu') }}</h2>
        </div>
        <ul id="sidebar" class="mt-4">
            <a href="{{ route('admin.dashboard') }}"
                class="py-3 px-6 flex items-center cursor-pointer rounded-r-2xl mr-4 {{ request()->routeIs('admin.dashboard') ? 'activeTab' : '' }}">
                <img src="{{ asset('graph-bar.png') }}" alt="Dashboard" class="mr-4 w-5 h-5">
                <span class="text-sm">{{ __('auth.db_dashboard') }}</span>
            </a>
            <a href="{{ route('admin.users') }}"
            class="py-3 px-6 flex items-center cursor-pointer rounded-r-2xl mr-4 {{ request()->routeIs('admin.users') ? 'activeTab' : '' }}">
                <img src="{{ asset('people.png') }}" alt="Manage Users" class="mr-4 w-5 h-5">
                <span class="text-sm">{{ __('auth.db_manage_users') }}</span>
            </a>
            <a class="activeTab py-3 px-6 flex items-center cursor-pointer rounded-r-2xl mr-4">
                <img src="{{ asset('graph-bar.png') }}" alt="Reports" class="mr-4 w-5 h-5">
                <span class="text-sm">{{ __('auth.admin_menu_reports') }}</span>
            </a>
        </ul>
    </div>

    {{-- Main Content --}}
    <main style="background-color: #24243B; border-top-left-radius: 32px; margin-left: 13px;" class="p-6 overflow-y-auto">
        <h1 class="text-2xl font-semibold text-white mb-6">{{ __('auth.rep_header') }}</h1>
        <p class="text-gray-300 mb-6">{{ __('auth.rep_desc') }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="section-border rounded-lg p-6">
                <div class="flex items-center mb-4">
                    <div class="p-3 bg-blue-600 rounded-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-white">{{ __('auth.rep_user_prem_title') }}</h3>
                        <p class="text-sm text-gray-300">{{ __('auth.rep_user_prem_desc') }}</p>
                    </div>
                </div>
                <div class="flex space-x-3">
                    <a href="{{ route('admin.reports.user-premium') }}" 
                       class="flex-1 bg-[#f89c00] hover:brightness-110 text-black px-4 py-2 rounded-md text-sm font-medium text-center transition">
                        {{ __('auth.rep_view_report') }}
                    </a>
                    <a href="{{ route('admin.reports.user-premium', ['format' => 'pdf']) }}" 
                       class="bg-[#3C3F58] hover:bg-[#55597C] text-white px-4 py-2 rounded-md text-sm font-medium transition">
                        {{ __('auth.rep_pdf') }}
                    </a>
                </div>
            </div>

            <div class="section-border rounded-lg p-6">
                <div class="flex items-center mb-4">
                    <div class="p-3 bg-green-600 rounded-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-white">{{ __('auth.rep_custom_title') }}</h3>
                        <p class="text-sm text-gray-300">{{ __('auth.rep_custom_desc') }}</p>
                    </div>
                </div>
                <button onclick="toggleCustomReportForm()" 
                        class="w-full bg-[#f89c00] hover:brightness-110 text-black px-4 py-2 rounded-md text-sm font-medium transition">
                    {{ __('auth.rep_create_custom_btn') }}
                </button>
            </div>

            <div class="section-border rounded-lg p-6">
                <div class="flex items-center mb-4">
                    <div class="p-3 bg-purple-600 rounded-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-white">{{ __('auth.rep_quick_stats') }}</h3>
                        <p class="text-sm text-gray-300">{{ __('auth.rep_stats_desc') }}</p>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-300">{{ __('auth.rep_stat_total') }}</span>
                        <span class="font-medium text-white" id="total-users">{{ __('auth.rep_loading') }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-300">{{ __('auth.rep_stat_prem') }}</span>
                        <span class="font-medium text-[#f89c00]" id="premium-users">{{ __('auth.rep_loading') }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-300">{{ __('auth.rep_stat_std') }}</span>
                        <span class="font-medium text-gray-300" id="standard-users">{{ __('auth.rep_loading') }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="custom-report-form" class="hidden section-border rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-white mb-4">{{ __('auth.rep_custom_gen_title') }}</h3>
            <form action="{{ route('admin.reports.custom') }}" method="GET" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label for="date_from" class="block text-sm font-medium text-gray-300 mb-1">{{ __('auth.rep_from_date') }}</label>
                        <input type="date" id="date_from" name="date_from" 
                               class="w-full px-3 py-2 bg-[#3C3F58] border border-[#4A4D6A] text-white rounded-md shadow-sm focus:outline-none focus:ring-[#f89c00] focus:border-[#f89c00]">
                    </div>
                    <div>
                        <label for="date_to" class="block text-sm font-medium text-gray-300 mb-1">{{ __('auth.rep_to_date') }}</label>
                        <input type="date" id="date_to" name="date_to" 
                               class="w-full px-3 py-2 bg-[#3C3F58] border border-[#4A4D6A] text-white rounded-md shadow-sm focus:outline-none focus:ring-[#f89c00] focus:border-[#f89c00]">
                    </div>
                    <div>
                        <label for="user_type" class="block text-sm font-medium text-gray-300 mb-1">{{ __('auth.rep_user_type') }}</label>
                        <select id="user_type" name="user_type" 
                                class="w-full px-3 py-2 bg-[#3C3F58] border border-[#4A4D6A] text-white rounded-md shadow-sm focus:outline-none focus:ring-[#f89c00] focus:border-[#f89c00]">
                            <option value="all">{{ __('auth.rep_opt_all_users') }}</option>
                            <option value="premium">{{ __('auth.rep_opt_prem_only') }}</option>
                            <option value="standard">{{ __('auth.rep_opt_std_only') }}</option>
                        </select>
                    </div>
                    <div>
                        <label for="user_status" class="block text-sm font-medium text-gray-300 mb-1">{{ __('auth.rep_user_status') }}</label>
                        <select id="user_status" name="user_status" 
                                class="w-full px-3 py-2 bg-[#3C3F58] border border-[#4A4D6A] text-white rounded-md shadow-sm focus:outline-none focus:ring-[#f89c00] focus:border-[#f89c00]">
                            <option value="all">{{ __('auth.rep_opt_all_status') }}</option>
                            <option value="approved">{{ __('auth.rep_opt_approved') }}</option>
                            <option value="pending">{{ __('auth.rep_opt_pending') }}</option>
                        </select>
                    </div>
                </div>
                <div class="flex space-x-3">
                    <button type="submit" name="format" value="html" 
                            class="bg-[#f89c00] hover:brightness-110 text-black px-6 py-2 rounded-md text-sm font-medium transition">
                        {{ __('auth.rep_gen_report_btn') }}
                    </button>
                    <button type="submit" name="format" value="pdf" 
                            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition">
                        {{ __('auth.rep_gen_pdf_btn') }}
                    </button>
                    <button type="button" onclick="toggleCustomReportForm()" 
                            class="bg-[#3C3F58] hover:bg-[#55597C] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                        {{ __('auth.cancel') }}
                    </button>
                </div>
            </form>
        </div>
    </main>

<script>
function toggleCustomReportForm() {
    const form = document.getElementById('custom-report-form');
    form.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    // --- Quick Stats Logic ---
    const errorMsg = "{{ __('auth.rep_error') }}";
    
    fetch('{{ route("admin.metrics.users") }}')
        .then(response => response.json())
        .then(data => {
            const totalEl = document.getElementById('total-users');
            const premEl = document.getElementById('premium-users');
            const stdEl = document.getElementById('standard-users');
            
            if (totalEl) totalEl.textContent = data.totals.total_users.toLocaleString();
            if (premEl) premEl.textContent = data.totals.premium_users.toLocaleString();
            if (stdEl) stdEl.textContent = data.totals.standard_users.toLocaleString();
        })
        .catch(error => {
            console.error('Error loading stats:', error);
            const totalEl = document.getElementById('total-users');
            const premEl = document.getElementById('premium-users');
            const stdEl = document.getElementById('standard-users');
            
            if (totalEl) totalEl.textContent = errorMsg;
            if (premEl) premEl.textContent = errorMsg;
            if (stdEl) stdEl.textContent = errorMsg;
        });

    // --- Dropdown Logic (Matched with Admin Dashboard) ---
    const ALL_DROPDOWNS = [
        { menu: 'profileDropdown' },
        { menu: 'headerLanguageSubmenu2', caret: 'langCaret' },
    ];

    function closeDropdown(menuId) {
        const d = ALL_DROPDOWNS.find(item => item.menu === menuId);
        if (!d) return;

        const menuEl = document.getElementById(menuId);
        const caretEl = d.caret ? document.getElementById(d.caret) : null;
        
        if (menuEl && !menuEl.classList.contains('invisible')) {
            menuEl.classList.add('opacity-0', 'invisible', 'pointer-events-none', 'translate-y-[-10px]');
            
            // Re-add overflow hidden to maintain rounded corners when closed
            if (menuId === 'profileDropdown') {
                menuEl.classList.add('overflow-hidden');
            }
            
            if (caretEl) {
                caretEl.classList.remove('rotate-180');
            }
            
            // Close nested language menu
            if (menuId === 'profileDropdown') {
                closeDropdown('headerLanguageSubmenu2');
            }
        }
    }

    function toggleDropdown(btnId, dropdownId) {
        const btn = document.getElementById(btnId);
        const dropdown = document.getElementById(dropdownId);
        const d = ALL_DROPDOWNS.find(item => item.menu === dropdownId);
        const caret = d && d.caret ? document.getElementById(d.caret) : null;

        if (btn && dropdown) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = dropdown.classList.contains('invisible');

                // If opening profile, close language menu to reset state
                if (dropdownId === 'profileDropdown') {
                    closeDropdown('headerLanguageSubmenu2');
                }

                if (isHidden) {
                    // Open
                    dropdown.classList.remove('opacity-0', 'invisible', 'pointer-events-none', 'translate-y-[-10px]');
                    
                    // Remove overflow hidden from profile so language menu can pop out
                    if (dropdownId === 'profileDropdown') {
                        dropdown.classList.remove('overflow-hidden');
                    }

                    if (caret) {
                        caret.classList.add('rotate-180');
                    }
                } else {
                    // Close
                    closeDropdown(dropdownId);
                }
            });
        }
    }

    // Initialize Dropdowns
    setTimeout(() => {
        toggleDropdown('userProfileBtn', 'profileDropdown');
        toggleDropdown('headerLanguageToggle2', 'headerLanguageSubmenu2');
    }, 100);

    // Global Click Listener
    document.addEventListener('click', function(e) {
        const clickedInsideProfile = document.getElementById('userProfileBtn')?.contains(e.target) || 
                                   document.getElementById('profileDropdown')?.contains(e.target);
        const clickedInsideLanguage = document.getElementById('headerLanguageToggle2')?.contains(e.target) || 
                                    document.getElementById('headerLanguageSubmenu2')?.contains(e.target);
        
        if (!clickedInsideProfile && !clickedInsideLanguage) {
            closeDropdown('profileDropdown');
            closeDropdown('headerLanguageSubmenu2');
        }
    });
});
</script>

<style>
    #sidebar>a{background:#141326!important;color:#fff!important;transition:filter .15s;}
    #sidebar>a:hover{filter:brightness(1.5)!important;}
    #sidebar>a.activeTab{background:#2B2C61!important;color:#fff!important;}
    #sidebar>a.activeTab:hover{filter:none!important;}
    #sidebar>a *{color:inherit!important;}
    
    /* Section Border */
    .section-border { background-color: #24243B !important; border-style: solid !important; border-width: 2px !important; border-color: #3C3F58 !important;}
</style>
@endsection