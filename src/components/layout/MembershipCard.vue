<template>
    <main id="app">
        <div class="card-wrapper">
            <aside class="card card-front" :style="cardStyle">
                <label class="number" v-html="formattedCardNumber"></label>

                <label class="name">
                    {{ authStore.user?.name || "Member Name" }}
                </label>

                <label class="expiry">
                    {{ currentTier.name }}
                </label>

                <img class="cardLogo" :src="brandLogo" alt="Tier Logo" />

                <div class="chip" style="overflow: hidden !important">
                    <svg role="img" viewBox="0 0 100 100" aria-label="Chip">
                        <use href="#chip-lines" />
                    </svg>
                </div>

                <div class="contactless">
                    <svg role="img" viewBox="0 0 24 24" aria-label="Contactless">
                        <use href="#contactless-icon" />
                    </svg>
                </div>

                <div v-if="locked" class="card-overlay">
                    <span class="frozen-tag">FROZEN</span>
                </div>
            </aside>

            <aside class="card card-back" :style="cardBackStyle">
                <div class="magnetic-strip"></div>

                <div class="info">
                    <ul>
                        <li v-for="(benefit, index) in benifits" :key="index">
                            <i class="icon">✔</i> {{ benefit.trim() }}
                        </li>
                    </ul>
                </div>

                <div class="footer">
                    <p>Need help? Call our hotline: <strong>+880 123 456 789</strong></p>
                    <p class="website">www.redpharmabd.com</p>
                </div>
            </aside>
        </div>

        <svg id="chip" style="display: none" aria-hidden="true">
            <g id="chip-lines">
                <polyline points="0,50 35,50"></polyline>
                <polyline points="0,20 20,20 35,35"></polyline>
                <polyline points="50,0 50,35"></polyline>
                <polyline points="65,35 80,20 100,20"></polyline>
                <polyline points="100,50 65,50"></polyline>
                <polyline points="35,35 65,35 65,65 35,65 35,35"></polyline>
                <polyline points="0,80 20,80 35,65"></polyline>
                <polyline points="50,100 50,65"></polyline>
                <polyline points="65,65 80,80 100,80"></polyline>
            </g>
        </svg>
    </main>
</template>


<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import bronzeCardBg from "@/assets/images/bronze-card.png";
import silverCardBg from "@/assets/images/silver-card.jpg";
import goldCardBg from "@/assets/images/gold-card.jpg";
import brandLogo from "@/assets/logo.png";

const props = defineProps({
    currentTier: Object,
    type: {
        type: String,
        default: "bronze",
    },
    locked: {
        type: Boolean,
        default: false,
    },
});

const type = computed(() => (props.type || "bronze").toLowerCase());

const authStore = useAuthStore();

const cardBackgrounds = {
    bronze: bronzeCardBg,
    silver: silverCardBg,
    gold: goldCardBg,
};

const formattedCardNumber = computed(() => {
    const num = authStore.user?.card_number || "XXXX-XXXX-XXXX-XXXX";
    return num
        .toString()
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .replace(/\s/g, "&nbsp;&nbsp;");
});

const cardStyle = computed(() => ({
    backgroundImage: `url('${cardBackgrounds[type.value] || bronzeCardBg}')`,
    backgroundSize: "cover",
    borderColor: props.currentTier?.color_code
        ? "#" + props.currentTier.color_code.replace("#", "")
        : "#34d399",
}));

const cardBackStyle = computed(() => ({
    backgroundImage: `
        linear-gradient(145deg, rgba(34, 34, 34, 0.7), rgba(68, 68, 68, 0.7)),
        url('${cardBackgrounds[type.value] || bronzeCardBg}')
    `,
    backgroundSize: "cover",
    backgroundBlendMode: "overlay",
    borderColor: props.currentTier?.color_code
        ? "#" + props.currentTier.color_code.replace("#", "")
        : "#34d399",
    color: "#fff"
}));

