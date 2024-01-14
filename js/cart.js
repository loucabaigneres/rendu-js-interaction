cartDisplay = () => {
    // Récupération des ID des Pokémon du localStorage
    let PokemonCartId = localStorage.getItem("pokemonCartId");
    let cart = JSON.parse(PokemonCartId) || [];

    // Pour chaque ID de Pokémon dans le panier
    cart.forEach((pokemonId) => {
        // Récupération des détails du Pokémon de l'API PokéAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => response.json())
            .then((pokemon) => {
                const pokemonContainer = document.createElement("div");
                pokemonContainer.classList.add("cart__card");

                const pokemonImg = document.createElement("img");
                pokemonImg.src = pokemon.sprites.front_default;
                pokemonImg.alt = pokemon.name;

                const pokemonName = document.createElement("h2");
                pokemonName.textContent = pokemon.name;

                const pokemonDiv = document.createElement("div");
                pokemonDiv.appendChild(pokemonImg);
                pokemonDiv.appendChild(pokemonName);

                const pokemonBtn = document.createElement("button");
                pokemonBtn.classList.add("cart__button");
                pokemonBtn.textContent = "Voir le détail";
                pokemonBtn.addEventListener("click", () => {
                    localStorage.setItem("pokemonId", pokemonId);
                    window.location.href = "pokemon.html";
                });

                const pokemonDeleteBtn = document.createElement("button");
                pokemonDeleteBtn.classList.add("delete__button");
                pokemonDeleteBtn.textContent = "Supprimer";
                pokemonDeleteBtn.addEventListener("click", () => {
                    cart = cart.filter((pokemon) => pokemon !== pokemonId);
                    localStorage.setItem("pokemonCartId", JSON.stringify(cart));

                    pokemonContainer.remove();
                });

                const buttonDiv = document.createElement("div");
                buttonDiv.appendChild(pokemonBtn);
                buttonDiv.appendChild(pokemonDeleteBtn);

                pokemonContainer.appendChild(pokemonDiv);
                pokemonContainer.appendChild(buttonDiv);

                const main = document.querySelector("main");
                main.appendChild(pokemonContainer);

                const pokemonContainers =
                    document.querySelectorAll(".cart__card");
                pokemonContainers.forEach((card) => {
                    card.addEventListener("mouseover", () => {
                        console.log("test");
                        pokemonImg.classList.add("bounce");
                    });
                    card.addEventListener("animationend", () => {
                        pokemonImg.classList.remove("bounce");
                    });
                });
            });
    });
};

cartDisplay();
