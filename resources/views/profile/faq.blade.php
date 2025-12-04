<x-faq-layout>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"/>

    <x-slot name="header">
        <div class="flex items-center justify-between w-full">
            <button onclick="window.history.back()" class="flex items-center text-white hover:text-gray-300 transition-colors duration-200">
                <img src="{{ asset('back-arrow.png') }}" alt="Back" class="w-5 h-5">
            </button>

           <div class="flex items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
                <img src="{{ asset('logo-white.png') }}" alt="Logo" class="h-8 w-auto">
                <h2 class="font-semibold text-xl text-[#f89c00] font-['Poppins']">
                    {{ __('auth.faq_header') }}
                </h2>
            </div>

            <div></div>
        </div>
    </x-slot>

    <div class="font-['Poppins']">
    <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 space-y-8" style="background-color: #24243B;">

        <section class="text-white pt-8 pb-8">
            <h2 class="text-2xl font-semibold mb-3">{{ __('auth.faq_intro_title') }}</h2>
            <p class="text-gray-200 text-sm md:text-base mb-6 text-justify">{{ __('auth.faq_intro_p1') }}</p>
            <p class="text-gray-200 text-sm md:text-base mb-6 text-justify">
                {{ __('auth.faq_intro_p2') }}
            </p>
            <p class="text-gray-200 text-sm md:text-base  text-justify">
                {{ __('auth.faq_intro_p3') }}
            </p>
        </section>


            <section class="p-6 rounded-xl bg-[#3c3f58]">
    <h2 class="text-xl md:text-2xl font-semibold text-white mb-4">{{ __('auth.faq_cat_files') }}</h2>

    <div class="faq-item mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_upload') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm mb-3 text-justify">{{ __('auth.faq_a_upload_1') }}</p>
            <p class="text-sm mb-3 text-justify">{{ __('auth.faq_a_upload_2') }}</p>
        </div>
    </div>

    <div class="faq-item bg-[#2a2d42] mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_manage') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm text-justify">{{ __('auth.faq_a_manage') }}</p>
        </div>
    </div>

    <div class="faq-item bg-[#2a2d42] mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_share') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm mb-3 text-justify">{{ __('auth.faq_a_share_1') }}</p>
            <p class="text-sm mb-3 text-justify">{{ __('auth.faq_a_share_2') }}</p>
        </div>
    </div>
</section>

            <x-section-border />

            <section class="p-6 rounded-xl bg-[#3c3f58]">
    <h2 class="text-xl md:text-2xl font-semibold text-white mb-4">{{ __('auth.faq_cat_security') }}</h2>

    <div class="faq-item mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_bio') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm text-justify">{{ __('auth.faq_a_bio') }}</p>
        </div>
    </div>

    <div class="faq-item bg-[#2a2d42] mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_keys') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm text-justify">{{ __('auth.faq_a_keys') }}</p>
        </div>
    </div>

    <div class="faq-item bg-[#2a2d42] mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_update_prof') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm text-justify">{{ __('auth.faq_a_update_prof') }}</p>
        </div>
    </div>

    <div class="faq-item bg-[#2a2d42] mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_change_pass') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm text-justify">{{ __('auth.faq_a_change_pass') }}</p>
        </div>
    </div>

    <div class="faq-item bg-[#2a2d42] mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_forgot_pass') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-4 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm text-justify">{{ __('auth.faq_a_forgot_pass') }}</p>
        </div>
    </div>

    <div class="faq-item bg-[#2a2d42] mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_2fa') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm mb-3 text-justify">{{ __('auth.faq_a_2fa_1') }}</p>
            <p class="text-sm text-justify">{{ __('auth.faq_a_2fa_2') }}</p>
        </div>
    </div>
</section>



            <x-section-border />

