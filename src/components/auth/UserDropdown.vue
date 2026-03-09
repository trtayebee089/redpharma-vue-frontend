<template>
    <div class="relative dropdown-wrapper" @click.outside="open = false">
        <button @click.stop="toggle"
            class="flex items-center space-x-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md">
            <img :src="user.avator" alt="User Avatar" class="w-8 h-8 rounded-full border" />
            <span class="font-semibold hidden xl:inline">{{ user . name }}</span>
            <i class="pi pi-chevron-down hidden xl:inline"></i>
        </button>

        <transition name="fade">
            <div v-if="open" class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                <router-link to="/profile"
                    class="dropdown-item flex items-center px-4 py-2 hover:bg-gray-200 transition">
                    <i class="pi pi-user mr-3 text-green-500"></i>
                    {{ $t("header.menu.profile") }}
                </router-link>

                <router-link to="/orders"
                    class="dropdown-item flex items-center px-4 py-2 hover:bg-gray-200 transition">
                    <i class="pi pi-shopping-cart mr-3 text-green-500"></i>
                    {{ $t("header.menu.orders") }}
                </router-link>

                <router-link to="/membership"
                    class="dropdown-item flex items-center px-4 py-2 hover:bg-gray-200 transition">
                    <i class="pi pi-id-card mr-3 text-green-500"></i>
                    {{ $t("header.menu.membership") }}
                </router-link>

                <router-link to="/settings"
                    class="dropdown-item flex items-center px-4 py-2 hover:bg-gray-200 transition">
                    <i class="pi pi-cog mr-3 text-green-500"></i>
                    {{ $t("header.menu.settings") }}
                </router-link>

                <hr class="border-gray-200" />

                <button @click="logout" class="dropdown-item flex items-center px-4 py-2 text-red-500 hover:bg-red-300 transition w-full text-left">
                    <i class="pi pi-power-off mr-3"></i>
                    {{ $t("logout") }}
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup>
    import {
        ref,
        computed,
        onMounted,
        onBeforeUnmount
    } from "vue";
    import {
        useAuthStore
    } from "@/stores/auth";
    import { useRouter } from 'vue-router'
    import { useI18n } from "vue-i18n";
    
    const { t } = useI18n();
    const router = useRouter();
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const open = ref(false);
    const toggle = () => {
        open.value = !open.value;
    };

    const logout = () => {
        authStore.logout();
        open.value = false;
        router.push('/');
    };
    
    const handleClickOutside = (e) => {
        if (!e.target.closest(".dropdown-wrapper")) {
            open.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
    });
    onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));
</script>


<style scoped>
    .dropdown-item {
        display: block;
        padding: 0.5rem 1rem;
        color: #374151;
        text-decoration: none;
        font-weight: 500;
        transition: background 0.2s;
        font-size: 0.95rem;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
