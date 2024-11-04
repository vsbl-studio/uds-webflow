export default function () {
    const mutationsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const newsPosts = document.querySelectorAll(".blog-list-item_link");

            if (newsPosts.length) {
                newsPosts.forEach((post) => {
                    const url = post.getAttribute("data-external-url");

                    if (url.trim().length) {
                        post.setAttribute("href", url);
                    }
                });
            }
        });
    });

    mutationsObserver.observe(document.body, {
        childList: true, // Watches for the addition/removal of child nodes
        subtree: true, // Watches for changes in all descendant nodes
    });
}
