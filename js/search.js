const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const pokemonName = card.dataset.name.toLowerCase(); // Assuming each card has a 'data-name' attribute with the Pokémon's name
        if (pokemonName.includes(searchTerm)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});
