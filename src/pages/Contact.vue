<template>
    <section class="container mx-auto px-4 md:px-6 py-12 pt-40">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Us</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Contact Form -->
            <div class="bg-white shadow-lg rounded-lg p-6">
                <form @submit.prevent="submitForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-medium mb-1" for="name">Name</label>
                        <input type="text" id="name" v-model="form.name" required
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-1" for="email">Email</label>
                        <input type="email" id="email" v-model="form.email" required
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-1" for="subject">Subject</label>
                        <input type="text" id="subject" v-model="form.subject" required
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-1" for="message">Message</label>
                        <textarea id="message" v-model="form.message" rows="5" required
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all font-semibold">
                        Send Message
                    </button>
                </form>
            </div>

            <!-- Contact Details + Google Map -->
            <div class="flex flex-col space-y-6">
                <!-- Contact Details -->
                <div class="bg-white shadow-lg rounded-lg p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <p class="flex items-center space-x-2 text-gray-700"><i class="pi pi-map-marker text-green-500"></i>
                        <span>123 Main Street, City, Country</span></p>
                    <p class="flex items-center space-x-2 text-gray-700"><i class="pi pi-phone text-green-500"></i>
                        <span>+1 234 567 890</span></p>
                    <p class="flex items-center space-x-2 text-gray-700"><i class="pi pi-envelope text-green-500"></i>
                        <span>support@zonhack.com</span></p>
                    <p class="flex items-center space-x-2 text-gray-700"><i class="pi pi-globe text-green-500"></i>
                        <span>www.zonhack.com</span></p>
                </div>

                <!-- Google Map -->
                <div class="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                    <iframe class="w-full h-full" :src="googleMapUrl" style="border:0;" allowfullscreen=""
                        loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
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
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789!2d-122.41941508468237!3d37.77492927975909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b9f12345%3A0xabcdef1234567890!2sYour%20Company!5e0!3m2!1sen!2sus!4v1692936723456!5m2!1sen!2sus"

    const submitForm = () => {
        // Simple demo submission
        alert(
            `Message sent!\nName: ${form.value.name}\nEmail: ${form.value.email}\nSubject: ${form.value.subject}\nMessage: ${form.value.message}`)
        form.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    }
</script>
