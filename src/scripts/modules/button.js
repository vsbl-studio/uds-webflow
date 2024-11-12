import gsap from "gsap";
import { isMobile } from "../utils/isMobile";

export default function () {
    const buttonHovers = document.querySelectorAll(".button");

    if (buttonHovers.length && !isMobile.any()) {
        buttonHovers.forEach((btn) => {
            if (!btn.classList.contains(".js-disabled-hover")) {
                const textWrapper = btn.querySelector("div");

                if (textWrapper) {
                    const wrapperDiv = document.createElement("div");

                    requestAnimationFrame(() => {
                        const height = textWrapper.clientHeight || 26; // Fallback height
                        const width = textWrapper.clientWidth || "fit-content"; // Fallback width

                        wrapperDiv.style.overflow = "hidden";
                        wrapperDiv.style.height = height + "px";
                        wrapperDiv.style.width =
                            width === "fit-content" ? width : width + "px";

                        // Clone the original text to make a second copy
                        const clonedBtn = textWrapper.cloneNode(true);

                        // Append the original and cloned text to the wrapper div
                        wrapperDiv.appendChild(textWrapper);
                        wrapperDiv.appendChild(clonedBtn);

                        // Replace the original textWrapper with the wrapper div
                        btn.appendChild(wrapperDiv);

                        if (btn.classList.contains("is-icon")) {
                            wrapperDiv.style.display = "flex";
                            textWrapper.style.transform = `translateX(${-textWrapper.clientWidth}px)`;
                            clonedBtn.style.transform = `translateX(${-textWrapper.clientWidth}px)`;
                        } else {
                            clonedBtn.style.transform = `translateY(${textWrapper.clientHeight}px)`;
                            textWrapper.style.whiteSpace = "nowrap";
                            clonedBtn.style.whiteSpace = "nowrap";
                        }

                        // Add hover animations
                        btn.addEventListener("mouseenter", function () {
                            const lines = wrapperDiv.querySelectorAll("div");

                            // Animate the original text out of view (push up)
                            gsap.to(lines[0], {
                                y: !btn.classList.contains("is-icon")
                                    ? -textWrapper.clientHeight
                                    : "",
                                x: btn.classList.contains("is-icon") ? 0 : "",
                                duration: 0.5,
                                ease: "power2.out",
                            });

                            // Animate the cloned text to the visible position
                            gsap.to(lines[1], {
                                y: !btn.classList.contains("is-icon")
                                    ? -textWrapper.clientHeight
                                    : "",
                                x: btn.classList.contains("is-icon")
                                    ? textWrapper.clientWidth
                                    : "",
                                duration: 0.5,
                                ease: "power2.out",
                            });
                        });

                        btn.addEventListener("mouseleave", function () {
                            const lines = wrapperDiv.querySelectorAll("div");

                            // Reset both elements to their original positions
                            gsap.to(lines[0], {
                                y: !btn.classList.contains("is-icon") ? 0 : "",
                                x: btn.classList.contains("is-icon")
                                    ? -textWrapper.clientWidth
                                    : "",
                                duration: 0.5,
                                ease: "power2.out",
                            });

                            gsap.to(lines[1], {
                                y: !btn.classList.contains("is-icon") ? 0 : "",
                                x: btn.classList.contains("is-icon")
                                    ? -textWrapper.clientWidth
                                    : "",
                                duration: 0.5,
                                ease: "power2.out",
                            });
                        });
                    });
                }
            }
        });
    }

    const linkButtons = document.querySelectorAll(".link-button.with-arrow");

    if (linkButtons.length && !isMobile.any()) {
        linkButtons.forEach((btn) => {
            const wrapper = btn.querySelector(".link-button-inner-wrapper");
            const text = btn.querySelector(".link-button-text");
            const arrow = btn.querySelector(".link-icon");

            const style = getComputedStyle(wrapper);
            const gap = style.gap;

            const initialTranslate =
                -arrow.clientWidth - parseInt(gap.replace("px", ""));
            btn.style.width =
                text.clientWidth +
                arrow.clientWidth +
                parseInt(gap.replace("px", "") * 2) +
                "px";
            btn.style.overflow = "hidden";
            wrapper.style.whiteSpace = "nowrap";

            wrapper.style.transform = `translateX(${initialTranslate}px)`;

            btn.addEventListener("mouseenter", function () {
                wrapper.style.transform = "translateX(0)";
            });

            btn.addEventListener("mouseleave", function () {
                wrapper.style.transform = `translateX(${initialTranslate}px)`;
            });
        });
    }
}
