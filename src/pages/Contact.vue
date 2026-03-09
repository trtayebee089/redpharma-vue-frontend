<template>
    <section class="mb-16 relative leading-relaxed max-w-7xl mx-auto px-4 pt-6">
        <div class="mb-12 fade-up">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 text-center relative drop-shadow-md tracking-wide">
                Contact Us
                <span class="block w-28 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"></span>
            </h2>
            <p class="text-gray-500 text-center mb-10">
                We'd love to hear from you. Send us a message and we will get back to you promptly.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <!-- Contact Form -->
            <div class="bg-white shadow-sm rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-green-200 fade-up">
                <form @submit.prevent="submitForm" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-medium mb-2" for="name">Name</label>
                        <input type="text" id="name" v-model="form.name" required
                            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" />
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
                        <input type="email" id="email" v-model="form.email" required
                            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" />
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-2" for="subject">Subject</label>
                        <input type="text" id="subject" v-model="form.subject" required
                            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" />
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-2" for="message">Message</label>
                        <textarea id="message" v-model="form.message" rows="3" required
                            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all font-semibold shadow-md hover:shadow-lg">
                        Send Message
                    </button>
                </form>
            </div>

            <!-- Contact Info + Map -->
            <div class="flex flex-col space-y-6">
                <!-- Contact Details -->
                <div
                    class="relative bg-green-50 rounded-xl p-8 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 fade-up">
                    <!-- Pattern overlay using SVG -->
                    <div class="absolute inset-0 opacity-10">
                        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="dots" x="0" y="0" width="20" height="20"
                                    patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="2" fill="#34d399" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dots)" />
                        </svg>
                    </div>

                    <!-- Content -->
                    <div class="relative z-10">
                        <h3 class="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
                        <p class="flex items-center space-x-3 text-gray-700 mb-3">
                            <i class="pi pi-map-marker text-green-500 text-lg"></i>
                            <span>303, Rajshahi 6000</span>
                        </p>
                        <p class="flex items-center space-x-3 text-gray-700 mb-3">
                            <i class="pi pi-phone text-green-500 text-lg"></i>
                            <span>+8801997202010</span>
                        </p>
                        <p class="flex items-center space-x-3 text-gray-700 mb-3">
                            <i class="pi pi-envelope text-green-500 text-lg"></i>
                            <span>support@redpharmabd.com</span>
                        </p>
                        <p class="flex items-center space-x-3 text-gray-700">
                            <i class="pi pi-globe text-green-500 text-lg"></i>
                            <span>www.redpharmabd.com</span>
                        </p>
                    </div>
                </div>


                <!-- Google Map -->
                <div
                    class="rounded-xl overflow-hidden shadow-xl hover:shadow-lg transition-all duration-300 h-64 md:h-80 border border-green-200 fade-up">
                    <iframe class="w-full h-full" :src="googleMapUrl" style="border:0;" allowfullscreen=""
                        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import {
        ref
    } from 'vue'

    const form = ref({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    // Replace with your Google Maps embed link
    const googleMapUrl =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.2641650271953!2d88.57891957591089!3d24.372112164623783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefbdead95ef9%3A0xc10466dbf1d1af45!2sRed%20Pharma!5e0!3m2!1sen!2sbd!4v1760179152447!5m2!1sen!2sbd"

    const submitForm = () => {
        alert(
            `Message sent!\nName: ${form.value.name}\nEmail: ${form.value.email}\nSubject: ${form.value.subject}\nMessage: ${form.value.message}`
        )
        form.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    }
</script>