const benifits = computed(() => props.currentTier?.benefits?.split(',') || []);
console.log(cardBackgrounds[type.value]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=PT+Mono&display=swap");
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap');

:root {
    --glitter: url("https://assets.codepen.io/13471/silver-glitter-background.png");
    --duration: 6.66s;
}

.card-wrapper {
    position: relative;
    width: clamp(280px, 40vw, 420px);
    aspect-ratio: 3 / 2;
    perspective: 1500px;
}

.card-front {
    display: grid;
    position: relative;
    transform: translate3d(0, 0, 0.01px);
    height: clamp(280px, 40vw, 420px);
    aspect-ratio: 3 / 2;
    border-radius: 3.5% / 5%;
    box-shadow: 0px 0px 12px 0px rgb(255 225 195 / 25%), 0 0 10px 1px rgb(181 181 181);
    overflow: hidden;
    animation: tilt var(--duration) ease infinite;
    image-rendering: optimizequality;
}

.card-front::before {
    content: "";
    inset: 0;
    position: absolute;
    background-image: var(--glitter), var(--glitter),
        linear-gradient(120deg, black 25%, white, black 75%);
    background-size: 100% 100%, 80% 80%, 200% 200%;
    background-blend-mode: multiply, multiply, overlay;
    background-position: 50% 50%, 50% 50%, 50% 50%;
    mix-blend-mode: color-dodge;
    filter: brightness(2) contrast(0.8);
    animation: bg var(--duration) ease infinite;
}

.card-front::after {
    content: "";
    background-size: 200% 200%;
    mix-blend-mode: hard-light;
    animation: bg var(--duration) ease infinite;
}

.card-front * {
    font-family: "PT Mono", monospace;
}

.number,
.name,
.expiry,
.cardLogo,
.chip {
    color: #ccc;
    position: absolute;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    z-index: 5;
    text-shadow: -1px -1px 0px rgba(255, 255, 255, 0.5),
        1px -1px 0px rgba(255, 255, 255, 0.5), 1px 1px 0px rgba(0, 0, 0, 0.5),
        1px -1px 0px rgba(0, 0, 0, 0.5);
}

.number {
    font-size: 1.4rem;
    top: 60%;
    width: 100%;
    text-align: center;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-image: linear-gradient(to bottom, #ededed 20%, #bababa 70%),
        linear-gradient(120deg, transparent 10%, white 40%, white 60%, transparent 90%);
    filter: brightness(2);
    background-size: 200%;
    background-blend-mode: overlay;
    animation: bg var(--duration) ease infinite;
}

.name {
    bottom: 10%;
    left: 10%;
    font-size: 1rem;
    color: #fff;
}

.expiry {
    bottom: 10%;
    right: 10%;
    font-size: 0.9rem;
    color: #fff;
}

.cardLogo {
    position: absolute;
    top: 10%;
    right: 10%;
    width: 18%;
    filter: invert(1) saturate(0) brightness(2) contrast(1.2);
    mix-blend-mode: screen;
}

.chip {
    display: grid;
    place-items: center;
    position: absolute;
    width: 14%;
    aspect-ratio: 5/4;
    left: 10%;
    top: 30%;
    border-radius: 10% / 15%;
    background: linear-gradient(120deg, #777 10%, #ddd 40%, #ddd 60%, #777 90%);
    background-size: 200%;
    animation: bg var(--duration) ease infinite;
}

.chip svg {
    width: 90%;
    fill: none;
    stroke: #444;
    stroke-width: 2;
}

.contactless {
    position: absolute;
    left: 25%;
    top: 29%;
    width: 10%;
}

.contactless svg {
    rotate: 90deg;
    stroke: white;
    stroke-width: 1.5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.5;
}

@keyframes tilt {

    0%,
    100% {
        transform: rotateY(-20deg) rotateX(5deg);
    }

    50% {
        transform: rotateY(20deg) rotateX(5deg);
    }
}

@keyframes bg {

    0%,
    100% {
        background-position: 50% 50%, calc(50% + 1px) calc(50% + 1px), 0% 50%;
    }

    50% {
        background-position: 50% 50%, calc(50% - 1px) calc(50% - 1px), 100% 50%;
    }
}

main {
    display: grid;
    place-items: center;
    min-height: 100%;
    perspective: 1000px;
}

.card {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 3.5% / 5%;
    backface-visibility: hidden;
    transition: transform 0.9s ease;
}

.card-front {
    transform: rotateY(0deg);
}

.card-wrapper:hover .card-front {
    transform: rotateY(-180deg);
}

.card-wrapper:hover .card-back {
    transform: rotateY(0deg);
}

.card-back {
    position: relative;
    background: linear-gradient(145deg, #222, #444);
    background-blend-mode: overlay;
    color: #fff;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
    border-radius: 3.5% / 5%;
}

.magnetic-strip {
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    height: 50px;
    /* adjust thickness */
    background: #1f1f1f;
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
    border-radius: 0;
}

/* Info section */
.info {
    margin-top: 4rem;
    flex-grow: 1;
}

.info h3 {
    font-family: "DM Serif Text", serif;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    text-align: center;
}

.info ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.info li {
    font-size: 0.9rem;
    margin: 0.3rem 0;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.icon {
    color: #00d47f;
}

/* Footer */
.footer {
    text-align: center;
    font-size: 0.75rem;
    opacity: 0.9;
}

.footer .website {
    margin-top: 0.2rem;
    color: #fff;
}

.card-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(128, 128, 128, 0.6);
    /* semi-transparent gray */
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    pointer-events: none;
    /* ensures underlying card is still visible but not interactive */
}

.frozen-tag {
    background-color: #555;
    color: #fff;
    font-weight: bold;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}
</style>
