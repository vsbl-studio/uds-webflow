import { lenis } from "./lenisSetup";
export default function () {
    const bodyEl = document.querySelector("body");
    const overlayEl = document.querySelector(".overlay-bg");

    const navbarScroll = document.querySelectorAll(".nav_scroll");
    const navbarFixed = document.querySelectorAll(".nav_fixed");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        let currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;

        if (navbarFixed) {
            if (currentScroll >= 80) {
                navbarFixed.forEach((nav) => {
                    nav.classList.add("hidden");
                });
            } else {
                navbarFixed.forEach((nav) => {
                    nav.classList.remove("hidden");
                });
            }
        }

        if (navbarScroll && !bodyEl.classList.contains("no-scroll")) {
            if (currentScroll >= 200) {
                if (currentScroll < lastScroll) {
                    navbarScroll.forEach((nav) => {
                        nav.classList.add("visible");
                    });
                } else {
                    navbarScroll.forEach((nav) => {
                        nav.classList.remove("visible");
                    });
                }
            } else {
                navbarScroll.forEach((nav) => {
                    nav.classList.remove("visible");
                });
            }
        }

        lastScroll = currentScroll;
    });
    const burgerMenuScreen = document.querySelector(".mobile-menu");
    const burgerCheckboxes = document.querySelectorAll(".menu-icon__checkbox");
    burgerCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const isChecked = this.checked;
            if (isChecked) {
                burgerMenuScreen.classList.add("open");
                navbarScroll.forEach((nav) => {
                    nav.classList.add("visible");
                });
                bodyEl.classList.add("no-scroll");
            } else {
                burgerMenuScreen.classList.remove("open");
                navbarScroll.forEach((nav) => {
                    nav.classList.remove("visible");
                });
                bodyEl.classList.remove("no-scroll");
            }
            burgerCheckboxes.forEach((cb) => {
                cb.checked = isChecked;
            });
        });
    });

    const resetMenu = () => {
        burgerCheckboxes.forEach((cb) => (cb.checked = false));
        burgerMenuScreen.classList.remove("open");
        bodyEl.classList.remove("no-scroll");
        navbarScroll.forEach((nav) => nav.classList.remove("visible"));
    };

    // Reset the menu on page load and when navigating back
    window.addEventListener("pageshow", resetMenu);

    const megaMenuLinks = document.querySelectorAll(".products-menu-toggle");
    const megaMenu = document.querySelector(".products-mega-menu");
    function closeMegaMenu() {
        megaMenuLinks.forEach((b) => {
            b.classList.remove("open");
        });
        megaMenu.classList.remove("open");
        bodyEl.classList.remove("no-scroll");
        lenis.start();
    }
    megaMenuLinks.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (this.classList.contains("open")) {
                closeMegaMenu();
            } else {
                megaMenuLinks.forEach((b) => {
                    b.classList.add("open");
                });
                megaMenu.classList.add("open");
                bodyEl.classList.add("no-scroll");
                lenis.stop();
            }
        });
    });

    // Close the mega menu when clicking outside of it
    document.addEventListener("click", function (e) {
        // If the click is not inside the mega menu or on the menu toggle button
        if (
            !megaMenu.contains(e.target) &&
            !Array.from(megaMenuLinks).some((link) => link.contains(e.target))
        ) {
            if (megaMenu.classList.contains("open")) {
                closeMegaMenu();
            }
        }
    });

    // Get In Touch Modal Toggle
    const closeGetInTouchBtns = document.querySelectorAll(
        ".is-close-get-in-touch"
    );

    if (closeGetInTouchBtns) {
        closeGetInTouchBtns.forEach((btn) => {
            closeGetInTouch(btn);
        });
    }

    if (overlayEl) {
        closeGetInTouch(overlayEl);
    }

    function closeGetInTouch(btn) {
        btn.addEventListener("click", function () {
            // Store the current scroll position
            const scrollPosition = window.scrollY || window.pageYOffset;

            // Listen for hash change
            window.location.hash = "";
            // Remove # symbol from URL
            history.replaceState(null, null, " ");

            // Restore the scroll position after removing the hash
            window.scrollTo(0, scrollPosition);
        });
    }
    function getInTouchVisibility() {
        const getInTouchModal = document.querySelector(".modal_get-in-touch");

        if (getInTouchModal) {
            if (
                window.location.hash === "#get-in-touch" ||
                window.location.hash === "#apply"
            ) {
                getInTouchModal.classList.add("open");
                bodyEl.classList.add("no-scroll");
                lenis.stop();

                if (overlayEl) {
                    overlayEl.classList.add("open");
                }
            } else {
                getInTouchModal.classList.remove("open");
                bodyEl.classList.remove("no-scroll");
                lenis.start();

                if (overlayEl) {
                    overlayEl.classList.remove("open");
                }
            }
        }
    }

    window.addEventListener("load", getInTouchVisibility);

    window.addEventListener("hashchange", getInTouchVisibility);
}
