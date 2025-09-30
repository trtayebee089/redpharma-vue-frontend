<template>
    <section class="relative leading-relaxed fade-up mb-16 pt-6">
        <h1 class="text-3xl font-extrabold mb-3 text-gray-800 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
            Delivery Coverage
        </h1>
        <div class="w-20 h-1 bg-green-400 rounded mt-1 mb-5"></div>


        <!-- Filters -->
        <div class="flex flex-col md:flex-row gap-4 mb-6">
            <!-- Division -->
            <div class="flex-1">
                <label class="block mb-1 font-medium">Division</label>
                <select v-model="selectedDivision" @change="onDivisionChange"
                    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Division</option>
                    <option v-for="div in divisions" :key="div.id" :value="div.id">{{ div . name }}
                    </option>
                </select>
            </div>

            <!-- District -->
            <div class="flex-1">
                <label class="block mb-1 font-medium">District</label>
                <select v-model="selectedDistrict"
                    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select District</option>
                    <option v-for="dist in filteredDistricts" :key="dist.id" :value="dist.id">
                        {{ dist . name }}</option>
                </select>
            </div>

            <!-- Delivery Type -->
            <div class="flex-1">
                <label class="block mb-1 font-medium">Delivery Type</label>
                <select v-model="selectedDeliveryType"
                    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Delivery Type</option>
                    <option value="currier">Currier</option>
                    <option value="home" :disabled="selectedDivision !== 4">Home Delivery</option>
                    <option value="outside">Outside Rajshahi Home Delivery</option>
                </select>
            </div>

        </div>

        <!-- Delivery Providers (Currier / Outside Rajshahi) -->
        <div v-if="selectedDeliveryType === 'currier'" class="mb-6">
            <p class="text-gray-700 font-semibold mb-4 text-lg">Available Couriers</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="provider in currierProviders" :key="provider"
                    class="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-gray-200">

                    <!-- Icon placeholder -->
                    <div
                        class="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-3">
                        <!-- You can replace this with provider-specific icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 7h18M3 12h18M3 17h18" />
                        </svg>
                    </div>

                    <!-- Provider Name -->
                    <span class="text-gray-800 font-medium">{{ provider }}</span>
                </div>
            </div>
        </div>


        <!-- Outside Rajshahi Delivery Providers -->
        <div v-if="selectedDeliveryType === 'outside'" class="mb-6">
            <p class="text-gray-700 font-semibold mb-4 text-lg">Available Outside Rajshahi Delivery</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="provider in outsideProviders" :key="provider"
                    class="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">

                    <!-- Icon placeholder -->
                    <div class="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3">
                        <!-- Replace this with provider-specific icon/logo -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 7h18M3 12h18M3 17h18" />
                        </svg>
                    </div>

                    <!-- Provider Name -->
                    <span class="text-gray-800 font-medium">{{ provider }}</span>
                </div>
            </div>
        </div>


        <!-- Google Map for Home Delivery -->
        <div v-if="showMap" id="map" class="w-full h-[500px] rounded shadow-lg"></div>
    </section>
</template>

<script setup>
    import {
        ref,
        computed,
        watch,
        onMounted,
        nextTick
    } from 'vue'

    // Divisions & Districts
    const divisions = [{
            id: 1,
            name: 'Dhaka'
        },
        {
            id: 2,
            name: 'Chattogram'
        },
        {
            id: 3,
            name: 'Khulna'
        },
        {
            id: 4,
            name: 'Rajshahi'
        }
    ]

    const districts = [{
            id: 1,
            name: 'Gazipur',
            divisionId: 1
        },
        {
            id: 2,
            name: 'Narsingdi',
            divisionId: 1
        },
        {
            id: 3,
            name: 'Comilla',
            divisionId: 2
        },
        {
            id: 4,
            name: 'Chattogram District',
            divisionId: 2
        },
        {
            id: 5,
            name: 'Khulna District',
            divisionId: 3
        },
        {
            id: 6,
            name: 'Rajshahi District',
            divisionId: 4
        }
    ]

    // Filters
    const selectedDivision = ref(4)
    const selectedDistrict = ref(6)
    const selectedDeliveryType = ref('home')
    const showMap = ref(selectedDivision.value === 4 && selectedDeliveryType.value === 'home')

    const filteredDistricts = computed(() =>
        districts.filter(d => d.divisionId === Number(selectedDivision.value))
    )

    // Currier / Outside Rajshahi Providers
    const currierProviders = ['SA Paribahan', 'Sundarban', 'Pathao', 'Steadfast']
    const outsideProviders = ['Pathao', 'Steadfast']

    // Google Map & Zones
    let map
    let coverageZones = []

    const coverageData = [{
            districtId: 6,
            paths: [{
                    lat: 24.382,
                    lng: 88.588
                },
                {
                    lat: 24.386,
                    lng: 88.598
                },
                {
                    lat: 24.392,
                    lng: 88.592
                },
                {
                    lat: 24.389,
                    lng: 88.582
                }
            ],
            color: '#4ade80'
        },
        {
            districtId: 6,
            paths: [{
                    lat: 24.374,
                    lng: 88.602
                },
                {
                    lat: 24.378,
                    lng: 88.612
                },
                {
                    lat: 24.384,
                    lng: 88.608
                },
                {
                    lat: 24.380,
                    lng: 88.598
                }
            ],
            color: '#facc15'
        },
        {
            districtId: 6,
            paths: [{
                    lat: 24.366,
                    lng: 88.590
                },
                {
                    lat: 24.370,
                    lng: 88.600
                },
                {
                    lat: 24.376,
                    lng: 88.596
                },
                {
                    lat: 24.372,
                    lng: 88.586
                }
            ],
            color: '#f87171'
        }
    ]

    function initMap() {
        if (!document.getElementById('map')) return
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 24.3745,
                lng: 88.6042
            },
            zoom: 14
        })
        renderZones()
    }

    function renderZones() {
        if (!map) return
        coverageZones.forEach(zone => zone.setMap(null))
        coverageZones = []

        let zonesToShow = coverageData
        if (selectedDistrict.value) {
            zonesToShow = coverageData.filter(z => z.districtId === Number(selectedDistrict.value))
        }

        zonesToShow.forEach(zone => {
            const polygon = new google.maps.Polygon({
                paths: zone.paths,
                strokeColor: zone.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: zone.color,
                fillOpacity: 0.35
            })
            polygon.setMap(map)
            coverageZones.push(polygon)
        })
    }

    function onDivisionChange() {
        selectedDistrict.value = ''
        renderZones()
    }

    // Watch map only for Home Delivery
    watch([selectedDivision, selectedDeliveryType], async ([newDiv, newType]) => {
        if (newDiv !== 4 || newType !== 'home') {
            showMap.value = false
            // clear polygons
            coverageZones.forEach(z => z.setMap(null))
            coverageZones = []
            map = null
        } else {
            // Force DOM re-render
            showMap.value = false
            await nextTick()
            showMap.value = true
            await nextTick()
            initMap()
        }
    })


    onMounted(() => {
        initMap()
    })
</script>

<style scoped>
    #map {
        width: 100%;
        height: 500px;
    }
</style>
