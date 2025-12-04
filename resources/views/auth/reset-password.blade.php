<div class="fixed top-6 left-6 z-50 pt-4 pl-2">
    <button id="back-button" class="pl-4 ml-4 text-white p-3 rounded-full shadow-lg transition-colors">
        <img src="{{ asset('back-arrow.png') }}" alt="{{ __('auth.alt_back') }}" class="w-5 h-5">
    </button>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const backButton = document.getElementById('back-button');
        if (window.history.length <= 1) {
            backButton.style.display = 'none';
        }
        backButton.addEventListener('click', function() {
            if (document.referrer && document.referrer !== window.location.href) {
                window.history.back();
            } else {
                window.location.href = "{{ url('/') }}";
            }
        });
    });
</script>

<div class="fixed bottom-6 right-6 z-50">
    <div class="relative">
        <button id="language-toggle" class="bg-[#3c3f58] text-white p-3 rounded-full shadow-lg transition"
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
                @if(app()->getLocale() != 'en') onmouseover="this.style.backgroundColor='#55597C';" onmouseout="this.style.backgroundColor='';" @endif>
                <span class="mr-2">🇺🇸</span> English
            </a>
            <a href="{{ route('language.switch', 'fil') }}"
                class="flex items-center px-4 py-3 text-sm transition-colors {{ app()->getLocale() == 'fil' ? 'bg-[#f89c00] text-black font-bold' : 'text-white' }}"
                @if(app()->getLocale() != 'fil') onmouseover="this.style.backgroundColor='#55597C';" onmouseout="this.style.backgroundColor='';" @endif>
                <span class="mr-2">🇵🇭</span> Filipino
            </a>
            <a href="{{ route('language.switch', 'ceb') }}"
                class="flex items-center px-4 py-3 text-sm transition-colors {{ app()->getLocale() == 'ceb' ? 'bg-[#f89c00] text-black font-bold' : 'text-white' }}"
                @if(app()->getLocale() != 'ceb') onmouseover="this.style.backgroundColor='#55597C';" onmouseout="this.style.backgroundColor='';" @endif>
                <span class="mr-2">🇵🇭</span> Cebuano
            </a>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const toggleButton = document.getElementById('language-toggle');
        const dropdown = document.getElementById('language-dropdown');
        if (toggleButton && dropdown) {
            toggleButton.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdown.classList.toggle('hidden');
            });
            document.addEventListener('click', function(e) {
                if (!toggleButton.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.add('hidden');
                }
            });
        }
    });
</script>

