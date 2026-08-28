// ===============================
// THE FLAKY BEAN
// Main JavaScript
// ===============================


// ===============================
// MOBILE NAVIGATION
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navigation.classList.toggle("open");

    });


    // Close menu after clicking a link

    const navLinks = navigation.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navigation.classList.remove("open");

        });

    });

}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".menu-card, .story-content, .story-image, .review, .gallery-item, .contact-info > div"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// ===============================
// NEWSLETTER FORM
// ===============================

const newsletterForm =
    document.getElementById("newsletterForm");

const formMessage =
    document.getElementById("formMessage");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();

        const emailInput =
            newsletterForm.querySelector("input");

        if (!emailInput.value) {
            return;
        }

        if (formMessage) {

            formMessage.textContent =
                "THANK YOU — YOU'RE ON THE LIST ☕";

        }

        emailInput.value = "";

    });

}


// ===============================
// HEADER SCROLL EFFECT
// ===============================

const header =
    document.querySelector(".site-header");

let previousScroll = window.scrollY;


window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;

    if (!header) return;


    // Don't hide header while near the top

    if (currentScroll < 100) {

        header.style.transform = "translateY(0)";

        previousScroll = currentScroll;

        return;

    }


    // Scrolling down

    if (currentScroll > previousScroll) {

        header.style.transform =
            "translateY(-100%)";

    }

    // Scrolling up

    else {

        header.style.transform =
            "translateY(0)";

    }


    previousScroll = currentScroll;

});


// ===============================
// BUTTON RIPPLE EFFECT
// ===============================

const buttons =
    document.querySelectorAll(".button");


buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.add("clicked");

        setTimeout(() => {

            button.classList.remove("clicked");

        }, 300);

    });

});


// ===============================
// IMAGE HOVER PARALLAX
// ===============================

const visualElements =
    document.querySelectorAll(
        ".hero-circle, .feature-image, .image-placeholder"
    );


visualElements.forEach(element => {

    element.addEventListener("mousemove", event => {

        const rect =
            element.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const moveX =
            (x / rect.width - 0.5) * 12;

        const moveY =
            (y / rect.height - 0.5) * 12;

        element.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform = "";

    });

});


// ===============================
// CURRENT YEAR
// ===============================

const footerYear =
    document.querySelector(".footer-bottom span");

if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} THE FLAKY BEAN`;

}


// ===============================
// PAGE LOADED
// ===============================

document.body.classList.add("page-loaded");