<section class="p-6 rounded-xl bg-[#3c3f58]">
    <h2 class="text-xl md:text-2xl font-semibold text-white mb-4">{{ __('auth.faq_cat_premium') }}</h2>

    <div class="faq-item mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_premium') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-8 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm mb-3 text-justify">{{ __('auth.faq_a_premium') }}</p>
            <ul class="text-sm list-disc list-inside space-y-1 text-justify">
                <li>{{ __('auth.faq_li_otp') }}</li>
                <li>{{ __('auth.faq_li_arweave') }}</li>
                <li>{{ __('auth.faq_li_ai') }}</li>
            </ul>
        </div>
    </div>

    <div class="faq-item bg-[#2a2d42] mb-2 rounded-lg overflow-hidden">
        <button class="faq-toggle flex justify-between items-center w-full py-4 px-4 text-left text-white hover:text-[#f89c00] transition-colors duration-200">
            <span class="font-medium text-lg">{{ __('auth.faq_q_get_prem') }}</span>
            <img src="{{ asset('caret-down.png') }}" alt="dropdown arrow" class="chevron mr-4 w-2 h-2 transition-transform duration-300">
        </button>
        <div class="faq-content closed px-4 py-4 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden">
            <p class="text-sm text-justify">{{ __('auth.faq_a_get_prem') }}</p>
        </div>
    </div>
</section>

        </div>
    </div>

    <div class="bg-[#141326] px-6 py-6">
        <div class="flex items-center justify-between w-full">
            <img src="{{ asset('logo-white.png') }}" alt="Logo" class="h-8 w-auto">
            <div class="flex items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
                <span class="text-sm text-white">{!! __('auth.footer_text')!!}</span>
            </div>

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
    </div>

  <script>
// Language Dropdown Toggle
document.addEventListener('DOMContentLoaded', function() {
        history.scrollRestoration = "manual";
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

    <style>
        /* Enhanced FAQ Animations */
        .faq-content {
            max-height: 0;
            opacity: 0;
            padding-top: 0;
            padding-bottom: 0;
            margin-top: 0;
            margin-bottom: 0;
        }

        .faq-content.open {
            opacity: 1;
            padding-top: 1.5rem;
            padding-bottom: 0.5rem;
            margin-bottom: 2.5rem;
            border-top: 2px solid #3C3F58;
        }

        .faq-content.closed {
            max-height: 0;
            opacity: 0;
            padding-top: 0;
            padding-bottom: 0;
        }

        .chevron.rotated {
            transform: rotate(180deg);
        }

        .faq-toggle:hover {
            filter: brightness(1.1);
        }

        /* Smooth transitions */
        .faq-item {
            background-color: #24243B;
            transition: all 0.2s ease;
        }

        /* More specific targeting for section borders */
        div[class*="border-t"], div[class*="border-gray"] {
            border-color: #3c3f58 !important;
        }
    </style>

<script>
        document.addEventListener('DOMContentLoaded', function() {
            const faqToggles = document.querySelectorAll('.faq-toggle');

            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', function() {
                    // Find the content and chevron for *this* toggle
                    // This assumes the content div is ALWAYS the next element
                    const content = this.nextElementSibling;
                    const chevron = this.querySelector('.chevron');
                    const isCurrentlyOpen = content.classList.contains('open');

                    // --- Close all other FAQ items first ---
                    faqToggles.forEach(otherToggle => {
                        // Don't close the one we are clicking
                        if (otherToggle !== this) {
                            const otherContent = otherToggle.nextElementSibling;
                            const otherChevron = otherToggle.querySelector('.chevron');

                            // Close other items
                            otherContent.style.maxHeight = '0px';
                            otherContent.classList.remove('open');
                            otherContent.classList.add('closed');
                            otherChevron.classList.remove('rotated');
                        }
                    });

                    // --- Toggle current FAQ item ---
                    if (isCurrentlyOpen) {
                        // Close current item
                        content.style.maxHeight = '0px';
                        content.classList.remove('open');
                        content.classList.add('closed');
                        chevron.classList.remove('rotated');
                    } else {
                        // Open current item
                        content.classList.remove('closed');
                        content.classList.add('open');

                        // Calculate and set the height for smooth animation
                        const scrollHeight = content.scrollHeight;
                        content.style.maxHeight = scrollHeight + 20 + 'px'; // Add some padding

                        chevron.classList.add('rotated');
                    }
                });
            });
        });
    </script>

</x-faq-layout>