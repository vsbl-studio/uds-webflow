import { OverlayScrollbars } from "overlayscrollbars";

export default function () {
    const overlays = document.querySelectorAll(".js-scrollbar");

    if (overlays.length) {
        overlays.forEach((el) => {
            OverlayScrollbars(el, {
                scrollbars: {
                    theme: "os-theme-dark",
                },
            });
        });
    }
}