<x-guest-layout>
<div class="absolute left-1/2 transform -translate-x-1/2 w-full mb-8" style="top: 30px">
    <x-authentication-card>
        <x-slot name="logo">
            <head>
                <title>{{ __('auth.forgot_password_header') }}</title>
                <style>
                    .custom-form-position { transform: translateY(-10px); }
                </style>
            </head>
            
            <a href="{{ url('/') }}">
                <header class="-mt-2 mb-2 flex flex-col items-center py-4">
                    <div class="flex items-center space-x-3">
                        <img src="{{ asset('logo-white.png') }}" alt="logo" class="w-12 h-12">
                        <h1 class="text-white text-xl font-bold">SECURE<span class="text-[#f89c00]">DOCS</span></h1>
                    </div>
            </a>
                <div class="mt-8 text-center">
                    <p class="text-[#f89c00] text-xl font-semibold tracking-wide">{{ __('auth.reset_password_header') }}</p>
                </div>
                </header>
        </x-slot>

        <x-validation-errors class="mb-4 text-center text-white bg-red-500 rounded-lg p-4" />

        <form method="POST" action="{{ route('password.update') }}" class="bg-[#3c3f58] flex flex-col items-center justify-center w-full max-w-4xl mx-auto rounded-4xl px-8 py-2 pb-6 space-y-8">
            @csrf
            <input type="hidden" name="token" value="{{ $request->route('token') }}">
            <div class="w-4/6 min-w-[420px] -pb-4">
                <div class="text-justify">
                    <label for="email" class="pt-8 -pt-2 block text-white text-sm font-normal mb-3 tracking-wide text-justify">{{ __('auth.email') }}</label>
                </div>
                <input id="email" name="email" type="email" required autofocus 
                    class="w-full rounded-full py-2.5 px-5 text-black text-sm focus:outline-none bg-[#eaeaf3]" 
                    placeholder="{{ __('auth.email') }}" 
                    :value="old('email', $request->email)" />
            </div>

            <div class="relative w-4/6 min-w-[420px] -pb-4">
                <div class="text-justify">
                    <label for="password" class="-pt-2 block text-white text-sm font-normal mb-3 tracking-wide text-justify">{{ __('auth.password') }}</label>
                </div>
                
                <div class="relative">
                    <input id="password" name="password" type="password" required autocomplete="new-password" style="padding-right: 60px;"
                        class="w-full rounded-full py-2.5 px-5 pr-16 text-black text-sm focus:outline-none bg-[#eaeaf3]" 
                        placeholder="{{ __('auth.password') }}"/>
                    
                    <button type="button" id="toggle-password" class="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                        <img id="password-toggle-icon" src="{{ asset('eye-close.png') }}" alt="{{ __('auth.alt_toggle_pass') }}" class="w-6 h-6">
                    </button>
                </div>

                <div id="password-strength-container" class="mt-2 hidden">
                    <div class="flex space-x-1 mb-2">
                        <div id="strength-bar-1" class="h-1 flex-1 rounded-full transition-colors duration-300"></div>
                        <div id="strength-bar-2" class="h-1 flex-1 rounded-full transition-colors duration-300"></div>
                        <div id="strength-bar-3" class="h-1 flex-1 rounded-full transition-colors duration-300"></div>
                        <div id="strength-bar-4" class="h-1 flex-1 rounded-full transition-colors duration-300"></div>
                    </div>
                    <p id="strength-text" class="text-xs text-gray-300"></p>
                </div>

                <div id="password-requirements" class="mt-3 space-y-1 hidden">
                    <div id="req-length" class="flex items-center text-xs">
                        <span id="req-length-icon" class="w-3 h-3 rounded-full mr-2"></span>
                        <span>{{ __('auth.pass_req_length') }}</span>
                    </div>
                    <div id="req-uppercase" class="flex items-center text-xs">
                        <span id="req-uppercase-icon" class="w-3 h-3 rounded-full mr-2"></span>
                        <span>{{ __('auth.pass_req_upper') }}</span>
                    </div>
                    <div id="req-number" class="flex items-center text-xs">
                        <span id="req-number-icon" class="w-3 h-3 rounded-full mr-2"></span>
                        <span>{{ __('auth.pass_req_number') }}</span>
                    </div>
                    <div id="req-special" class="flex items-center text-xs">
                        <span id="req-special-icon" class="w-3 h-3 rounded-full mr-2"></span>
                        <span>{{ __('auth.pass_req_special') }}</span>
                    </div>
                </div>
            </div>

            <div class="w-4/6 min-w-[420px] -pb-4 mb-6">
                <div class="text-justify">
                    <label for="password_confirmation" class="-pt-2 block text-white text-sm font-normal mb-3 tracking-wide text-justify">{{ __('auth.confirm_password') }}</label>
                </div>
                <input id="password_confirmation" name="password_confirmation" type="password" required autocomplete="new-password" 
                    class="w-full rounded-full py-2.5 px-5 text-black text-sm focus:outline-none bg-[#eaeaf3]" 
                    placeholder="{{ __('auth.confirm_password') }}"/>
            </div>

            <div class="flex items-center justify-end mt-4">
                <button class="bg-[#f89c00] text-black font-extrabold text-base rounded-full py-2.5 px-10 pt-2 tracking-wide hover:bg-[#d17f00] transition-colors">
                    {{ __('auth.reset_password_btn') }}
                </button>
                </div>
        </form>

        <div id="js-auth-loc" class="hidden"
             data-weak="{{ __('auth.pass_weak') }}"
             data-fair="{{ __('auth.pass_fair') }}"
             data-good="{{ __('auth.pass_good') }}"
             data-strong="{{ __('auth.pass_strong') }}">
        </div>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                // --- 1. Toggle Password Visibility Logic ---
                const toggleButton = document.getElementById('toggle-password');
                const passwordField = document.getElementById('password');
                const toggleIcon = document.getElementById('password-toggle-icon');

                if (toggleButton && passwordField && toggleIcon) {
                    toggleButton.addEventListener('click', function() {
                        const isPassword = passwordField.type === 'password';
                        passwordField.type = isPassword ? 'text' : 'password';
                        toggleIcon.src = isPassword 
                            ? "{{ asset('eye-open.png') }}" 
                            : "{{ asset('eye-close.png') }}";
                    });
                }

                // --- 2. Password Strength Logic ---
                const passwordInput = document.getElementById('password');
                const strengthContainer = document.getElementById('password-strength-container');
                const requirementsContainer = document.getElementById('password-requirements');
                const strengthBars = [
                    document.getElementById('strength-bar-1'),
                    document.getElementById('strength-bar-2'),
                    document.getElementById('strength-bar-3'),
                    document.getElementById('strength-bar-4')
                ];
                const strengthText = document.getElementById('strength-text');

                // Requirement elements map
                const reqElements = {
                    length: { icon: document.getElementById('req-length-icon'), text: document.getElementById('req-length') },
                    uppercase: { icon: document.getElementById('req-uppercase-icon'), text: document.getElementById('req-uppercase') },
                    number: { icon: document.getElementById('req-number-icon'), text: document.getElementById('req-number') },
                    special: { icon: document.getElementById('req-special-icon'), text: document.getElementById('req-special') }
                };

                function checkPasswordRequirements(password) {
                    return {
                        length: password.length >= 8,
                        uppercase: /[A-Z]/.test(password),
                        number: /[0-9]/.test(password),
                        special: /[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]/.test(password)
                    };
                }

                function updateRequirementDisplay(requirements) {
                    Object.keys(requirements).forEach(req => {
                        const isValid = requirements[req];
                        const element = reqElements[req];
                        if (element.icon && element.text) {
                            element.icon.className = `w-3 h-3 rounded-full mr-2 ${isValid ? 'bg-green-500' : 'bg-red-500'}`;
                            element.text.className = `flex items-center text-xs ${isValid ? 'text-green-400' : 'text-red-400'}`;
                        }
                    });
                }

                // Get localized text
                const localData = document.getElementById('js-auth-loc');
                const txtWeak = localData ? localData.getAttribute('data-weak') : 'Weak';
                const txtFair = localData ? localData.getAttribute('data-fair') : 'Fair';
                const txtGood = localData ? localData.getAttribute('data-good') : 'Good';
                const txtStrong = localData ? localData.getAttribute('data-strong') : 'Strong';

                function calculateStrength(requirements) {
                    const validCount = Object.values(requirements).filter(Boolean).length;
                    if (validCount === 0) return { level: 0, text: '', color: '' };
                    if (validCount === 1) return { level: 1, text: txtWeak, color: 'bg-red-500' };
                    if (validCount === 2) return { level: 2, text: txtFair, color: 'bg-yellow-500' };
                    if (validCount === 3) return { level: 3, text: txtGood, color: 'bg-blue-500' };
                    return { level: 4, text: txtStrong, color: 'bg-green-500' };
                }

                function updateStrengthIndicator(password) {
                    if (password.length === 0) {
                        if (strengthContainer) strengthContainer.classList.add('hidden');
                        if (requirementsContainer) requirementsContainer.classList.add('hidden');
                        return;
                    }

                    if (strengthContainer) strengthContainer.classList.remove('hidden');
                    if (requirementsContainer) requirementsContainer.classList.remove('hidden');

                    const requirements = checkPasswordRequirements(password);
                    updateRequirementDisplay(requirements);

                    const strength = calculateStrength(requirements);
                    if (strengthText) {
                        strengthText.textContent = strength.text;
                        strengthText.className = `text-xs ${strength.level >= 3 ? 'text-green-400' : strength.level >= 2 ? 'text-yellow-400' : 'text-red-400'}`;
                    }

                    // Update strength bars
                    strengthBars.forEach((bar, index) => {
                        if (bar) {
                            if (index < strength.level) {
                                bar.className = `h-1 flex-1 rounded-full transition-colors duration-300 ${strength.color}`;
                            } else {
                                bar.className = 'h-1 flex-1 rounded-full transition-colors duration-300 bg-gray-600';
                            }
                        }
                    });
                }

                if (passwordInput) {
                    passwordInput.addEventListener('input', function() {
                        updateStrengthIndicator(this.value);
                    });
                    // Show requirements on focus
                    passwordInput.addEventListener('focus', function() {
                        if (this.value.length > 0) {
                            if (requirementsContainer) requirementsContainer.classList.remove('hidden');
                        }
                    });
                }
            });
        </script>

        {{-- 
        <div class="mt-4 w-full max-w-4xl mx-auto">
             <x-validation-errors class="mb-4" />
        </div>
        --}}
    </x-authentication-card>
</div>
</x-guest-layout>