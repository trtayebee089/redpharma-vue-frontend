<template>
  <section
    class="text-gray-800 space-y-6 md:space-y-12"
    aria-busy="true"
    aria-label="Loading product details"
  >
    <span class="sr-only">Loading product details</span>

    <div
      class="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow border border-gray-200"
    >
      <div
        class="skeleton-shimmer md:col-span-2 w-full min-h-[250px] md:min-h-[350px] rounded-lg"
      ></div>

      <div class="md:col-span-3 flex flex-col justify-between space-y-6 py-2">
        <div class="space-y-5">
          <div class="border-b border-gray-100 pb-5 space-y-3">
            <div class="skeleton-shimmer h-8 md:h-10 rounded-lg w-11/12"></div>
            <div class="skeleton-shimmer h-5 rounded-md w-2/3"></div>
          </div>

          <div class="flex flex-wrap gap-3">
            <div class="skeleton-shimmer h-8 rounded-md w-32"></div>
            <div class="skeleton-shimmer h-8 rounded-md w-40"></div>
            <div class="skeleton-shimmer h-8 rounded-md w-28"></div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div class="space-y-2">
              <div class="skeleton-shimmer h-4 rounded w-20"></div>
              <div class="skeleton-shimmer h-11 rounded-md w-full"></div>
            </div>
            <div class="space-y-2">
              <div class="skeleton-shimmer h-4 rounded w-20"></div>
              <div class="skeleton-shimmer h-11 rounded-md w-full"></div>
            </div>
          </div>

          <div class="space-y-3 pt-1">
            <div class="skeleton-shimmer h-4 rounded w-24"></div>
            <div class="skeleton-shimmer h-9 rounded-lg w-44"></div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-1">
            <div class="skeleton-shimmer h-12 sm:h-10 rounded-full w-full sm:w-40"></div>
            <div class="skeleton-shimmer h-12 sm:h-10 rounded-full w-full sm:w-36"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-6">
      <div class="flex items-center gap-3">
        <div class="skeleton-shimmer w-8 h-8 rounded-full"></div>
        <div class="skeleton-shimmer h-7 rounded-md w-48"></div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="item in 4" :key="item" class="rounded-xl border border-gray-100 p-5 space-y-3">
          <div class="skeleton-shimmer w-10 h-10 rounded-full mx-auto"></div>
          <div class="skeleton-shimmer h-4 rounded w-20 mx-auto"></div>
          <div class="skeleton-shimmer h-7 rounded w-24 mx-auto"></div>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-4">
      <div class="skeleton-shimmer h-6 rounded-md w-52"></div>
      <div class="skeleton-shimmer h-4 rounded w-full"></div>
      <div class="skeleton-shimmer h-4 rounded w-11/12"></div>
      <div class="skeleton-shimmer h-4 rounded w-3/4"></div>
    </div>
  </section>
</template>

<style scoped>
.skeleton-shimmer {
  position: relative;
  overflow: hidden;
  background-color: #e5e7eb;
}

.skeleton-shimmer::after {
  position: absolute;
  inset: 0;
  content: "";
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.65),
    transparent
  );
  animation: product-skeleton-shimmer 1.5s infinite;
}

@keyframes product-skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer::after {
    animation: none;
  }
}
</style>
