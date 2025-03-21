import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import cookieYes from "./modules/cookieYes";
import accordion from "./modules/accordion";
import navigation from "./modules/navigation";
import heroVideo from "./modules/heroVideo";
import swipers from "./modules/swipers";
import newsletterMailerlite from "./modules/newsletterMailerlite";
import videos from "./modules/videos";
import button from "./modules/button";
import { setupLenis } from "./modules/lenisSetup";
import news from "./modules/news";
import scrollbars from "./modules/scrollbars";
import forms from "./modules/forms";
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollTrigger);

    // Modules
    setupLenis();
    heroVideo();
    navigation();
    button();
    swipers();
    videos();

    accordion();
    news();
    scrollbars();
    newsletterMailerlite();
    forms();
    cookieYes();

    // const revealTitles = document.querySelectorAll(".js-reveal-title");

    // if (revealTitles) {
    //     revealTitles.forEach((title) => {
    //         const splitText = new SplitText(title, { type: "lines" });

    //         splitText.lines.forEach((line) => {
    //             const lineWrapper = document.createElement("div");
    //             lineWrapper.style.overflow = "hidden";
    //             line.parentNode.insertBefore(lineWrapper, line);
    //             lineWrapper.appendChild(line);
    //         });
    //         gsap.from(splitText.lines, {
    //             y: 75,
    //             duration: 1,
    //             stagger: 0.3,
    //             ease: "power2.out",
    //             scrollTrigger: {
    //                 trigger: title,
    //                 start: "top 80%",
    //                 toggleActions: "play none none none",
    //             },
    //         });
    //     });
    // }

    const indicators = document.querySelectorAll(".scroll-item-indicator");
    const steps = document.querySelectorAll(".js-steps");

    if (steps.length) {
        steps.forEach((step, index) => {
            const line = step.querySelector(".scroll-item-line");
            const station = step.querySelector(".scroll-item-station");
            gsap.set(line, { height: "0%" });
            gsap.to(line, {
                height: "100%",
                scrollTrigger: {
                    trigger: step,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        if (progress > 0.01) {
                            indicators.forEach((item) => {
                                item.classList.remove("active");
                            });

                            station.classList.add("active");
                            indicators[index].classList.add("active");
                        } else {
                            station.classList.remove("active");
                            indicators[index].classList.remove("active");
                        }
                    },
                },
            });
        });
    }

    const overviewTableRows = document.querySelectorAll(".overview-table-row");
    const techSpecTableRows = document.querySelectorAll(".tech-spec-table-row");
    const accordionHeaders = document.querySelectorAll(".accordion-item_head");
    const techSpecBlocks = document.querySelectorAll(
        ".tech-spec-content-block"
    );
    const certificationListRows = document.querySelectorAll(
        ".certification-list-item"
    );

    const topBorders = document.querySelectorAll(
        ".js-animated-border.position-top"
    );

    const teamFiltersRow = document.querySelectorAll(".team_members-filter");
    const teammemberCards = document.querySelectorAll(".member-card-tablet");
    function growBorderToRight(rows) {
        rows.forEach((row) => {
            gsap.to(row, {
                scrollTrigger: {
                    trigger: row,
                    start: "top 80%",
                    once: true,
                },
                onStart: () => {
                    let borders;

                    if (row.classList.contains("position-top")) {
                        borders = [row];
                    } else {
                        borders = row.querySelectorAll(".js-animated-border");
                    }

                    borders.forEach((border) => {
                        border.style.setProperty("width", "100%");
                    });
                },
            });
        });
    }

    if (overviewTableRows.length) {
        growBorderToRight(overviewTableRows);
    }
    if (overviewTableRows.length) {
        growBorderToRight(techSpecTableRows);
    }
    if (accordionHeaders.length) {
        growBorderToRight(accordionHeaders);
    }
    if (techSpecBlocks.length) {
        growBorderToRight(techSpecBlocks);
    }

    if (certificationListRows.length) {
        growBorderToRight(certificationListRows);
    }
    if (topBorders.length) {
        growBorderToRight(topBorders);
    }
    if (teamFiltersRow.length) {
        growBorderToRight(teamFiltersRow);
    }
    if (teammemberCards.length) {
        growBorderToRight(teammemberCards);
    }

    const teamFilterBtns = document.querySelectorAll(
        ".team_members-filter-item"
    );

    if (teamFilterBtns.length) {
        const members = document.querySelectorAll(".team_members-list-wrapper");

        teamFilterBtns.forEach((filter) => {
            filter.addEventListener("click", function (e) {
                e.preventDefault();

                const ID = filter.getAttribute("id");

                teamFilterBtns.forEach((btn) => {
                    if (btn.getAttribute("id") === ID) {
                        btn.classList.add("active");
                    } else {
                        btn.classList.remove("active");
                    }
                });

                members.forEach((memb) => {
                    if (memb.getAttribute("data-members") == ID) {
                        memb.classList.add("active");
                    } else {
                        memb.classList.remove("active");
                    }
                });
            });
        });
    }

    const currentYear = new Date().getFullYear();
    $(`[data="year"]`).html(currentYear);

    let timelines = [];

    function closedSlidesAnimation() {
        const steps = document.querySelectorAll(".slides-item");

        // If the window width is less than 1024px, kill all timelines and reset overlays
        if (window.innerWidth < 1024) {
            timelines.forEach((tl) => tl.kill());
            timelines = [];
            steps.forEach((step) => {
                const overlay = step.querySelector(".slides-item-overlay");
                if (overlay) {
                    overlay.style.opacity = 0;
                }
            });
            return;
        }

        timelines.forEach((tl) => tl.kill());
        timelines = [];

        if (steps.length) {
            steps.forEach((step, index) => {
                if (index === 0) return;
                const previousOverlay = steps[index - 1].querySelector(
                    ".slides-item-overlay"
                );
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: step,
                        ease: "linear",
                        scrub: 1,
                        start: "top bottom",
                        end: "top top",
                    },
                });
                tl.to(previousOverlay, {
                    opacity: 0.2,
                });
                timelines.push(tl); // Store the timeline
            });
        }
    }
    closedSlidesAnimation();
    window.addEventListener("resize", closedSlidesAnimation);

    // Insights Filter Active State Management.
    // Filters are manipulated by Finsweet Attributes.
    const blogFilterWrapper = document.querySelector(
        ".blog-list_filters-items-wrapper"
    );

    const blogFilterButtons = document.querySelectorAll(
        ".blog-list_filter-button"
    );

    if (blogFilterWrapper && blogFilterButtons.length) {
        moveUnderline(blogFilterWrapper, blogFilterButtons[0]);

        blogFilterButtons.forEach((btn) => {
            btn.addEventListener("click", function () {
                moveUnderline(blogFilterWrapper, btn);
            });
        });
    }

    // Team members Filter Active State management
    // Filters are manipulated by Custom JS

    const teamFilterWrapper = document.querySelector(".team_members-filter");

    const teamFilterButtons = document.querySelectorAll(
        ".team_members-filter-item"
    );

    if (teamFilterWrapper && teamFilterButtons.length) {
        moveUnderline(teamFilterWrapper, teamFilterButtons[0]);

        teamFilterButtons.forEach((btn) => {
            btn.addEventListener("click", function () {
                moveUnderline(teamFilterWrapper, btn);
            });
        });
    }

    function moveUnderline(filtersWrapper, button) {
        blogFilterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const underline =
            filtersWrapper.parentNode.parentNode.querySelector(
                ".filter-underline"
            );

        const buttonRect = button.getBoundingClientRect();

        const filtersWrapperRect = filtersWrapper.getBoundingClientRect();

        const leftOffset = buttonRect.left - filtersWrapperRect.left;

        // Move the underline
        underline.style.width = `${buttonRect.width}px`;
        underline.style.transform = `translateX(${leftOffset}px)`;
    }

    setTimeout(() => {
        const selectItems = document.querySelectorAll(
            ".custom-select-dropdown-link"
        );
        const selectionPlace = document.querySelector(".custom-select-text");
        if (selectItems.length && selectionPlace) {
            selectItems.forEach((btn) => {
                btn.addEventListener("click", function () {
                    selectionPlace.style.color = "#000";
                });
            });
        }
    }, 500);

    const privacyPolicyLabelWrapper = document.querySelectorAll(
        ".privacy-policy-checkbox"
    );
    if (privacyPolicyLabelWrapper.length) {
        privacyPolicyLabelWrapper.forEach((pp) => {
            const privacyPolicyCheckbox = pp.querySelector("#Privacy-Policy");

            const privacyPolicyErrorMsg = pp.querySelector(
                ".form_privacy-error"
            );
            if (privacyPolicyCheckbox) {
                privacyPolicyCheckbox.addEventListener("change", function () {
                    if (this.checked) {
                        privacyPolicyErrorMsg.style.display = "none";
                    }
                });
            }
        });
    }

    const positionTitle = document.getElementById("js-position-title");

    const positionHiddenInput = document.getElementById("PositionTitle");

    if (positionTitle && positionHiddenInput) {
        setTimeout(() => {
            positionHiddenInput.value = positionTitle.innerText;
        }, 1000);
    }
});
