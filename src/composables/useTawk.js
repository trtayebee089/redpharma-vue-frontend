import { onMounted } from 'vue';

export default function useTawk() {
    onMounted(() => {
        if (document.getElementById('tawk-script')) return;

        const navHeight = document.querySelector('.mobile-site-nav')?.getBoundingClientRect().height ?? 0;
        const mobileOffset = Math.ceil(navHeight || 56) + 14;

        // Tawk reads its placement configuration when the embed script loads.
        window.Tawk_API ??= {};
        window.Tawk_API.customStyle = {
            visibility: {
                desktop: { position: 'br', xOffset: 20, yOffset: navHeight ? mobileOffset : 20 },
                mobile: { position: 'br', xOffset: 12, yOffset: mobileOffset },
            },
        };

        const script = document.createElement('script');
        script.id = 'tawk-script';
        script.async = true;
        script.src = 'https://embed.tawk.to/69a8896efbc7681c3a13bf71/1jit5hn5c';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.body.appendChild(script);
    });
}
