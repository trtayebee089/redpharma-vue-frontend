import { onMounted } from "vue";
import router from "@/router";

export default function useTawk() {
    onMounted(() => {
        if (document.getElementById("tawk-script")) return;

        const script = document.createElement("script");
        script.id = "tawk-script";
        script.async = true;
        script.src = "https://embed.tawk.to/69a8896efbc7681c3a13bf71/1jit5hn5c";
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");

        document.body.appendChild(script);

        script.onload = () => {
            if (window.Tawk_API) {
                window.Tawk_API.onLoad = function () {
                    setTawkPosition();
                };
            }
        };

        // router.afterEach(() => {
        //     if (window.Tawk_API?.refresh) {
        //         window.Tawk_API.refresh();
        //     }
        // });
    });
}

function setTawkPosition() {
    if (!window.Tawk_API) return;

    const isMobile = window.innerWidth <= 768;

    window.Tawk_API.customStyle = {
        visibility: {
            desktop: {
                position: "br", // bottom right
                xOffset: isMobile ? 10 : 20,
                yOffset: isMobile ? 60 : 20,
            },
            mobile: {
                position: "br",
                xOffset: 10,
                yOffset: 60,
            },
        },
    };
}