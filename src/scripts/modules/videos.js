import gsap from "gsap";

export default function () {
    let timerInterval;
    let intervalId;
    let startTime;

    const elements = ["detect", "engage", "command"];
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

    function holdProgressBars(index) {
        // Set all progress bars before the current index to 100% width
        progressBars.forEach((bar, barIndex) => {
            if (barIndex < index) {
                gsap.set(bar, { width: "100%" });
            } else if (barIndex === index) {
                gsap.set(bar, { width: "0%" }); // Start current bar from 0%
            } else {
                gsap.set(bar, { width: "0%" }); // Ensure future bars are also at 0%
            }
        });
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
                holdProgressBars(-1);
            }

            showVideoBlockItem(elements[currentIndex]);
            playProgressBar(currentIndex);
            holdProgressBars(currentIndex);
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
                    holdProgressBars(currentIndex);
                    startTimer();

                    setTimeout(() => {
                        startVideoRotation();
                    }, 100);
                });
        }
    }

    function showVideoBlockItem(element) {
        // Images
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

            videoBlockItems.forEach((image) => {
                if (image.classList.contains(`image-${element}`)) {
                    image.style.display = "block";
                } else {
                    image.style.display = "none";
                }
            });
        }
        // Videos
        const videoElementsWrapper = document.querySelector(
            ".videos-player-item"
        );

        const realVideoElements =
            videoElementsWrapper.querySelectorAll("video");
        if (realVideoElements.length) {
            realVideoElements.forEach((video) => {
                const videoId = video.getAttribute("id");
                const targetId = `video-${element}`;

                if (videoId === targetId) {
                    if (video.style.display !== "block") {
                        video.style.display = "block";
                        video.currentTime = 0;
                    }
                    video.play();
                    playVideo(video);
                } else {
                    if (video.style.display !== "none") {
                        video.pause();
                        video.currentTime = 0;
                        video.style.display = "none";
                    }
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

    // Initial UTM coordinates
    let zoneNumber = 36;
    let zoneLetter = "T";
    let easting = 280563;
    let northing = 5015062;

    const utmEl = document.getElementById("utm-coordinates");

    function updateUTMCoordinates() {
        const eastingStep = (Math.random() - 0.5) * 10; // Random small steps to simulate movement
        const northingStep = (Math.random() - 0.5) * 10; // Random small steps to simulate movement

        // Update easting and northing values
        easting += eastingStep;
        northing += northingStep;

        // Format and display the UTM coordinates
        const formattedUTM = `${zoneNumber} ${zoneLetter} ${easting.toFixed(
            0
        )} ${northing.toFixed(0)}`;

        if (utmEl) {
            utmEl.textContent = `${formattedUTM}`;
        }
    }

    // Set the interval to update the UTM coordinates every second
    setInterval(updateUTMCoordinates, 1000);

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

    videoWrappers.forEach((wrapper) => {
        const video = wrapper.querySelector("video");
        if (video) {
            video.hasPlayed = false;
            observer.observe(wrapper);
        }
    });
}
