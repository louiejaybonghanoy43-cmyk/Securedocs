@extends('layouts.app')

@section('content')
<div style="background-color: #1D1D2F;" class="min-h-screen text-white flex flex-col">

    <div class="bg-[#141326] px-6 py-6">
        <div class="flex items-center justify-between w-full">
            <button id="back-button" style="margin-left: 10px;" class="flex items-center text-white hover:text-gray-300 transition-colors duration-200">
                <img src="{{ asset('back-arrow.png') }}" alt="Back" class="w-5 h-5">
            </button>
            
            <div class="flex items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
                <img src="{{ asset('logo-white.png') }}" alt="Logo" class="h-8 w-auto">
                <h2 class="font-bold text-xl text-[#f89c00] font-['Poppins']">{{ __('auth.file_sharing') }}</h2>
            </div>

            <div class="flex items-center gap-6">
                <a href="/login" class="text-sm font-medium transition-all duration-200 hover:text-[#ff9c00]">{{ __('auth.login_header') }}</a>
                <a href="/register" class="bg-[#ff9c00] text-black px-4 py-2 rounded-full font-bold transition-all duration-200 hover:brightness-110">{{ __('auth.signup') }}</a>
            </div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const backButton = document.getElementById('back-button');
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

    <div class="container mx-auto px-6 py-6 flex-1 flex items-center justify-center">
        <div class="bg-[#3C3F58] w-full max-w-lg p-8 mb-4 md:p-12 rounded-2xl text-center">        
            
            <div class="flex items-center justify-center gap-3 mb-4">
                <img src="{{ asset('caution-sign.png') }}" alt="Logo" class="h-8 w-8">
                <h2 class="text-xl font-bold text-[#f89c00] tracking-wider uppercase">{{ __('auth.snf_title') }}</h2>
            </div>

            <p class="text-gray-300 text-sm mb-4">
                {{ __('auth.snf_description') }}
            </p>

            <div class="p-5 rounded-lg text-left">
                <div class="flex items-start space-x-3">
                    <div class="text-sm">
                        <p class="font-bold text-white mb-2">{{ __('auth.snf_reasons_title') }}</p>
                        <ul class="space-y-2 text-gray-300">
                            <li>• {{ __('auth.snf_reason_1') }}</li>
                            <li>• {{ __('auth.snf_reason_2') }}</li>
                            <li>• {{ __('auth.snf_reason_3') }}</li>
                            <li>• {{ __('auth.snf_reason_4') }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="p-5 rounded-lg text-left">
                <div class="flex items-start space-x-3">
                    <div class="text-sm">
                        <p class="font-bold text-white mb-2">{{ __('auth.snf_actions_title') }}</p>
                        <ul class="space-y-2 text-gray-300">
                            <li>• {{ __('auth.snf_action_1') }}</li>
                            <li>• {{ __('auth.snf_action_2') }}</li>
                            <li>• {{ __('auth.snf_action_3') }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection