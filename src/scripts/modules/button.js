import gsap from "gsap";
import { isMobile } from "../utils/isMobile";

export default function () {
    const buttonHovers = document.querySelectorAll(".button");
    const linkButtons = document.querySelectorAll(".link-button.with-arrow");

    function setupButtonHoverEffects() {
        if (buttonHovers.length && !isMobile.any()) {
            buttonHovers.forEach((btn) => {
                if (!btn.classList.contains("js-disabled-hover")) {
                    const textWrapper = btn.querySelector("div");

                    if (textWrapper) {
                        const wrapperDiv = document.createElement("div");

                        // Reset previous wrapper if exists
                        btn.innerHTML = "";
                        btn.appendChild(wrapperDiv);

                        // Clone the original text to make a second copy
                        const clonedBtn = textWrapper.cloneNode(true);

                        // Append the original and cloned text to the wrapper div
                        wrapperDiv.appendChild(textWrapper);
                        wrapperDiv.appendChild(clonedBtn);

                        const updateDimensions = () => {
                            console.log("updateDimensions");
                            const height = textWrapper.clientHeight;
                            const width = textWrapper.clientWidth;

                            wrapperDiv.style.overflow = "hidden";
                            wrapperDiv.style.height = height + "px";
                            wrapperDiv.style.width = width + "px";

                            if (btn.classList.contains("is-icon")) {
                                wrapperDiv.style.display = "flex";
                                textWrapper.style.transform = `translateX(${-textWrapper.clientWidth}px)`;
                                clonedBtn.style.transform = `translateX(${-textWrapper.clientWidth}px)`;
                            } else {
                                clonedBtn.style.transform = `translateY(${textWrapper.clientHeight}px)`;
                                wrapperDiv.style.minWidth = "fit-content";
                                textWrapper.style.whiteSpace = "nowrap";
                                clonedBtn.style.whiteSpace = "nowrap";
                            }
                        };

                        // Update dimensions on page load
                        updateDimensions();

                        // Add hover animations
                        btn.addEventListener("mouseenter", function () {
                            const lines = wrapperDiv.querySelectorAll("div");

                            gsap.to(lines[0], {
                                y: !btn.classList.contains("is-icon")
                                    ? -textWrapper.clientHeight
                                    : "",
                                x: btn.classList.contains("is-icon") ? 0 : "",
                                duration: 0.5,
                                ease: "power2.out",
                            });

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

                        // Recalculate dimensions on resize
                        window.addEventListener("resize", updateDimensions);
                    }
                }
            });
        }
    }

    function setupLinkButtonHoverEffects() {
        if (linkButtons.length && !isMobile.any()) {
            linkButtons.forEach((btn) => {
                const wrapper = btn.querySelector(".link-button-inner-wrapper");
                const text = btn.querySelector(".link-button-text");
                const arrow = btn.querySelector(".link-icon");

                const updateButtonWidth = () => {
                    const style = getComputedStyle(wrapper);
                    const gap = parseInt(style.gap.replace("px", ""));

                    const initialTranslate = -arrow.clientWidth - gap;
                    btn.style.width =
                        text.clientWidth + arrow.clientWidth + gap * 2 + "px";
                    btn.style.overflow = "hidden";
                    wrapper.style.whiteSpace = "nowrap";

                    wrapper.style.transform = `translateX(${initialTranslate}px)`;

                    btn.addEventListener("mouseenter", function () {
                        wrapper.style.transform = "translateX(0)";
                    });

                    btn.addEventListener("mouseleave", function () {
                        wrapper.style.transform = `translateX(${initialTranslate}px)`;
                    });
                };

                // Initial setup
                updateButtonWidth();

                // Update dimensions on resize
                window.addEventListener("resize", updateButtonWidth);
            });
        }
    }

    // Initialize hover effects
    setupButtonHoverEffects();
    setupLinkButtonHoverEffects();
}
