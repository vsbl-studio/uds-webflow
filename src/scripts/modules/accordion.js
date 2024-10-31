export default function () {
    const accordions = [...document.querySelectorAll(".js-accordion-header")];

    if (accordions.length > 0) {
        accordions.forEach((item, index) => {
            const content = item.parentElement.querySelector(
                ".accordion-item_body"
            );
            const iconPlus = item.querySelector(".plus");
            const iconMinus = item.querySelector(".minus");

            // Initialize the accordions
            if (index === 0 && !item.classList.contains("mobile-menu_item")) {
                item.classList.add("is-active");
                content.style.height = "auto";
                iconPlus.style.display = "none";
                iconMinus.style.display = "block";
            } else {
                content.style.height = "0px";
                item.classList.remove("is-active");
                iconPlus.style.display = "block";
                iconMinus.style.display = "none";
            }

            item.onclick = () => {
                const isActive = item.classList.contains("is-active");

                if (isActive) {
                    content.style.height = "0px";
                    item.classList.remove("is-active");
                    iconPlus.style.display = "block";
                    iconMinus.style.display = "none";
                } else {
                    accordions.forEach((acc) => {
                        const accContent = acc.parentElement.querySelector(
                            ".accordion-item_body"
                        );
                        const accIconPlus = acc.querySelector(".plus");
                        const accIconMinus = acc.querySelector(".minus");

                        accContent.style.height = "0px";
                        acc.classList.remove("is-active");
                        accIconPlus.style.display = "block";
                        accIconMinus.style.display = "none";
                    });

                    content.style.height = "auto";
                    const getHeight = content.clientHeight + "px";
                    content.style.height = "0px";
                    setTimeout(() => {
                        content.style.height = getHeight;
                    }, 0);
                    item.classList.add("is-active");
                    iconPlus.style.display = "none";
                    iconMinus.style.display = "block";
                }
            };
        });

        // Recalculate the height of the active accordion on window resize
        window.addEventListener("resize", () => {
            accordions.forEach((item) => {
                const content = item.parentElement.querySelector(
                    ".accordion-item_body"
                );
                if (item.classList.contains("is-active")) {
                    content.style.height = "auto";
                    const newHeight = content.clientHeight + "px";
                    content.style.height = newHeight;
                }
            });
        });
    }
}
