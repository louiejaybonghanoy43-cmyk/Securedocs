@extends('layouts.app')

@section('content')
<div style="background-color: #1D1D2F;" class="min-h-screen text-white">
    <!-- Header -->
    <div class="bg-[#141326] px-6 py-6">
        <div class="flex items-center justify-between w-full">
            <a href="{{ route('user.dashboard') }}" style="margin-left: 100px;"
            class="flex items-center text-white hover:text-gray-300 transition-colors duration-200">
                <img src="{{ asset('back-arrow.png') }}" alt="{{ __('auth.alt_back') }}" class="w-5 h-5">
            </a>
            <div class="flex items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
                <img src="{{ asset('logo-white.png') }}" alt="Logo" class="h-8 w-auto">
                <h2 class="font-bold text-xl text-[#f89c00] font-['Poppins']">{{ __('auth.prem_manage_plan') }}</h2>
            </div>
            
        </div>
    </div>

    <!-- Body Title -->
    <div class="container mx-auto px-6 py-8 ">
        <div class="max-w-4xl mx-auto">
            <div class="flex flex-col items-center mb-8">
                <div class="flex items-center mb-2">
                    <img src="{{ asset('crown.png') }}" alt="Logo" class="h-6 w-6">
                    <h1 class="text-lg font-bold text-white ml-3">{{ __('auth.prem_enhance_exp') }}</h1>
                </div> 
                <p class="text-sm text-gray-300 mt-1 text-center">{{ __('auth.prem_intro_desc') }}</p>
            </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        <!-- Standard Plan -->
        <div class="bg-[#3C3F58] rounded-2xl p-8 flex flex-col">
        <div class="text-center mb-12">
                <h3 class="text-xl font-bold text-white mb-2">{{ __('auth.prem_standard_title') }}</h3>
                <div class="text-4xl font-bold text-white">{{ __('auth.prem_free') }}</div>
            </div>
            <div class="flex-grow">
                <ul class="space-y-4 text-white">
                    <li>{{ __('auth.prem_std_storage') }}</li>
                    <li>{{ __('auth.prem_std_security') }}</li>
                    <li>{{ __('auth.prem_std_no_ai') }}</li>
                    <li>{{ __('auth.prem_std_no_blockchain') }}</li>
                </ul>
            </div>
        </div>

        <!-- Premium Plan -->
        <div class="bg-[#f89c00] rounded-2xl p-8 flex flex-col" 
        @if(auth()->user()->plan != 'premium') id="upgradeBtn" @endif>
        <div class="text-center mb-12">
                <h3 class="text-xl font-bold text-black mb-2">{{ __('auth.prem_premium_title') }}</h3>
                <div class="text-4xl font-bold text-black">
                    299.00 <span class="text-lg font-medium text-black pb-2">{{ __('auth.prem_per_month') }}</span>
                </div>
            </div>
            <div class="flex-grow">
                <ul class="space-y-4 text-black ">
                    <li>{{ __('auth.prem_prem_storage') }}</li>
                    <li>{{ __('auth.prem_prem_otp') }}</li>
                    <li>{{ __('auth.prem_prem_ai') }}</li>
                    <li>{{ __('auth.prem_prem_arweave') }}</li>
                </ul>
            </div>
        </div>
    </div>
                    
<!-- Current Plan Status -->
<div class="prem-border border-t"></div>
    <div class="p-6">
    <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <h3 class="text-medium font-medium text-white">{{ __('auth.storage_current_plan') }}:</h3>
                <p>
                    @if(auth()->user()->is_premium)
                        <span class="text-medium font-semibold text-[#f89c00]">{{ __('auth.db_premium') }}</span>
                    @else
                        <span class="text-medium font-semibold text-[#f89c00]">{{ __('auth.db_standard') }}</span>
                    @endif
                </p>
                </div>

            <div class="flex items-center space-x-2">
                <p class="text-medium text-medium text-white">{{ __('auth.prem_next_billing') }}</p>
                <p class="text-medium text-[#f89c00] font-semibold">{{ $subscription->ends_at ?? __('auth.prem_na') }}</p>
            </div>
        </div>
    </div>
                    
    <div class="prem-border border-t mb-8"></div>
                    
    @if(!auth()->user()->is_premium)
    <h3 class="text-lg font-bold text-white mb-6">{{ __('auth.prem_choose_payment') }}</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <label class="payment-method cursor-pointer">
            <input type="radio" name="payment_method" value="gcash" class="hidden">
            <div class="payment-button">
                <img src="{{ asset('crown.png') }}" alt="Crown" class="h-6 w-6">
                <div>
                    <div class="text-white font-bold">GCash</div>
                    <div class="text-gray-400 text-sm">{{ __('auth.prem_ewallet') }}</div>
                </div>
            </div>
        </label>

        <label class="payment-method cursor-pointer">
            <input type="radio" name="payment_method" value="paymaya" class="hidden peer">
            <div class="payment-button">
                <img src="{{ asset('crown.png') }}" alt="Crown" class="h-6 w-6">
                <div>
                    <div class="text-white font-bold">PayMaya</div>
                    <div class="text-gray-400 text-sm">{{ __('auth.prem_ewallet') }}</div>
                </div>
            </div>
        </label>

        <label class="payment-method cursor-pointer">
            <input type="radio" name="payment_method" value="card" class="hidden peer">
            <div class="payment-button">
                <img src="{{ asset('crown.png') }}" alt="Crown" class="h-6 w-6">
                <div>
                    <div class="text-white font-bold">{{ __('auth.prem_card') }}</div>
                    <div class="text-gray-400 text-sm">{{ __('auth.prem_card_desc') }}</div>
                </div>
            </div>
        </label>
    </div>

    <div class="flex items-center justify-between">
        <p class="text-sm text-gray-400 max-w-md">
            {{ __('auth.prem_payment_note_1') }}<br>{{ __('auth.prem_payment_note_2') }}
        </p>
        <button id="proceedPayment" class="bg-[#f89c00] hover:brightness-110 text-black px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            {{ __('auth.prem_proceed_btn') }}
        </button>
    </div>
    @endif
    </div>
    </div>
