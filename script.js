/* =========================
   SHOPPING CART
========================= */

let cart = [];


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " has been added to your cart.");
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;
            itemCount += item.quantity;


            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₦${formatMoney(item.price * item.quantity)}
                    </p>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    cartCount.textContent = itemCount;

    cartTotal.textContent =
        "₦" + formatMoney(total);
}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();
}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* =========================
   FORMAT MONEY
========================= */

function formatMoney(number) {

    return number.toLocaleString("en-NG");
}


/* =========================
   OPEN CART
========================= */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts() {

    const searchInput =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =
            product.dataset.name.toLowerCase();

        const productText =
            product.textContent.toLowerCase();


        if (
            productName.includes(searchInput) ||
            productText.includes(searchInput)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    document
        .getElementById("navbar")
        .classList.toggle("active");

}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });


    alert(
        "Checkout total: ₦" +
        formatMoney(total) +
        "\n\nThank you for shopping with Ucheson Motors!"
    );

}


/* =========================
   CONTACT FORM
========================= */

function sendMessage(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    alert(
        "Thank you, " +
        name +
        "! Your message has been received."
    );


    event.target.reset();

}


/* =========================
   CLOSE CART WHEN CLICKING
   OUTSIDE THE CART
========================= */

document
    .getElementById("cartOverlay")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeCart();

        }

    });


/* =========================
   INITIAL CART
========================= */

updateCart();

// your other JavaScript code...

updateCart();

document.addEventListener("DOMContentLoaded", function () {

    const content = document.querySelector(".about-content");
    const button = document.querySelector(".read-more-btn");
    const section = document.querySelector(".about-ucheson");

    if (!content || !button || !section) {
        return;
    }

    button.addEventListener("click", function () {

        content.classList.toggle("open");

        if (content.classList.contains("open")) {
            button.textContent = "Read Less";
        } else {
            button.textContent = "Read More";

            setTimeout(function () {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }

    });

});

const productsSection = document.querySelector(".products-section");
const productsTitle = document.querySelector(".products-title");

let lastScrollY = window.scrollY;
let titleX = 0;

window.addEventListener("scroll", function () {

    const rect = productsSection.getBoundingClientRect();

    // ONLY work while the Products section is visible
    if (rect.bottom > 0 && rect.top < window.innerHeight) {

        const currentScrollY = window.scrollY;

        // Scroll DOWN → move LEFT
        if (currentScrollY > lastScrollY) {
            titleX -= 7;
        }

        // Scroll UP → move RIGHT
        else if (currentScrollY < lastScrollY) {
            titleX += 7;
        }

        titleX = Math.max(-500, Math.min(500, titleX));

        productsTitle.style.transform =
            `translate(calc(-50% + ${titleX}px), -50%)`;

        lastScrollY = currentScrollY;
    }
});

/* =========================================
   UCHESON MOTORS
   ABOUT US JAVASCRIPT
========================================= */


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-card"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =========================================
   ANIMATED COUNTERS
========================================= */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach((counter) => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = target / 80;

        function updateCounter() {

            current += increment;

            if (current < target) {

                counter.textContent = Math.floor(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        }

        updateCounter();

    });

}


/* =========================================
   DETECT WHEN STATS ENTER SCREEN
========================================= */

const statsSection = document.querySelector(".stats-section");


const statsObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                startCounters();

            }

        });

    },
    {
        threshold: 0.3
    }
);


if (statsSection) {

    statsObserver.observe(statsSection);

}


/* =========================================
   HERO PARALLAX EFFECT
========================================= */

const heroImage = document.querySelector(".hero-image img");
const heroContent = document.querySelector(".hero-content");


window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {

        if (heroImage) {

            heroImage.style.transform =
                `scale(1.1) translateY(${scrollPosition * 0.08}px)`;

        }


        if (heroContent) {

            heroContent.style.transform =
                `translateY(${scrollPosition * -0.12}px)`;

        }

    }

});


/* =========================================
   MOVING EXPERTISE CARDS
========================================= */

const expertCards = document.querySelectorAll(".expert-card");


window.addEventListener("scroll", () => {

    expertCards.forEach((card, index) => {

        const rect = card.getBoundingClientRect();

        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {

            const movement =
                (windowHeight - rect.top) * 0.03;

            if (index % 2 === 0) {

                card.style.transform =
                    `translateX(${-movement}px)`;

            } else {

                card.style.transform =
                    `translateX(${80 + movement}px)`;

            }

        }

    });

});


/* =========================================
   NAVBAR BACKGROUND
========================================= */

const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background =
            "rgba(17, 17, 17, 0.92)";

        navbar.style.color = "white";

    } else {

        navbar.style.background =
            "rgba(245, 245, 243, 0.85)";

        navbar.style.color = "#111";

    }

});


/* =========================================
   SMOOTH CARD STAGGER
========================================= */

const cardGroups = document.querySelectorAll(".service-card, .why-box");


const cardObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const cards =
                    entry.target.parentElement.children;

                const current =
                    Array.from(cards).indexOf(entry.target);

                entry.target.style.transitionDelay =
                    `${current * 0.12}s`;

            }

        });

    },
    {
        threshold: 0.1
    }
);


cardGroups.forEach((card) => {

    cardObserver.observe(card);

});


/* =========================================
   PREVENT IMAGE DRAGGING
========================================= */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("dragstart", (event) => {

        event.preventDefault();

    });

});

