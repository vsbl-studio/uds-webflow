import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Swiper from "swiper";
import {
    Navigation,
    Pagination,
    EffectFade,
    Autoplay,
    Scrollbar,
} from "swiper/modules";
// import "swiper/css";

document.addEventListener("DOMContentLoaded", function () {
    Swiper.use([Navigation, Pagination, EffectFade, Autoplay, Scrollbar]);

    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollTrigger);

    const revealTitles = document.querySelectorAll(".js-reveal-title");
    if (revealTitles) {
        revealTitles.forEach((title) => {
            const splitText = new SplitText(title, { type: "lines" });

            splitText.lines.forEach((line) => {
                const lineWrapper = document.createElement("div");
                lineWrapper.style.overflow = "hidden";
                line.parentNode.insertBefore(lineWrapper, line);
                lineWrapper.appendChild(line);
            });
            gsap.from(splitText.lines, {
                y: 75,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        });
    }

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

        if (window.location.hash === "#get-in-touch") {
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

    window.addEventListener("load", getInTouchVisibility);

    window.addEventListener("hashchange", getInTouchVisibility);

    const testimonialSwiper = document.querySelector(".js-testimonials-swiper");

    if (testimonialSwiper) {
        const testimonialSwiperInstance = new Swiper(testimonialSwiper, {
            slidesPerView: 1,
            centeredSlides: true,
            loop: false,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".testimonials-pagination",
                type: "bullets",
                clickable: true,
            },
            effect: "fade",
            speed: 500,
        });
    }

    let trustedBySwiperInstance;

    function initTrustedBySwiper() {
        const trustedBySwiper = document.querySelector("#trusted-by-slider");

        if (trustedBySwiper) {
            // Destroy the existing instance if it exists
            if (trustedBySwiperInstance) {
                trustedBySwiperInstance.destroy(true, true);
            }

            // Initialize a new instance
            trustedBySwiperInstance = new Swiper(trustedBySwiper, {
                slidesPerView: 6,
                spaceBetween: 0,
                loop: true,
                speed: 4000,
                centeredSlides: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                    },
                    1440: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                },
            });
        }
    }

    initTrustedBySwiper();

    window.addEventListener("resize", initTrustedBySwiper);

    const overviewSwiper = document.querySelector(".js-overview-swiper");

    if (overviewSwiper) {
        const overviewSwiperInstance = new Swiper(overviewSwiper, {
            slidesPerView: 1.1,
            spaceBetween: 8,
            loop: false,
            centeredSlides: false,
            pagination: {
                el: ".overview-swiper-progress",
                type: "progressbar",
            },

            speed: 500,
            breakpoints: {
                576: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                    loop: false,
                    centeredSlides: false,
                },
                768: {
                    slidesPerView: 1.3,
                    spaceBetween: 16,
                    loop: false,
                    centeredSlides: false,
                },
                992: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-overview-next",
                        prevEl: ".swiper-overview-prev",
                    },
                    pagination: {
                        el: ".js-overview-pagination",
                        type: "bullets",
                        clickable: true,
                    },
                },
            },
        });
    }

    const productConfigSwiper = document.querySelector(
        ".js-product-config-swiper"
    );

    if (productConfigSwiper) {
        const productConfigSlidesCount =
            productConfigSwiper.querySelectorAll(".swiper-slide");

        if (productConfigSlidesCount.length > 0) {
            const productConfigSwiperInstance = new Swiper(
                productConfigSwiper,
                {
                    slidesPerView: 1.1,
                    loop: false,
                    centeredSlides: false,
                    spaceBetween: 8,
                    navigation: {
                        nextEl: ".swiper-config-next",
                        prevEl: ".swiper-config-prev",
                    },
                    scrollbar: {
                        el: ".product-config-swiper-progress",
                        draggable: true,
                        // type: "progressbar",
                    },
                    speed: 500,
                    breakpoints: {
                        576: {
                            slidesPerView: 1.3,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        992: {
                            slidesPerView: 3.1,
                            spaceBetween: 20,
                        },
                    },
                }
            );
        }
    }

    const accordionsInit = () => {
        const accordions = [
            ...document.querySelectorAll(".js-accordion-header"),
        ];

        if (accordions.length > 0) {
            accordions.forEach((item, index) => {
                const content = item.parentElement.querySelector(
                    ".accordion-item_body"
                );
                const iconPlus = item.querySelector(".plus");
                const iconMinus = item.querySelector(".minus");

                // Initialize the accordions
                if (
                    index === 0 &&
                    !item.classList.contains("mobile-menu_item")
                ) {
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
        }
    };

    accordionsInit();
    const productVideoUrlContainer =
        document.querySelector(".product-video-url");
    const productVideoEl = document.querySelector(".product_bg-video");

    if (productVideoEl && productVideoUrlContainer) {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sourceEl = productVideoEl.querySelector("source");
                        if (
                            productVideoUrlContainer.textContent.trim() !==
                                "" &&
                            sourceEl
                        ) {
                            sourceEl.src =
                                productVideoUrlContainer.textContent.trim();
                            productVideoEl.load();
                        }

                        observer.unobserve(productVideoEl);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(productVideoEl);
    }

    const videoWrappers = document.querySelectorAll(".js-webflow-video-bg");

    const playVideo = (video) => {
        if (!video.hasPlayed) {
            video.play();
            video.hasPlayed = true;
        }
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const video = entry.target.querySelector("video");
                    if (video) {
                        playVideo(video);
                    }
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    videoWrappers.forEach((wrapper) => {
        const video = wrapper.querySelector("video");
        if (video) {
            video.hasPlayed = false;
            observer.observe(wrapper);
        }
    });

    const indicators = document.querySelectorAll(".scroll-item-indicator");
    const steps = document.querySelectorAll(".js-steps");
    if (steps) {
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

    function growBorderToRight(rows) {
        rows.forEach((row) => {
            gsap.to(row, {
                scrollTrigger: {
                    trigger: row,
                    start: "top 80%",
                    once: true,
                },
                onStart: () => {
                    const borders = row.querySelectorAll(".js-animated-border");

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
    const currentYear = new Date().getFullYear();
    $(`[data="year"]`).html(currentYear);

    let timerInterval;
    let intervalId;
    let startTime;

    const elements = ["see", "perceive", "eliminate"];
    let currentIndex = 0;

    const progressBars = document.querySelectorAll(".video-progress-status");
    const progressBarTimelines = [];

    let currentVideoIndex = 0;

    // Create timelines for each progress bar
    elements.forEach((element, index) => {
        const progressBar = progressBars[index];
        const tl = gsap.timeline({ paused: true });
        tl.to(progressBar, { width: "100%", duration: 6, ease: "linear" }); // Duration set to match the video length (6s in this case)
        progressBarTimelines.push(tl);
    });

    function playProgressBar(index) {
        // Pause and reset all progress bars except the one at the current index
        progressBarTimelines.forEach((timeline, i) => {
            if (i === index) {
                timeline.restart(); // Restart the timeline for the active progress bar
            } else {
                timeline.pause().progress(0); // Reset and pause other timelines
            }
        });

        currentVideoIndex = index;
    }

    const timerDisplay = document.querySelector(".videos-info-text");

    function startTimer() {
        clearInterval(timerInterval);

        startTime = Date.now();

        function updateTimer() {
            const elapsedTime = Date.now() - startTime;

            const milliseconds = elapsedTime % 1000;
            const seconds = Math.floor((elapsedTime / 1000) % 60);
            const minutes = Math.floor((elapsedTime / 60000) % 60);

            const formattedTime = `${String(minutes).padStart(
                2,
                "0"
            )} : ${String(seconds).padStart(2, "0")} : ${String(
                milliseconds
            ).padStart(3, "0")}`;

            timerDisplay.textContent = formattedTime;
        }

        timerInterval = setInterval(updateTimer, 10); // Update every 10ms for smoother display
    }

    function resetProgressBars() {
        progressBarTimelines.forEach((tl) => tl.progress(0).pause());
        clearInterval(timerInterval); // Reset timeline without clearing
    }

    function startVideoRotation() {
        showVideoBlockItem(elements[currentIndex]);
        playProgressBar(currentIndex);
        startTimer();

        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % elements.length;
            // Reset progress bars if we're looping back to the first element
            if (currentIndex === 0) {
                resetProgressBars();
            }

            showVideoBlockItem(elements[currentIndex]);
            playProgressBar(currentIndex);
            startTimer(); // Start timer every time the video changes
        }, 6000);
    }

    function toggleVideoBlockItem(element) {
        const videoBlockItems = document.querySelectorAll(".videos-item");
        const videoBlockTabs = document.querySelectorAll(
            ".videos-tabs-wrapper a"
        );

        if (videoBlockItems.length && videoBlockTabs.length) {
            document
                .querySelector(`#show-${element}-video`)
                .addEventListener("click", function (e) {
                    e.preventDefault();

                    clearInterval(intervalId); // Stop automatic rotation
                    clearInterval(timerInterval); // Clear the timer
                    resetProgressBars(); // Reset all progress bars

                    currentIndex = elements.indexOf(element); // Update the index to the clicked element
                    showVideoBlockItem(element);
                    playProgressBar(currentIndex);
                    startTimer();

                    setTimeout(() => {
                        startVideoRotation();
                    }, 100);
                    // Restart auto-play after manual selection
                    // intervalId = setInterval(() => {
                    //     currentIndex = (currentIndex + 1) % elements.length;
                    //     showVideoBlockItem(elements[currentIndex]);
                    //     playProgressBar(currentIndex);
                    //     startTimer();

                    //     if (currentIndex === 0) resetProgressBars();
                    // }, 6000);
                });
        }
    }

    function showVideoBlockItem(element) {
        const videoBlockItems = document.querySelectorAll(".videos-item");
        const videoBlockTabs = document.querySelectorAll(
            ".videos-tabs-wrapper a"
        );

        if (videoBlockItems.length && videoBlockTabs.length) {
            videoBlockTabs.forEach((tab) => {
                tab.classList.remove("active");
            });

            const activeTab = document.querySelector(`#show-${element}-video`);
            if (activeTab) {
                activeTab.classList.add("active");
            }

            videoBlockItems.forEach((vid) => {
                if (vid.classList.contains(`image-${element}`)) {
                    vid.style.display = "block";
                } else {
                    vid.style.display = "none";
                }
            });
        }
    }

    // Initialize the video rotation

    const sectionVideos = document.querySelector(".section_videos");

    if (sectionVideos) {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startVideoRotation();
                        observer.unobserve(sectionVideos);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(sectionVideos);
    }

    // Call toggleVideoBlockItem for each element
    elements.forEach((element) => toggleVideoBlockItem(element));

    let latitude = 45.254336;
    let longitude = 30.204552;

    const latEl = document.getElementById("latitude");
    const longEl = document.getElementById("longitude");
    function updateCoordinates() {
        // Randomly change the coordinates slightly to simulate movement
        latitude += (Math.random() - 0.5) * 0.0001;
        longitude += (Math.random() - 0.5) * 0.0001;

        // Update the displayed coordinates
        latEl.textContent = latitude.toFixed(6);
        longEl.textContent = longitude.toFixed(6);
    }

    if (latEl && longEl) {
        setInterval(updateCoordinates, 1000);
    }

    const megaMenuLinks = document.querySelectorAll(".products-menu-toggle");
    const megaMenu = document.querySelector(".products-mega-menu");
    megaMenuLinks.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (this.classList.contains("open")) {
                megaMenuLinks.forEach((b) => {
                    b.classList.remove("open");
                });
                megaMenu.classList.remove("open");
                bodyEl.classList.remove("no-scroll");
                lenis.start();
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

    const mailerliteForm = document.getElementById("wf-form-Newsletter-Form");

    if (mailerliteForm) {
        const newsletterSuccess = document.getElementById("newsletter-success");
        const newsletterError = document.getElementById("newsletter-error");
        const newsletterSubmit = document.querySelector(".newsletter-submit");

        const emailInput = document.getElementById("Subscriber-Email");
        const privacyCheckbox = document.getElementById(
            "Newsletter-Privacy-Policy"
        );

        const emailRequired = document.getElementById("email-required");
        const privacyRequired = document.getElementById(
            "newsletter-privacy-error"
        );

        emailInput.addEventListener("input", function () {
            emailRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";
        });

        privacyCheckbox.addEventListener("change", function () {
            privacyRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";
        });
        newsletterSubmit.addEventListener("click", function (e) {
            e.preventDefault();

            let isValid = true;

            emailRequired.style.display = "none";
            privacyRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";

            if (!privacyCheckbox.checked) {
                isValid = false;
                privacyRequired.style.display = "flex";
            }

            if (emailInput.value.trim() === "") {
                emailRequired.style.display = "flex";
                isValid = false;
            }

            const data = {
                email: emailInput.value,
            };

            if (isValid) {
                fetch("https://connect.mailerlite.com/api/subscribers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjhhODg3NjMwNzhhOTIxNDg2YTA4NzFjOTA4ZGU3ZWIyNWEyMjA1MGQ0YWM1YjNiNjBjM2RkNzkxOTUwMWVkNjk5MDQ3MTcwOGExY2Y5NDIiLCJpYXQiOjE3MjY2NTg2OTAuNjgxMjkzLCJuYmYiOjE3MjY2NTg2OTAuNjgxMjk3LCJleHAiOjQ4ODIzMzIyOTAuNjc3MzY4LCJzdWIiOiIxMTA4NTUyIiwic2NvcGVzIjpbXX0.ueZVWOw66s2AN4cmmD5mZMdKcvZ4jbB2tJcNxKtNywwVFTnevBkQuy8S42lmozxotpecYQ5IwzDqJMf66AchJSpAW7mxlO86Ck0BhwdS7Lfaeuvp5mlkt6s2oHTKErPjGHewStUcMdizRMn432OTuwokJ5PexV-c-0xGYAS59q2pwQZC2L9v61JsPO2ROBB0JXXAbUqS56N52Wp5oxHIztUdkyrF8cEaInrxf4o2AvJ6jMzgPdh73fwCGUSFw9lebsfgveFvjeDyOKWj9C6qAXn9PnE-_knKsj_LVWfCy9yntmf_smwQ1LUcuMbrXcuwI-oh15ZEfdrzl2rPJqlBFPUVx3ItzesbwmlhmRgKyeDRvOQ3E6WaXdErTMD-jb8MX2izGs0I36GO71eARhXBXIA5gtGWBKGujqkzKkJbSsvkSrXvoNxhVeGqw9pkoD3VoQ9tHJssws3WC3nyn6tBrHZlQGqEZ9EEoVig8yZF2q6xpgroDMxoX204DD8YkThSHO1ZfkM-wmNL64-XmW-ZZDqrQNoAm3uwJYM1RfMxFfAXp9LWY5_YKt5DiBUO57EGrljkH4BHvQGa6ObfrYptw0Rr2QnUPGNSFRFQsy3qpXrnivkqw5R6TtuACdCRYGgw3N8g-D1hoIrv5Qn2Jy225znQjgmY_XfqozMv_FNMfcE",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! status: ${response.status}`
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // console.log("Success:", data);

                        mailerliteForm.style.display = "none";

                        if (newsletterSuccess) {
                            newsletterSuccess.style.display = "block";
                        }
                    })
                    .catch((error) => {
                        if (newsletterError) {
                            newsletterError.style.display = "block";
                        }
                        console.error("Error:", error);
                    });
            }
        });
    }
});
