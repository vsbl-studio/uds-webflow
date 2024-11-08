import gsap from "gsap";

export default function () {
    // const buttonHovers = document.querySelectorAll(".button");

    if (buttonHovers.length) {
        buttonHovers.forEach((btn) => {
            const wrapperDiv = document.createElement("div");

            wrapperDiv.style.overflow = "hidden";
            wrapperDiv.style.height = btn.clientHeight + "px";
            // Clone the button to make a second copy
            const clonedBtn = btn.cloneNode(true);

            // Append the original button and the cloned button to the div
            wrapperDiv.appendChild(btn.cloneNode(true)); // Append original button
            wrapperDiv.appendChild(clonedBtn); // Append cloned button

            // Replace the original button in the DOM with the new div
            btn.replaceWith(wrapperDiv);

            wrapperDiv.addEventListener("mouseenter", function () {
                const lines = wrapperDiv.querySelectorAll(".button");

                // Animate the first button out of view (push up)
                gsap.to(lines[0], {
                    y: -parseInt(wrapperDiv.clientHeight), // Move up by the button's height
                    duration: 0.5,
                    ease: "power2.out",
                });

                gsap.to(lines[1], {
                    y: -parseInt(wrapperDiv.clientHeight), // Move to the initial position (from below)
                    duration: 0.5,
                    ease: "power2.out",
                });
            });

            wrapperDiv.addEventListener("mouseleave", function () {
                const lines = wrapperDiv.querySelectorAll(".button");

                // Reset both elements back to their original positions
                gsap.to(lines[0], {
                    y: 0, // Reset the original button
                    duration: 0.5,
                    ease: "power2.out",
                });
                gsap.to(lines[1], {
                    y: btn.clientHeight, // Move the cloned button down
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        });
    }
}
