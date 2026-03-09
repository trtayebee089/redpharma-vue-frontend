<template>
    <div>
        <div class="relative leading-relaxed fade-up container mx-auto max-w-5xl pt-6">
            <div
                class="max-w-6xl mx-auto space-y-4 text-center leading-relaxed bg-green-100 rounded-lg p-6 relative overflow-hidden mb-10">
                <div class="absolute inset-0 opacity-10 pointer-events-none">
                    <svg class="w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M20 0 L0 0 0 20" fill="none" stroke="#FF0B55" stroke-width="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)"></rect>
                    </svg>
                </div>
                <h1 class="text-xl sm:text-xl md:text-4xl font-bold text-green-600 leading-relaxed font-wb mb-0"
                    :class="[langStore.langClass]">{{ $t('redundreturn.title') }}</h1>
                <p class="text-gray-700 text-md md:text-lg leading-relaxed font-ws" :class="[langStore.langClass]">
                    {{ $t('redundreturn.description') }}</p>
            </div>

            <p class="text-gray-700 mb-4">
                Thank you for choosing <strong>RedPharma BD</strong>. We are committed to providing genuine healthcare
                products and ensuring a safe, convenient shopping experience.
                Please read our Refund & Returns Policy carefully to understand the terms under which returns or refunds
                may be processed.
            </p>

            <!-- Returns Section -->
            <section class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">Return Eligibility</h2>
                <p class="text-gray-700 mb-2">
                    Due to the nature of pharmaceutical and healthcare products, <strong>returns are only accepted under
                        specific conditions</strong>.
                    You may request a return within <strong>3 days</strong> of receiving your order if:
                </p>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>You received the <strong>wrong item</strong> or a product different from your order.</li>
                    <li>The item was <strong>damaged</strong> or <strong>defective</strong> upon delivery.</li>
                    <li>The product has <strong>expired</strong> or is <strong>unsealed</strong> upon arrival.</li>
                </ul>

                <p class="text-gray-700 mt-3 italic">
                    ⚠️ For safety and hygiene reasons, <strong>opened or used medicines, supplements, or health-related
                        consumables cannot be returned</strong>.
                </p>
            </section>

            <!-- Non-returnable Items -->
            <section class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">Non-Returnable Items</h2>
                <p class="text-gray-700 mb-2">
                    The following items are <strong>not eligible for return or refund</strong> under any circumstances:
                </p>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Prescription medicines</li>
                    <li>Opened or used health and wellness products</li>
                    <li>Personal hygiene items (e.g., masks, thermometers, syringes, etc.)</li>
                    <li>Products without the original packaging or missing invoice</li>
                    <li>Items purchased under discounts, offers, or clearance sales</li>
                </ul>
            </section>

            <!-- Refunds Section -->
            <section class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">Refunds</h2>
                <p class="text-gray-700 mb-2">
                    Once your return is received and verified, we will notify you of the approval or rejection of your
                    refund request.
                </p>
                <p class="text-gray-700 mb-2">
                    If approved, the refund will be initiated within <strong>7–10 business days</strong> via your
                    <strong>original payment method</strong> (bKash, Nagad, card, or bank transfer).
                </p>
                <p class="text-gray-700">
                    <strong>Note:</strong> Delivery charges are non-refundable except in cases where the product
                    received was incorrect, defective, or damaged.
                </p>
            </section>

            <!-- Return Procedure -->
            <section class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">How to Request a Return</h2>
                <p class="text-gray-700 mb-2">
                    To initiate a return, please contact our support team within 3 days of receiving your order. You
                    will need to provide:
                </p>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Order ID and invoice copy</li>
                    <li>Clear photos of the product and packaging</li>
                    <li>A brief description of the issue</li>
                </ul>
                <p class="text-gray-700 mt-3">
                    Once reviewed, our team will guide you through the return or replacement process.
                </p>
            </section>

            <!-- Return Shipping -->
            <section class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">Return Shipping</h2>
                <p class="text-gray-700 mb-2">
                    In most cases, <strong>RedPharma BD</strong> will arrange product pickup for eligible returns.
                    If pickup service is unavailable, you may be asked to send the product to our address via a
                    trackable courier service.
                </p>
                <p class="text-gray-700">
                    For approved returns due to our error (wrong or damaged item), the shipping cost will be fully
                    reimbursed.
                </p>
            </section>

            <!-- Order Cancellations -->
            <section class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">Order Cancellations</h2>
                <p class="text-gray-700">
                    Orders can be cancelled <strong>within 6 hours</strong> of placement, provided they have not been
                    processed, packed, or shipped.
                    Once dispatched, cancellation is not possible. Please contact customer care immediately for
                    assistance.
                </p>
            </section>

            <!-- Contact Info -->
            <section class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">Contact Us</h2>
                <p class="text-gray-700">
                    If you have questions about our Refund & Returns Policy, please contact:
                </p>
                <ul class="list-disc list-inside text-gray-700 mt-2">
                    <li>Company: <strong><span class="text-red-600">RedPharma</span><span
                                class="text-green-700">BD</span></strong></li>
                    <li>Address: Rajshahi, Bangladesh</li>
                    <li>Email: <a href="mailto:support@redpharmabd.com"
                            class="text-red-500 hover:underline">support@redpharmabd.com</a></li>
                    <li>Phone: +8801997202010</li>
                    <li>Website: <a href="https://www.redpharmabd.com" target="_blank"
                            class="text-red-500 hover:underline">www.redpharmabd.com</a></li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/stores/language";
const { t, tm } = useI18n();
const langStore = useLanguageStore();
</script>

<style scoped>
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}
</style>
