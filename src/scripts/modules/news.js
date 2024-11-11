import gsap from "gsap";
export default function () {
    const mutationsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const newsPosts = document.querySelectorAll(".blog-list-item_link");

            if (newsPosts.length) {
                newsPosts.forEach((post) => {
                    const url = post.getAttribute("data-external-url");

                    if (url.trim().length) {
                        post.setAttribute("href", url);
                        post.setAttribute("target", "_blank");
                    }
                });
            }

            const pagination = document.querySelector(".pagination");

            if (pagination) {
                const paginationItems = document.querySelectorAll(
                    ".button.is-pagination"
                );
                if (paginationItems.length === 1) {
                    pagination.style.opacity = "0";
                } else {
                    pagination.style.opacity = "1";
                }
            }
        });
    });

    mutationsObserver.observe(document.body, {
        childList: true, // Watches for the addition/removal of child nodes
        subtree: true, // Watches for changes in all descendant nodes
    });
}
