export default function () {
    const mutationsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const cookieYesModal = document.querySelector(".cky-modal");

            if (cookieYesModal) {
                cookieYesModal.setAttribute("data-lenis-prevent", "");
                mutationsObserver.disconnect(); // Stop observing once the attribute is added
            }
        });
    });

    mutationsObserver.observe(document.body, {
        childList: true, // Watches for the addition/removal of child nodes
        subtree: true, // Watches for changes in all descendant nodes
    });
}
