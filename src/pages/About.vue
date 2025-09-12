<template>
    <section class="bg-gray-50 text-gray-800 space-y-12">
        
        <!-- Hero Section -->
        <div class="max-w-5xl mx-auto space-y-4 text-center leading-relaxed bg-green-50 rounded-lg p-6 relative overflow-hidden">
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
            <h1 class="text-3xl md:text-4xl font-bold text-green-600 leading-relaxed">Best Online Pharmacy and Healthcare Platform in
                Bangladesh</h1>
            <p class="text-gray-700 text-lg md:text-xl leading-relaxed">
                RedPharma is Bangladesh’s most trusted online pharmacy and healthcare platform. Access medicines, doctor
                consultations, lab tests, and more, all from the comfort of your home.
            </p>
        </div>

        <!-- Benefits Section -->
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 leading-relaxed">
            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-gray-800">Benefits of Using RedPharma</h2>
                <ul class="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Convenient access to medicines and healthcare services from home.</li>
                    <li>Comprehensive database of healthcare providers across Bangladesh.</li>
                    <li>24/7 customer support for all your needs.</li>
                    <li>Secure and easy-to-use platform.</li>
                    <li>Regular discounts and special deals to save money.</li>
                    <li>Access to health records, prescriptions, and medical advice.</li>
                    <li>Fast and reliable delivery of medicines.</li>
                    <li>Services delivered by professional and experienced healthcare providers.</li>
                    <li>Accurate and reliable information on health and wellness.</li>
                </ul>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-gray-800">Convenience & Affordability</h2>
                <p class="text-gray-700">
                    Order medicines online and get them delivered to your doorstep. RedPharma’s mobile app lets you
                    manage orders and prescriptions easily. Save on both generic and branded medicines with transparent
                    pricing and regular discounts.
                </p>
                <p class="text-gray-700">
                    All medicines meet strict quality standards. Refill prescriptions quickly through the website or app
                    with auto-refill reminders. RedPharma offers a wide range of medicines, OTC products, herbal
                    remedies, and personal care items.
                </p>
            </div>
        </div>

        <!-- Services Section -->
        <div class="max-w-6xl mx-auto space-y-6 leading-relaxed">
            <h2 class="text-2xl font-semibold text-gray-800 text-center">Services Offered by RedPharma</h2>
            <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 class="font-semibold text-green-600">Medicine Delivery</h3>
                    <p class="text-gray-700 text-sm mt-1">Fast and reliable delivery to your doorstep.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 class="font-semibold text-green-600">Doctor Consultation</h3>
                    <p class="text-gray-700 text-sm mt-1">Access qualified medical professionals online.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 class="font-semibold text-green-600">Lab Tests</h3>
                    <p class="text-gray-700 text-sm mt-1">Order lab tests online and receive results quickly.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 class="font-semibold text-green-600">Health Records</h3>
                    <p class="text-gray-700 text-sm mt-1">Manage medical history, lab results, and prescriptions
                        securely.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 class="font-semibold text-green-600">Medical Advice & Support</h3>
                    <p class="text-gray-700 text-sm mt-1">Get expert guidance from healthcare professionals.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 class="font-semibold text-green-600">Healthcare Provider Database</h3>
                    <p class="text-gray-700 text-sm mt-1">Find and compare doctors and clinics in your area.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 class="font-semibold text-green-600">Discounts & Deals</h3>
                    <p class="text-gray-700 text-sm mt-1">Save on medicine delivery, consultations, and lab tests.</p>
                </div>
            </div>
        </div>

        <!-- Best Selling Medicines Section -->
        <div class="max-w-6xl mx-auto leading-relaxed">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Best Selling Medicines</h2>
            <p class="text-gray-700 text-sm text-center">
                Sergel 20 mg Capsule | Napa 500 mg Tablet | Ceevit 250 mg Chewable Tablet | Monas 10 10 mg Tablet |
                Pantonix 20 mg Tablet | Ecosprin 75 mg Tablet | SkinO Hydration Boost Gel 70ml | SkinO Daily Gel
                Moisturizer 70ml | Freyias Aloe Vera Gel 200ml | Caplino Niacinamide Serum 10% 30ml | SkinO Tea Tree
                Soothing Shower Gel 220ml | The Ordinary Niacinamide 10% Zinc 1% 30ml | Cerave Acne Control Cleanser
                237ml | APLB Glutathione Niacinamide Body Lotion 300ml | Dermamate Melasma Solution Facewash 100ml |
                Deconstruct Gel Sunscreen SPF 55+ PA+++ 50g | Pond's Hydra Miracle Hyaluronic Gel 100ml | Axis-Y Dark
                Spot Correcting Glow Serum 5ml | Pantene Miracles Moisture & Power Bond Repair Shampoo 440ml | Simple
                Refreshing Facial Wash 150ml
            </p>
        </div>

    </section>
</template>

<script setup>
    // No dynamic logic needed yet
</script>

<style scoped>
    section>div {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s forwards;
        animation-delay: 0.2s;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
