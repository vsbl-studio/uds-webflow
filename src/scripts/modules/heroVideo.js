export default function () {
    const heroVideo = document.getElementById("hero-background-video");

    // Safari autoplay fallback
    if (heroVideo) {
        heroVideo.play().catch(function () {
            // Autoplay failed, possibly Safari: set muted to true and play again
            heroVideo.muted = true;
            heroVideo.play();
        });
    }
}
