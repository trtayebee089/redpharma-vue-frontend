<script setup>
import mainLogo from '@/assets/logo.png';
import paymentsLogo from '@/assets/images/payment-logos.webp';

const year = new Date().getFullYear();
const phone = '+8801997202010';
const email = 'redpharma4@gmail.com';
const linkGroups = [
    {
        heading: 'footer.headings.quick_actions',
        links: [
            { label: 'header.menu.about', to: '/about' },
            { label: 'header.menu.contact', to: '/contact' },
            { label: 'header.menu.returns', to: '/refund-and-returns' },
            { label: 'header.menu.privacy', to: '/privacy-and-policy' },
        ],
    },
    {
        heading: 'footer.headings.services',
        links: [
            { label: 'header.menu.cart', to: '/cart' },
            { label: 'header.menu.help', to: '/help-center' },
            { label: 'header.menu.coverage', to: '/delivery-coverage' },
            { label: 'header.menu.remove_account', to: '/account-removal-request' },
        ],
    },
];
</script>

<template>
    <footer class="store-footer">
        <div class="footer-grid">
            <div class="footer-brand">
                <router-link to="/" class="footer-logo">
                    <img :src="mainLogo" alt="RedPharma BD" />
                </router-link>
                <p>{{ $t('footer.description') }}</p>
                <a href="https://www.facebook.com/redpharmabd" target="_blank" rel="noopener noreferrer" class="footer-social">
                    <i class="pi pi-facebook" aria-hidden="true"></i>
                    {{ $t('common.followUs') }}
                </a>
            </div>

            <nav v-for="group in linkGroups" :key="group.heading" :aria-label="$t(group.heading)">
                <h2>{{ $t(group.heading) }}</h2>
                <ul>
                    <li v-for="link in group.links" :key="link.to">
                        <router-link :to="link.to">{{ $t(link.label) }}</router-link>
                    </li>
                </ul>
            </nav>

            <section aria-labelledby="footer-contact-heading" class="footer-contact">
                <h2 id="footer-contact-heading">
                    {{ $t('footer.headings.contact') }}
                </h2>
                <address>
                    <div>
                        <i class="pi pi-map-marker" aria-hidden="true"></i>
                        <span>{{ $t('footer.addressLine') }}</span>
                    </div>
                    <div>
                        <i class="pi pi-phone" aria-hidden="true"></i>
                        <a :href="`tel:${phone}`">{{ phone }}</a>
                    </div>
                    <div>
                        <i class="pi pi-envelope" aria-hidden="true"></i>
                        <a :href="`mailto:${email}`">{{ email }}</a>
                    </div>
                </address>
            </section>
        </div>

        <div class="footer-bottom">
            <div>
                <p>© {{ year }} <strong>RedPharma BD</strong>. {{ $t('common.allRightsReserved') }}</p>
                <img :src="paymentsLogo" alt="Payment Methods" loading="lazy" />
            </div>
        </div>
    </footer>
</template>

<style scoped>
.store-footer {
    border-top: 4px solid #10b981;
    background: #112822;
    color: #ecfdf5;
    padding-bottom: 3.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
}

.footer-grid,
.footer-bottom > div {
    max-width: 96rem;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 3vw, 2rem);
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 1.25rem;
    padding-block: 2.5rem;
}

.footer-brand,
.footer-contact {
    grid-column: span 2;
}

.footer-logo {
    display: inline-flex;
    padding: 0.5rem 0.75rem;
    border-radius: 0.75rem;
    background: #fff;
}

.footer-logo img {
    height: 2.5rem;
    width: auto;
}

.footer-brand p {
    max-width: 23rem;
    margin-top: 1rem;
    line-height: 1.7;
}

.footer-brand p,
nav ul {
    color: #cde2d8;
}

.footer-social {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.45rem 0.75rem;
    border: 1px solid #53746a;
    border-radius: 999px;
}

h2 {
    margin-bottom: 0.75rem;
    color: #fff;
    font-size: 1rem;
    font-weight: 650;
}

nav li + li {
    margin-top: 0.625rem;
}

.footer-contact {
    padding: 1.25rem;
    border: 1px solid #3d6054;
    border-radius: 1rem;
    background: #1d372e;
}

.footer-contact h2 {
    margin-bottom: 1rem;
    font-size: 1.125rem;
}

address {
    display: grid;
    gap: 0.75rem;
    font-style: normal;
    overflow-wrap: anywhere;
}

address > div {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
}

address .pi {
    margin-top: 0.15rem;
    color: #6ee7b7;
}

a:hover,
a:focus-visible {
    color: #a7f3d0;
    text-decoration: underline;
    text-underline-offset: 3px;
}

.footer-bottom {
    border-top: 1px solid #3d6054;
}

.footer-bottom > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1.5rem;
    padding-block: 1rem;
    color: #cde2d8;
    font-size: 0.75rem;
}

.footer-bottom img {
    width: min(100%, 30rem);
    height: auto;
}

@media (min-width: 1024px) {
    .store-footer {
        padding-bottom: 0;
    }

    .footer-grid {
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.65fr) minmax(0, 0.7fr) minmax(0, 1.3fr);
        gap: 2rem;
        padding-block: 3rem;
    }

    .footer-brand,
    .footer-contact {
        grid-column: auto;
    }
}
</style>
