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

/* =========================
   SHOPPING CART
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cartButton");
    const cartClose = document.getElementById("cartClose");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let cart = JSON.parse(localStorage.getItem("flakyBeanCart")) || [];

    function openCart() {
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeCart() {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    function saveCart() {
        localStorage.setItem("flakyBeanCart", JSON.stringify(cart));
    }

    function updateCart() {
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <p class="cart-empty">Your cart is empty.</p>
            `;
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");

                itemElement.className = "cart-item";

                itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)} each</p>
                    </div>

                    <div class="cart-item-controls">
                        <button class="quantity-button" data-action="decrease" data-index="${index}">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button class="quantity-button" data-action="increase" data-index="${index}">
                            +
                        </button>

                        <button class="remove-button" data-action="remove" data-index="${index}">
                            ×
                        </button>
                    </div>
                `;

                cartItems.appendChild(itemElement);
            });
        }

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        const totalPrice = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        cartCount.textContent = totalItems;
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

        saveCart();
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
        openCart();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            addToCart(name, price);
        });
    });

    cartItems.addEventListener("click", event => {
        const button = event.target.closest("button");

        if (!button) return;

        const index = Number(button.dataset.index);
        const action = button.dataset.action;

        if (action === "increase") {
            cart[index].quantity += 1;
        }

        if (action === "decrease") {
            cart[index].quantity -= 1;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
        }

        if (action === "remove") {
            cart.splice(index, 1);
        }

        updateCart();
    });

    cartButton.addEventListener("click", openCart);
    cartClose.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    updateCart();
});
/* =========================
   ORDER FORM CONNECTION
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.getElementById("checkoutButton");
    const orderOverlay = document.getElementById("orderOverlay");
    const orderClose = document.getElementById("orderClose");
    const orderForm = document.getElementById("orderForm");
    const orderTotal = document.getElementById("orderTotal");

    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");

    function getCart() {
        return JSON.parse(localStorage.getItem("flakyBeanCart")) || [];
    }

    function getCartTotal() {
        const cart = getCart();

        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }

    function openOrderForm() {
        const cart = getCart();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        orderTotal.textContent = `$${getCartTotal().toFixed(2)}`;

        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("open");
        document.body.style.overflow = "hidden";

        orderOverlay.classList.add("open");
    }

    function closeOrderForm() {
        orderOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    checkoutButton.addEventListener("click", openOrderForm);

    orderClose.addEventListener("click", closeOrderForm);

    orderOverlay.addEventListener("click", event => {
        if (event.target === orderOverlay) {
            closeOrderForm();
        }
    });

  orderForm.addEventListener("submit", async event => {
    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const customerName = document.getElementById("customerName").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const orderType = document.querySelector(
        'input[name="orderType"]:checked'
    ).value;
    const orderNotes = document.getElementById("orderNotes").value;

    const items = cart.map(item =>
        `${item.name} x${item.quantity}`
    ).join(", ");

    const total = getCartTotal().toFixed(2);

    const orderData = {
        customerName: customerName,
        customerPhone: customerPhone,
        orderType: orderType,
        items: items,
        orderNotes: orderNotes,
        total: total
    };

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwxybAgkMZCZFBFhVcJBWi5U4fQRrsSOXodhOWNPi_jlYxkadm2tMWuhIpH-DdSk0UEbg/exec";

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(orderData)
        });

        localStorage.removeItem("flakyBeanCart");

        orderForm.reset();

        alert(
            "Your order has been received! We will contact you shortly."
        );

        closeOrderForm();

        location.reload();

    } catch (error) {
        console.error("Order submission failed:", error);

        alert(
            "Something went wrong. Please try again."
        );
    }
});
