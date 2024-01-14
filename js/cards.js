const api = "https://pokeapi.co/api/v2/pokemon?limit=1302";

const container = document.querySelector(".container");

fetch(api)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const pokemons = data.results;

        pokemons.forEach((pokemon, index) => {
            createPokemonCard(pokemon, index);
        });
    });

createPokemonCard = (pokemon, index) => {
    fetch(pokemon.url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const card = document.createElement("article");
            card.classList.add("card");
            card.dataset.id = data.id;

            const cardTitle = document.createElement("h2");
            cardTitle.classList.add("card__title");
            cardTitle.textContent = data.name;

            const cardImg = document.createElement("img");
            cardImg.classList.add("card__image");
            cardImg.src = data.sprites.front_default;
            cardImg.alt = data.name;

            const cardBtn = document.createElement("button");
            cardBtn.classList.add("card__button");
            cardBtn.textContent = "Voir le détail";

            const cardLink = document.createElement("a");
            cardLink.appendChild(cardBtn);

            const imgDiv = document.createElement("div");
            imgDiv.classList.add("img__container");
            imgDiv.appendChild(cardImg);

            card.appendChild(cardTitle);
            card.appendChild(imgDiv);
            card.appendChild(cardLink);

            container.appendChild(card);

            card.classList.add("fadeInUpBig");
            card.style.animationDelay = `${index * 0.1}s`;
            setTimeout(() => {
                card.style.opacity = 1;
            }, 500);
        });
};

container.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const btn = e.target.closest(".card__button");
    if (btn) {
        const id = card.dataset.id;
        localStorage.setItem("pokemonId", id);
        window.location.href = "pokemon.html";
    }
});

// Zoom de l'image quand je passe sur la carte
container.addEventListener("mouseover", (e) => {
    const card = e.target.closest(".card");
    const img = card.querySelector(".card__image");
    img.classList.add("zoom");
});
container.addEventListener("mouseout", (e) => {
    const card = e.target.closest(".card");
    const img = card.querySelector(".card__image");
    img.classList.remove("zoom");
});
