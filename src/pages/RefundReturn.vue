<template>
    <PolicyPageShell :title="$t('redundreturn.title')" :description="$t('redundreturn.description')">
        <section>
            <p>
                Thank you for choosing <strong>RedPharma BD</strong>. We are committed to providing genuine healthcare
                products and ensuring a safe, convenient shopping experience. Please read our Refund & Returns Policy
                carefully to understand the terms under which returns or refunds may be processed.
            </p>
        </section>

        <section>
            <h2>Return Eligibility</h2>
            <p>
                Due to the nature of pharmaceutical and healthcare products, <strong>returns are only accepted under
                    specific conditions</strong>. You may request a return within <strong>3 days</strong> of receiving
                your order if:
            </p>
            <ul>
                <li>You received the <strong>wrong item</strong> or a product different from your order.</li>
                <li>The item was <strong>damaged</strong> or <strong>defective</strong> upon delivery.</li>
                <li>The product has <strong>expired</strong> or is <strong>unsealed</strong> upon arrival.</li>
            </ul>
            <p class="italic">
                For safety and hygiene reasons, <strong>opened or used medicines, supplements, or health-related
                    consumables cannot be returned</strong>.
            </p>
        </section>

        <section>
            <h2>Non-Returnable Items</h2>
            <p>The following items are <strong>not eligible for return or refund</strong> under any circumstances:</p>
            <ul>
                <li>Prescription medicines</li>
                <li>Opened or used health and wellness products</li>
                <li>Personal hygiene items such as masks, thermometers, or syringes</li>
                <li>Products without the original packaging or missing invoice</li>
                <li>Items purchased under discounts, offers, or clearance sales</li>
            </ul>
        </section>

        <section>
            <h2>Refunds</h2>
            <p>
                Once your return is received and verified, we will notify you of the approval or rejection of your
                refund request.
            </p>
            <p>
                If approved, the refund will be initiated within <strong>7-10 business days</strong> via your
                <strong>original payment method</strong> such as bKash, Nagad, card, or bank transfer.
            </p>
            <p>
                <strong>Note:</strong> Delivery charges are non-refundable except in cases where the product received
                was incorrect, defective, or damaged.
            </p>
        </section>

        <section>
            <h2>How to Request a Return</h2>
            <p>
                To initiate a return, please contact our support team within 3 days of receiving your order. You will
                need to provide:
            </p>
            <ul>
                <li>Order ID and invoice copy</li>
                <li>Clear photos of the product and packaging</li>
                <li>A brief description of the issue</li>
            </ul>
            <p>Once reviewed, our team will guide you through the return or replacement process.</p>
        </section>

        <section>
            <h2>Return Shipping</h2>
            <p>
                In most cases, <strong>RedPharma BD</strong> will arrange product pickup for eligible returns. If
                pickup service is unavailable, you may be asked to send the product to our address via a trackable
                courier service.
            </p>
            <p>
                For approved returns due to our error, the shipping cost will be fully reimbursed.
            </p>
        </section>

        <section>
            <h2>Order Cancellations</h2>
            <p>
                Orders can be cancelled <strong>within 6 hours</strong> of placement, provided they have not been
                processed, packed, or shipped. Once dispatched, cancellation is not possible. Please contact customer
                care immediately for assistance.
            </p>
        </section>

        <section>
            <h2>Contact Us</h2>
            <p>If you have questions about our Refund & Returns Policy, please contact:</p>
            <ul>
                <li>Company: <strong><span class="text-red-600">RedPharma</span><span
                            class="text-green-700">BD</span></strong></li>
                <li>Address: Rajshahi, Bangladesh</li>
                <li>Email: <a href="mailto:support@redpharmabd.com">support@redpharmabd.com</a></li>
                <li>Phone: +8801997202010</li>
                <li>Website: <a href="https://www.redpharmabd.com" target="_blank">www.redpharmabd.com</a></li>
            </ul>
        </section>
    </PolicyPageShell>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import PolicyPageShell from "@/components/common/PolicyPageShell.vue";

const { t } = useI18n();
</script>
