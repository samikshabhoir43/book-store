let cartCount = 0;


/* =========================
   ADD TO CART
========================= */

function addToCart() {

    cartCount++;

    document.getElementById("cartCount").textContent =
        cartCount;

    alert("Book added to cart!");
}


/* =========================
   SUBSCRIBE
========================= */

function subscribeUser() {

    const email =
        document.getElementById("emailInput").value;

    if (!email) {

        alert("Please enter your email.");

        return;
    }

    alert("Thanks for subscribing!");
}


/* =========================
   CATEGORY
========================= */

function showCategory(category) {

    const cards =
        document.querySelectorAll(".book-card");

    cards.forEach(card => {

        if (card.dataset.category === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =========================
   SEARCH
========================= */

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    const searchValue =
        this.value.toLowerCase();

    const cards =
        document.querySelectorAll(".book-card");

    cards.forEach(card => {

        const title =
            card.dataset.title.toLowerCase();

        if (title.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});
