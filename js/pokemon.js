// Récupération de l'ID du Pokémon à partir du localStorage
const pokemonId = localStorage.getItem("pokemonId");

// Récupération de l'API PokéAPI
const api = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

// Récupération des données de l'API
fetch(api)
    .then((response) => {
        return response.json();
    })
    .then((pokemon) => {
        const namePokemon = document.querySelector(".pokemon__name");
        const IdPokemon = document.querySelector(".pokemon__id");
        const imagePokemon = document.querySelector(".pokemon__image");
        const heightPokemon = document.querySelector(".pokemon__height");
        const weightPokemon = document.querySelector(".pokemon__weight");
        const typePokemon = document.querySelector(".pokemon__type");
        const abilityPokemon = document.querySelector(".pokemon__ability");

        // Remplissage des éléments avec les détails du Pokémon
        namePokemon.textContent = pokemon.name;
        IdPokemon.textContent = "#" + pokemon.id;
        imagePokemon.src = pokemon.sprites.front_default;
        imagePokemon.alt = pokemon.name;
        heightPokemon.textContent = "Taille : " + pokemon.height / 10 + " m";
        weightPokemon.textContent = "Poids : " + pokemon.weight / 10 + " kg";
        if (pokemon.types.length === 1) {
            typePokemon.textContent = "Type : " + pokemon.types[0].type.name;
        } else {
            typePokemon.textContent =
                "Type : " +
                pokemon.types[0].type.name +
                ", " +
                pokemon.types[1].type.name;
        }
        abilityPokemon.textContent =
            "Talent : " + pokemon.abilities[0].ability.name;

        // Requête à l'API pour obtenir les informations de la species
        return fetch(pokemon.species.url);
    })
    .then((response) => {
        return response.json();
    })
    .then((species) => {
        // Récupération de l'élément HTML où afficher la génération du Pokémon
        const generationPokemon = document.querySelector(
            ".pokemon__generation"
        );

        // Remplissage de l'élément avec la génération du Pokémon
        generationPokemon.textContent =
            "Génération : " + species.generation.name;
        // Récupération de l'URL de la région de la génération du Pokémon
        const regionUrl = species.generation.url;

        // Requête à l'API pour obtenir les informations de la région
        return fetch(regionUrl);
    })
    .then((response) => {
        return response.json();
    })
    .then((region) => {
        // Récupération de l'élément HTML où afficher la région du Pokémon
        const regionPokemon = document.querySelector(".pokemon__region");

        // Remplissage de l'élément avec la région du Pokémon
        regionPokemon.textContent = "Région : " + region.main_region.name;
    });

const pokemonBtn = document.querySelector(".pokemon__button");
let PokemonCartId = localStorage.getItem("pokemonCartId");
let cart = JSON.parse(PokemonCartId) || [];

updateCartCounter = () => {
    let cartCounter = document.querySelector(".cart__counter");

    // Mise à jour du compteur du panier s'il est supérieur à 0
    if (cart.length > 0) {
        cartCounter.textContent = cart.length;
        cartCounter.style.display = "flex";
    } else {
        cartCounter.style.display = "none";
    }
};

updateCartCounter();

pokemonBtn.addEventListener("click", () => {
    cart.push(pokemonId);
    localStorage.setItem("pokemonCartId", JSON.stringify(cart));

    updateCartCounter();
});
