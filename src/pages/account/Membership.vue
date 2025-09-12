<template>
    <div class="max-w-4xl mx-auto p-6 font-sans text-gray-800 space-y-6 relative leading-relaxed fade-up mb-16">
        <!-- Page Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">My Membership</h1>
            <p class="text-gray-600">Earn points on your purchases and enjoy exclusive discounts based on your tier!</p>
        </div>

        <!-- User Points & Tier -->
        <div class="bg-white shadow rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 border border-green-200">
            <div>
                <h2 class="text-xl font-semibold text-gray-900">Current Tier:
                    <span
                        :class="[
                            'px-3 py-1 rounded-full font-semibold',
                            currentTier.colorClass
                        ]">
                        {{ currentTier . name }}
                    </span>
                </h2>
                <p class="text-gray-600 mt-1">Points: <span class="font-medium">{{ points }}</span></p>
                <p class="text-gray-500 text-sm">Next Tier: {{ nextTier . name }} at {{ nextTier . points }} points</p>
            </div>
            <div class="w-full md:w-1/2">
                <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-4 rounded-full transition-all duration-500"
                        :style="{ width: progress + '%', backgroundColor: currentTier.bgColor }"></div>
                </div>
                <p class="text-right text-gray-500 text-sm mt-1">{{ progress . toFixed(0) }}% to next tier</p>
            </div>
        </div>

        <!-- Tier Cards -->
        <div class="grid md:grid-cols-3 gap-6 ">
            <div v-for="tier in tiers" :key="tier.name"
                class="bg-white shadow rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition border border-green-200">
                <div>
                    <h3 :class="['text-xl font-bold mb-2', tier.colorClass]">{{ tier . name }}</h3>
                    <p class="text-gray-600 mb-2">Discount: {{ tier . discount }}%</p>
                    <p class="text-gray-500 text-sm">Points Required: {{ tier . points }}</p>
                </div>
                <div>
                    <button class="mt-4 w-full py-2 rounded font-semibold text-white" :class="tier.bgClass"
                        :disabled="points < tier.points" @click="redeemTier(tier)">
                        Redeem
                    </button>
                </div>
            </div>
        </div>

        <!-- Transaction Info -->
        <div class="mt-8 bg-white shadow rounded-lg p-6 border border-green-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Point Usage</h3>
            <div v-if="transactions.length">
                <ul class="space-y-2 text-gray-700">
                    <li v-for="(tx, index) in transactions" :key="index">
                        <span class="font-medium">{{ tx . date }}</span>: Used <span
                            class="text-red-500 font-semibold">{{ tx . used }} pts</span> for {{ tx . note }}
                    </li>
                </ul>
            </div>
            <p v-else class="text-gray-500">No recent usage.</p>
        </div>
    </div>
</template>

<script setup>
    import {
        ref,
        computed
    } from "vue";

    // Fake user data
    const points = ref(1012); // Current points

    // Tier definitions
    const tiers = [{
            name: "Bronze",
            discount: 5,
            points: 0,
            colorClass: "text-yellow-800",
            bgClass: "bg-yellow-500",
            bgColor: "#F59E0B"
        },
        {
            name: "Gold",
            discount: 8,
            points: 500,
            colorClass: "text-yellow-900",
            bgClass: "bg-yellow-600",
            bgColor: "#B45309"
        },
        {
            name: "Platinum",
            discount: 10,
            points: 1000,
            colorClass: "text-green-900",
            bgClass: "bg-green-600",
            bgColor: "#16A34A"
        },
    ];

    // Compute current tier based on points
    const currentTier = computed(() => {
        return tiers.slice().reverse().find(t => points.value >= t.points) || tiers[0];
    });

    // Next tier info
    const nextTier = computed(() => {
        const next = tiers.find(t => t.points > points.value);
        return next || {
            name: currentTier.value.name,
            points: currentTier.value.points
        };
    });

    // Progress toward next tier
    const progress = computed(() => {
        const curr = currentTier.value.points;
        const next = nextTier.value.points;
        if (next === curr) return 100;
        return ((points.value - curr) / (next - curr)) * 100;
    });

    // Recent usage transactions
    const transactions = ref([{
            date: "2025-09-10",
            used: 120,
            note: "Platinum discount applied"
        },
        {
            date: "2025-08-28",
            used: 80,
            note: "Gold discount applied"
        },
    ]);

    // Redeem tier function (simulate usage)
    const redeemTier = (tier) => {
        if (points.value >= tier.points) {
            const usedPoints = Math.floor(tier.points * 0.12); // 12% deduction for usage
            points.value -= usedPoints;
            transactions.value.unshift({
                date: new Date().toLocaleDateString(),
                used: usedPoints,
                note: `${tier.name} tier discount used`
            });
            alert(`Redeemed ${tier.discount}% discount! ${usedPoints} points deducted.`);
        }
    };
</script>

<style scoped>
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
