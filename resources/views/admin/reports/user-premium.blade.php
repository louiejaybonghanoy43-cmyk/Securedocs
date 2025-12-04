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
            <div id="profileDropdown"
            class="absolute top-[54px] right-0 w-[280px] bg-[#3C3F58] text-white rounded-lg shadow-lg z-50 opacity-0 invisible translate-y-[-10px] transition-all duration-200">
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
                        
                        <div id="headerLanguageSubmenu2" style="background-color: #3c3f58; border: 3px solid #1F1F33" class="absolute right-full top-0 mt-0 mr-2 w-[140px] rounded-lg shadow-xl overflow-hidden transition-all duration-200 opacity-0 invisible pointer-events-none translate-x-[10px] z-50"> 
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
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-semibold text-white">{{ $title }}</h1>
                <p class="text-gray-300 mt-2">{{ __('auth.rep_generated_on') }} {{ $generated_at->format('F j, Y \a\t g:i A') }}</p>
            </div>
            <div class="flex space-x-3">
                <a href="{{ route('admin.reports.index') }}" 
                   class="bg-[#3C3F58] hover:bg-[#55597C] text-white px-4 py-2 rounded-md text-sm font-medium transition">
                    {{ __('auth.rep_back_btn') }}
                </a>
                <a href="{{ route('admin.reports.user-premium', ['format' => 'pdf']) }}" 
                   class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                    {{ __('auth.rep_download_pdf') }}
                </a>

            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="section-border rounded-lg p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-blue-600 rounded-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-300">{{ __('auth.rep_stat_total') }}</p>
                        <p class="text-2xl font-bold text-white">{{ number_format($summary['total_users']) }}</p>
                    </div>
                </div>
            </div>

            <div class="section-border rounded-lg p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-green-600 rounded-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-300">{{ __('auth.db_premium_users') }}</p>
                        <p class="text-2xl font-bold text-[#f89c00]">{{ number_format($summary['premium_users']) }}</p>
                    </div>
                </div>
            </div>

            <div class="section-border rounded-lg p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-gray-600 rounded-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-300">{{ __('auth.db_standard_users') }}</p>
                        <p class="text-2xl font-bold text-gray-300">{{ number_format($summary['standard_users']) }}</p>
                    </div>
                </div>
            </div>

            <div class="section-border rounded-lg p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-purple-600 rounded-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-300">{{ __('auth.rep_premium_percent') }}</p>
                        <p class="text-2xl font-bold text-purple-400">{{ $summary['premium_percentage'] }}%</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-border rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-white mb-4">{{ __('auth.rep_monthly_breakdown') }}</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-600">
                    <thead class="bg-[#3C3F58]">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_col_month') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_stat_total') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.db_premium') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.db_standard') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_prem_percent_col') }}</th>
                        </tr>
                    </thead>
                    <tbody class="bg-[#24243B] divide-y divide-gray-600">
                        @foreach($monthly_data as $month)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{{ $month['month'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ number_format($month['total']) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#f89c00]">{{ number_format($month['premium']) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ number_format($month['standard']) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-400">
                                {{ $month['total'] > 0 ? round(($month['premium'] / $month['total']) * 100, 1) : 0 }}%
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <div class="section-border rounded-lg">
            <div class="px-6 py-4 border-b border-gray-600">
                <h3 class="text-lg font-semibold text-white">{{ __('auth.rep_detailed_list') }}</h3>
                <p class="text-sm text-gray-300 mt-1">{{ __('auth.rep_detailed_desc') }}</p>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-600">
                    <thead class="bg-[#3C3F58]">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_col_user') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_col_email') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_col_status') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_col_role') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_col_approved') }}</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ __('auth.rep_col_joined') }}</th>
                        </tr>
                    </thead>
                    <tbody class="bg-[#24243B] divide-y divide-gray-600">
                        @foreach($users as $user)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-white">{{ $user['name'] ?: __('auth.rep_unknown_user') }}</div>
                                <div class="text-sm text-gray-400">ID: {{ $user['id'] }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ $user['email'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($user['is_premium'])
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white">
                                        {{ __('auth.db_premium') }}
                                    </span>
                                @else
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-600 text-white">
                                        {{ __('auth.db_standard') }}
                                    </span>
                                @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{{ $user['role'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($user['is_approved'])
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white">
                                        {{ __('auth.au_yes') }}
                                    </span>
                                @else
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-600 text-white">
                                        {{ __('auth.rep_pending') }}
                                    </span>
                                @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ $user['created_at']->format('M j, Y') }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </main>

<style>

</style>

<script>
// Profile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
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
            
            // Re-add overflow hidden when closing profile
            if (menuId === 'profileDropdown') {
                menuEl.classList.add('overflow-hidden');
            }
            
            // Close nested language menu if profile closes
            if (menuId === 'profileDropdown') {
                closeDropdown('headerLanguageSubmenu2');
            }
            
            if (caretEl) {
                caretEl.classList.remove('rotate-180');
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

                // If opening profile, close language menu
                if (dropdownId === 'profileDropdown') {
                    closeDropdown('headerLanguageSubmenu2');
                }

                if (isHidden) {
                    dropdown.classList.remove('opacity-0', 'invisible', 'pointer-events-none', 'translate-y-[-10px]');
                    
                    // Remove overflow hidden from profile so language menu can pop out
                    if (dropdownId === 'profileDropdown') {
                        dropdown.classList.remove('overflow-hidden');
                    }
                    
                    if (caret) {
                        caret.classList.add('rotate-180');
                    }
                } else {
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