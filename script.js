document.addEventListener("DOMContentLoaded", function () {
    // Prevent scrolling when menu is open
    function lockScroll() {
        document.body.classList.add("scroll-locked");
        window.addEventListener("touchmove", preventDefaultScroll, { passive: false });
        window.addEventListener("wheel", preventDefaultScroll, { passive: false });
    }

    function unlockScroll() {
        document.body.classList.remove("scroll-locked");
        window.removeEventListener("touchmove", preventDefaultScroll);
        window.removeEventListener("wheel", preventDefaultScroll);
    }

    function preventDefaultScroll(event) {
        event.preventDefault();
    }

    // Handle menu toggle
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");

    if (menuBtn && menu) {
        menuBtn.addEventListener("click", function () {
            const isOpen = menu.classList.toggle("open");
            isOpen ? lockScroll() : unlockScroll();
        });
    }

    // Adjust header positioning
    const header = document.getElementById("header");
    const headerContent = document.getElementById("header-content");

    if (header && headerContent) {
        const offset = header.offsetWidth / 2 - 120;
        headerContent.style.transform = `translateX(-${offset}px)`;
    }

    // Handle carousel item click events
    function handleCarouselItemClick(event) {
        const url = event.currentTarget.getAttribute("data-url");
        if (url) {
            window.open(url, "_blank");
        }
    }

    // Load publications dynamically
    const swiperWrapper = document.getElementById("swiper-wrapper");

    if (swiperWrapper) {
        fetch("publications.json")
            .then(response => response.json())
            .then(publications => {
                publications.forEach(publication => {
                    const slide = document.createElement("div");
                    slide.classList.add("swiper-slide", "carousel-item");
                    slide.setAttribute("data-url", publication.url);
                    slide.innerHTML = `<img src="${publication.image}" alt="${publication.title}">`;
                    slide.addEventListener("click", handleCarouselItemClick);
                    swiperWrapper.appendChild(slide);
                });

                // Initialize Swiper only after elements are added
                if (typeof Swiper !== "undefined") {
                    new Swiper(".swiper-container", {
                        slidesPerView: "auto",
                        spaceBetween: 75,
                        loop: true,
                        centeredSlides: false,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }
                    });
                } else {
                    console.error("Swiper failed to load.");
                }
            })
            .catch(error => console.error("Error loading publications:", error));
    }
});
