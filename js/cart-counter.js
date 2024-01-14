let cartCounter = document.querySelector(".cart__counter");

let PokemonCartId = localStorage.getItem("pokemonCartId");
let cart = JSON.parse(PokemonCartId) || [];

// Mise à jour du compteur du panier s'il est supérieur à 0
if (cart.length > 0) {
    cartCounter.textContent = cart.length;
    cartCounter.style.display = "flex";
} else {
    cartCounter.style.display = "none";
}
