import gsap from "gsap";

export default function () {
    const buttonHovers = document.querySelectorAll(".button");

    if (buttonHovers.length) {
        buttonHovers.forEach((btn) => {
            const textWrapper = btn.querySelector("div");

            if (textWrapper) {
                const wrapperDiv = document.createElement("div");

                wrapperDiv.style.overflow = "hidden";
                wrapperDiv.style.height = textWrapper.clientHeight + "px";
                wrapperDiv.style.width = textWrapper.clientWidth + "px";

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
            }
        });
    }
}
