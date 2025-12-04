<div class="fixed top-6 left-6 z-50 pt-4 pl-2">
    <button id="back-button" class="pl-4 ml-4 text-white p-3 rounded-full shadow-lg transition-colors">
        <img src="{{ asset('back-arrow.png') }}" alt="Back" class="w-5 h-5">
    </button>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const backButton = document.getElementById('back-button');
        
        // Hide button if there's no history to go back to
        if (window.history.length <= 1) {
            backButton.style.display = 'none';
        }
        
        backButton.addEventListener('click', function() {
            // Check if there's a previous page in history
            if (document.referrer && document.referrer !== window.location.href) {
                window.history.back();
            } else {
                // Fallback to home page if no referrer
                window.location.href = "{{ url('/') }}";
            }
        });
    });
</script>

<div class="fixed bottom-6 right-6 z-50">
    <div class="relative">
        <button id="language-toggle" class="bg-[#3c3f58] text-white p-3 rounded-full shadow-lg transition
            style="transition: background-color 0.2s;"
            onmouseover="this.style.backgroundColor='#55597C';"
            onmouseout="this.style.backgroundColor='';">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
        </button>

        <div id="language-dropdown" style="background-color: #3c3f58; border: 3px solid #1F1F33" class="absolute bottom-full right-0 mb-2 hidden bg-[#3c3f58] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
            <a href="{{ route('language.switch', 'en') }}"
                class="flex items-center px-4 py-3 text-sm transition-colors {{ app()->getLocale() == 'en' ? 'bg-[#f89c00] text-black font-bold' : 'text-white' }}"
                @if(app()->getLocale() != 'en')
                    style="transition: background-color 0.2s;"
                    onmouseover="this.style.backgroundColor='#55597C';"
                    onmouseout="this.style.backgroundColor='';"
                @endif>
                <span class="mr-2">🇺🇸</span>
                English
            </a>
            <a href="{{ route('language.switch', 'fil') }}"
                class="flex items-center px-4 py-3 text-sm transition-colors {{ app()->getLocale() == 'fil' ? 'bg-[#f89c00] text-black font-bold' : 'text-white' }}"
                @if(app()->getLocale() != 'fil')
                    style="transition: background-color 0.2s;"
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
    </div>
</div>

<script>
// Language Dropdown Toggle
document.addEventListener('DOMContentLoaded', function() {
        const toggleButton = document.getElementById('language-toggle');
        const dropdown = document.getElementById('language-dropdown');
        
        if (toggleButton && dropdown) {
            toggleButton.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdown.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!toggleButton.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.add('hidden');
                }
            });
        }
    });
</script>



<x-guest-layout>
<div class="absolute left-1/2 transform -translate-x-1/2 w-full " style="top: 60px;">
    {{-- New Flex Container to hold everything centrally --}}
    <div class="flex flex-col items-center justify-center w-full px-4" rounded-3xl>

        {{-- 1. The Logo Header (Previously in x-slot) --}}
        <a href="{{ url('/') }}">
            <header style="padding-top: 20px;" class="pt-2 flex flex-col items-center py-4">
                <div class="flex items-center space-x-3 pb-2">
                    <img src="{{ asset('logo-white.png') }}" alt="SecureDocs logo" class="w-12 h-12">
                    <h1 class="text-white text-xl font-bold">SECURE<span class="text-[#f89c00]">DOCS</span></h1>
                </div>
                <div class="mt-8 -mt-4 text-center">
                    <p class="text-[#f89c00] text-xl font-semibold tracking-wide">{{ __('auth.2fa_title') }}</p>
                </div>
            </header>
        </a>

        {{-- 3. New Max-Width Container (Approx 670px wide) --}}
        <div class="w-full max-w-xl mt-4">
            {{-- 4. Form Div with FIXED Rounding (rounded-[2.5rem]) --}}
            <div x-data="{ recovery: false }" 
             class="bg-[#3c3f58] flex flex-col justify-center w-full px-8 py-8 space-y-6 shadow-2xl"
             style="border-radius: 2.5rem;">
                <x-validation-errors class="mb-4" />

                <form method="POST" action="{{ route('two-factor.login') }}" style="border-radius: 2.5rem; padding-top: 15px; padding-left: 20px; padding-right: 20px;" class="w-full">
                    @csrf

                    {{-- DYNAMIC BLOCK 1: Authentication + Input --}}
                    <div class="w-full space-y-4 mx-auto" x-show="! recovery">
                        <label class="-pb-4 text-white text-l font-extrabold tracking-wide text-left leading-snug whitespace-pre-line">{{ __('auth.enter_auth_code') }}</label>
                        <div class="text-sm text-white" style="text-align: justify;">
                            {{ __('auth.auth_code_instruction') }}
                        </div>
                        <div>
                            <x-input id="code" class="w-full rounded-full py-2.5 px-5 text-black text-sm focus:outline-none bg-[#eaeaf3]" type="text" inputmode="numeric" name="code" placeholder="{{ __('auth.auth_code_placeholder') }}" autofocus x-ref="code" autocomplete="one-time-code" />
                        </div>
                    </div>

                    {{-- DYNAMIC BLOCK 2: Recovery + Input --}}
                    <div class="w-full space-y-4 mx-auto" x-cloak x-show="recovery">
                        <label class="-pb-4 text-white text-l font-extrabold tracking-wide text-left leading-snug whitespace-pre-line">{{ __('auth.enter_recovery_code') }}</label>
                        <div class="text-sm text-white" style="text-align: justify;">
                            {{ __('auth.recovery_code_instruction') }}
                        </div>
                        <div>
                            <x-input id="recovery_code" class="w-full rounded-full py-2.5 px-5 text-black text-sm focus:outline-none bg-[#eaeaf3]" type="text" name="recovery_code" placeholder="{{ __('auth.recovery_code_placeholder') }}" x-ref="recovery_code" autocomplete="one-time-code" />
                        </div>
                    </div>

                    {{-- Footer Buttons --}}
                    <div class="flex items-center justify-end mt-6 w-full mx-auto gap-4">                    
                        <button type="button" class="text-sm text-gray-300 hover:text-white underline cursor-pointer whitespace-nowrap"
                                    x-show="! recovery"
                                    x-on:click="
                                        recovery = true;
                                        $nextTick(() => { $refs.recovery_code.focus() })
                                    ">
                            {{ __('auth.use_recovery_code') }}
                        </button>

                        <button type="button" class="text-sm text-gray-300 hover:text-white underline cursor-pointer whitespace-nowrap"
                                    x-cloak
                                    x-show="recovery"
                                    x-on:click="
                                        recovery = false;
                                        $nextTick(() => { $refs.code.focus() })
                                    ">
                            {{ __('auth.use_auth_code') }}
                        </button>

                        {{-- I added 'whitespace-nowrap' to prevent the text from breaking --}}
                        <button type="submit" class="bg-[#f89c00] text-black font-extrabold text-base rounded-full py-2.5 px-10 pt-2 tracking-wide hover:brightness-110 transition-all duration-200 whitespace-nowrap">
                            {{ __('auth.login') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</x-guest-layout>