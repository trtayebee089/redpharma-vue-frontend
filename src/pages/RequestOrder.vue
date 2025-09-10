<template>
    <div class="container mx-auto md:px-6 px-4 py-40 placeholder-violet-400 grid md:grid-cols-3 gap-8">

        <!-- Left: Medicines Table -->
        <div class="md:col-span-2">
            <h1 class="text-2xl font-bold mb-6 text-gray-700">Request Medicines</h1>

            <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 text-left text-gray-700 font-medium bg-gray-200">Medicine Name</th>
                        <th class="px-4 py-2 text-left text-gray-700 font-medium bg-gray-200">Strength</th>
                        <th class="px-4 py-2 text-left text-gray-700 font-medium bg-gray-200">Quantity</th>
                        <th class="px-4 py-2 text-center text-gray-700 font-medium bg-gray-200">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(medicine, index) in medicines" :key="index" class="border-gray-200 border-b hover:bg-gray-50">
                        <td class="px-4 py-2">
                            <input v-model="medicine.name" type="text"
                                class="w-full rounded px-2 py-1 focus:ring-2 focus:ring-green-200 border-gray-300 border"
                                placeholder="Medicine Name" />
                        </td>
                        <td class="px-4 py-2">
                            <input v-model="medicine.strength" type="text"
                                class="w-full rounded px-2 py-1 focus:ring-2 focus:ring-green-200 border-gray-300 border"
                                placeholder="Strength" />
                        </td>
                        <td class="px-4 py-2">
                            <input v-model.number="medicine.quantity" type="number" min="1"
                                class="w-full rounded px-2 py-1 focus:ring-2 focus:ring-green-200 border-gray-300 border"
                                placeholder="Quantity" />
                        </td>
                        <td class="px-4 py-2 text-center">
                            <button @click="removeMedicine(index)"
                                class="text-green-500 hover:text-green-700 font-semibold px-3 py-1 rounded border border-green-300 transition">
                                Remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Add New Row -->
            <div class="mt-4">
                <button @click="addMedicine"
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    + Add Medicine
                </button>
            </div>
        </div>

        <!-- Right: Receiver Details -->
        <div class="border p-6 rounded-lg bg-gray-50 h-fit">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">Receiver Details</h2>

            <form @submit.prevent="submitRequest" class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-1">Receiver Name</label>
                    <input v-model="receiver.name" type="text"
                        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 border-gray-300"
                        required />
                </div>

                <div>
                    <label class="block text-gray-700 mb-1">Receiver Phone</label>
                    <input v-model="receiver.phone" type="tel"
                        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 border-gray-300"
                        required />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">

                    <!-- Region Dropdown -->
                    <div>
                        <label class="block text-gray-700 mb-1">Region</label>
                        <select v-model="receiver.region" @change="onRegionChange"
                            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 border-gray-300">
                            <option value="" disabled>Select Region</option>
                            <option v-for="region in Object.keys(regionData)" :key="region"
                                :value="region">{{ region }}</option>
                        </select>
                    </div>

                    <!-- City Dropdown -->
                    <div>
                        <label class="block text-gray-700 mb-1">City</label>
                        <select v-model="receiver.city" @change="onCityChange"
                            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 border-gray-300"
                            :disabled="!receiver.region">
                            <option value="" disabled>Select City</option>
                            <option v-for="city in availableCities" :key="city" :value="city">
                                {{ city }}</option>
                        </select>
                    </div>

                    <!-- Area Dropdown -->
                    <div>
                        <label class="block text-gray-700 mb-1">Area</label>
                        <select v-model="receiver.area"
                            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 border-gray-300"
                            :disabled="!receiver.city">
                            <option value="" disabled>Select Area</option>
                            <option v-for="area in availableAreas" :key="area" :value="area">
                                {{ area }}</option>
                        </select>
                    </div>

                </div>


                <div>
                    <label class="block text-gray-700 mb-1">Address</label>
                    <textarea v-model="receiver.address" rows="3"
                        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 border-gray-300"></textarea>
                </div>

                <div>
                    <label class="block text-gray-700 mb-1">Comment</label>
                    <textarea v-model="receiver.comment" rows="2"
                        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 border-gray-300"></textarea>
                </div>

                <div class="flex items-center">
                    <input type="checkbox" v-model="agreed" id="terms" class="mr-2" required />
                    <label for="terms" class="text-gray-700">I have read and agree to the Terms and
                        Conditions</label>
                </div>

                <button type="submit"
                    class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                    Send Request
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import {
        reactive,
        ref,
        computed
    } from 'vue'

    const medicines = reactive([{
        name: '',
        strength: '',
        quantity: 1
    }])

    const receiver = reactive({
        name: '',
        phone: '',
        region: '',
        city: '',
        area: '',
        address: '',
        comment: ''
    })

    // Example data structure
    const regionData = {
        "Region A": {
            "City A1": ["Area A1-1", "Area A1-2"],
            "City A2": ["Area A2-1", "Area A2-2"]
        },
        "Region B": {
            "City B1": ["Area B1-1", "Area B1-2"],
            "City B2": ["Area B2-1", "Area B2-2"]
        }
    }

    // Computed options
    const availableCities = computed(() => {
        return receiver.region ? Object.keys(regionData[receiver.region]) : []
    })

    const availableAreas = computed(() => {
        return receiver.city && receiver.region ? regionData[receiver.region][receiver.city] : []
    })

    // Reset dependent dropdowns when parent changes
    const onRegionChange = () => {
        receiver.city = ''
        receiver.area = ''
    }

    const onCityChange = () => {
        receiver.area = ''
    }

    const agreed = ref(false)

    const addMedicine = () => {
        medicines.push({
            name: '',
            strength: '',
            quantity: 1
        })
    }

    const removeMedicine = (index) => {
        if (medicines.length > 1) {
            medicines.splice(index, 1)
        }
    }

    const submitRequest = () => {
        if (!agreed.value) {
            alert('You must agree to the Terms and Conditions!')
            return
        }

        const payload = {
            medicines: [...medicines],
            receiver: {
                ...receiver
            }
        }

        console.log('Request Submitted:', payload)
        alert('Request submitted successfully!')

        // Clear form
        medicines.splice(0, medicines.length, {
            name: '',
            strength: '',
            quantity: 1
        })
        Object.keys(receiver).forEach(key => receiver[key] = '')
        agreed.value = false
    }
</script>