</div>

<div id="premium-localization-data" class="hidden"
    data-select-method="{{ __('auth.prem_select_method') }}"
    data-btn-processing="{{ __('auth.btn_processing') }}"
    data-btn-proceed="{{ __('auth.prem_proceed_btn') }}"
    data-error-prefix="{{ __('auth.prem_error_prefix') }}"
    data-generic-error="{{ __('auth.msg_generic_error') }}"
></div>

<style>
    .prem-border {
        border-color: #55597C !important;
        /* margin-left: 16px !important;
        margin-right: 16px !important; */
    }

    .payment-button {
        display: flex;
        align-items: center;
        column-gap: 1rem;
        padding: 1rem;
        border-radius: 9999px;
        transition: background-color 0.2s, border-color 0.2s;
        /* --- STATE 1: Normal --- */
        background-color: transparent;
        border: 2px solid #3C3F58;
    }

    .payment-button:hover {
        /* --- STATE 2: Hovered --- */
        background-color: #3C3F58;
        border-color: #3C3F58;
    }

    /* This looks for a checked radio button and styles the .payment-button right after it */
    input[type="radio"]:checked + .payment-button {
        /* --- STATE 3: Selected --- */
        background-color: #55597C;
        border-color: #55597C;
    }
</style>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Localization
    const localData = document.getElementById('premium-localization-data');
    window.I18N = window.I18N || {};
    window.I18N.premium = {
        selectMethod: localData ? localData.getAttribute('data-select-method') : 'Please select a payment method',
        btnProcessing: localData ? localData.getAttribute('data-btn-processing') : 'Processing...',
        btnProceed: localData ? localData.getAttribute('data-btn-proceed') : 'Proceed to Payment',
        errorPrefix: localData ? localData.getAttribute('data-error-prefix') : 'Error: ',
        genericError: localData ? localData.getAttribute('data-generic-error') : 'An error occurred. Please try again.'
    };

    const paymentMethods = document.querySelectorAll('.payment-method');
    const proceedBtn = document.getElementById('proceedPayment');
    const upgradeBtn = document.getElementById('upgradeBtn');
    
    // Handle payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove selected class from all methods
            paymentMethods.forEach(m => {
                m.querySelector('div').classList.remove('border-[#f89c00]', 'bg-[#f89c00]/10');
                m.querySelector('div').classList.add('border-[#4A4D6A]');
            });
            
            // Add selected class to clicked method
            const div = this.querySelector('div');
            div.classList.remove('border-[#4A4D6A]');
            div.classList.add('border-[#f89c00]', 'bg-[#f89c00]/10');
            
            // Check the radio button
            this.querySelector('input').checked = true;
            
            // Enable proceed button
            proceedBtn.disabled = false;
        });
    });
    
    // Handle upgrade button click
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            document.querySelector('.payment-method').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    // Handle proceed to payment
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function() {
            const selectedMethod = document.querySelector('input[name="payment_method"]:checked');
            if (!selectedMethod) {
                alert(window.I18N.premium.selectMethod);
                return;
            }
            
            // Show loading state
            this.disabled = true;
            this.innerHTML = window.I18N.premium.btnProcessing;
            
            // Create payment intent with PayMongo
            fetch('/premium/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    payment_method: selectedMethod.value,
                    plan: 'premium_monthly',
                    amount: 299
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to PayMongo checkout
                    window.location.href = data.checkout_url;
                } else {
                    alert(window.I18N.premium.errorPrefix + data.message);
                    this.disabled = false;
                    this.innerHTML = window.I18N.premium.btnProceed;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(window.I18N.premium.genericError);
                this.disabled = false;
                this.innerHTML = window.I18N.premium.btnProceed;
            });
        });
    }
});
</script>
@endpush
@endsection
