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
                    const index = cart.indexOf(pokemonId);
                    if (index > -1) {
                        cart.splice(index, 1);
                    }
                    localStorage.setItem("pokemonCartId", JSON.stringify(cart));

                    pokemonContainer.remove();

                    if (cart.length > 0) {
                        cartCounter.textContent = cart.length;
                        cartCounter.style.display = "flex";
                    } else {
                        cartCounter.style.display = "none";
                    }
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

    // Create Clear All button
    const clearAllButton = document.createElement("button");
    clearAllButton.textContent = "Clear All";

    const mainTop = document.querySelector(".main__top");
    mainTop.appendChild(clearAllButton);

    clearAllButton.addEventListener("click", () => {
        // Clear the cart array
        cart = [];

        // Update localStorage
        localStorage.setItem("pokemonCartId", JSON.stringify(cart));

        // Remove all pokemon containers from the page
        const main = document.querySelector("main");
        Array.from(main.children).forEach((child) => {
            if (child.className !== "main__top") {
                main.removeChild(child);
            }
        });

        // Update cartCounter
        cartCounter.textContent = "";
        cartCounter.style.display = "none";
    });
};

cartDisplay();
