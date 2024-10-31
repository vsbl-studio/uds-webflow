import Swiper from "swiper";
import {
    Navigation,
    Pagination,
    EffectFade,
    Autoplay,
    Scrollbar,
} from "swiper/modules";

export default function () {
    Swiper.use([Navigation, Pagination, EffectFade, Autoplay, Scrollbar]);

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

    const productConfigSwipersWrappers = document.querySelectorAll(
        ".product-config-swiper-wrapper"
    );

    if (productConfigSwipersWrappers) {
        productConfigSwipersWrappers.forEach((wrapper) => {
            const productConfigSlidesCount =
                wrapper.querySelectorAll(".swiper-slide");

            if (productConfigSlidesCount.length > 0) {
                const instanceWrapper = wrapper.querySelector(
                    ".js-product-config-swiper"
                );

                const nextArrow = wrapper.querySelector(".swiper-config-next");
                const prevArrow = wrapper.querySelector(".swiper-config-prev");
                const progressBar = wrapper.querySelector(
                    ".product-config-swiper-progress"
                );
                const configSwiperInstance = new Swiper(instanceWrapper, {
                    slidesPerView: 1.1,
                    loop: false,
                    centeredSlides: false,
                    spaceBetween: 8,
                    navigation: {
                        nextEl: nextArrow,
                        prevEl: prevArrow,
                    },
                    scrollbar: {
                        el: progressBar,
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
                });
            }
        });
    }
}
