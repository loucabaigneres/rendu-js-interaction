// Récupération de l'API PokéAPI
const api = "https://pokeapi.co/api/v2/pokemon?limit=12";

// Récupération de l'élément HTML <section> qui contiendra la liste des pokémons
const container = document.querySelector(".container");

// Récupération des données de l'API
fetch(api)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // Récupération de la liste des pokémons
        const pokemons = data.results;

        // Appel de la fonction createPokemonCard() pour chaque pokémon de la liste
        pokemons.forEach((pokemon) => {
            createPokemonCard(pokemon);
        });
    });

// Fonction qui crée une carte pour un pokémon
createPokemonCard = (pokemon) => {
    fetch(pokemon.url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Création de la carte
            const card = document.createElement("article");
            card.classList.add("card");
            // Stockage de l'id du Pokémon dans un attribut de données
            card.dataset.id = data.id;

            // Création du titre de la carte
            const cardTitle = document.createElement("h2");
            cardTitle.classList.add("card__title");
            cardTitle.textContent = data.name;

            // Création de l'image du pokémon
            const cardImg = document.createElement("img");
            cardImg.classList.add("card__image");
            cardImg.src = data.sprites.front_default;
            cardImg.alt = data.name;

            // Création du bouton d'ajout à l'équipe
            const cardBtn = document.createElement("button");
            cardBtn.classList.add("card__button");
            cardBtn.textContent = "Ajouter à l'équipe";

            // Ajout d'un écouteur d'événements sur le bouton pour empêcher la propagation de l'événement de clic
            // cardBtn.addEventListener("click", (e) => {
            //     e.stopPropagation();
            //     console.log("Hey");
            // });

            // Ajout des éléments à la card
            card.appendChild(cardTitle);
            card.appendChild(cardImg);
            card.appendChild(cardBtn);

            // Ajout du lien vers la page de produit
            const cardLink = document.createElement("a");
            cardLink.appendChild(card);

            // Ajout de la card à la section
            container.appendChild(cardLink);
        });
};

// Écouteur d'événements délégué pour gérer les clics sur les cards créées dynamiquement
// container.addEventListener("click", (e) => {
//     const card = e.target.closest(".card");
//     if (card) {
//         const id = card.dataset.id;
//         localStorage.setItem("pokemonId", id);
//         window.location.href = "pokemon.html";
//     }
// });

// Écouteur d'événements délégué pour gérer les clics sur les boutons et les cards créés dynamiquement
container.addEventListener("click", (e) => {
    const btn = e.target.closest(".card__button");
    if (btn) {
        e.stopPropagation();
        console.log("Hey");
    } else {
        const card = e.target.closest(".card");
        if (card) {
            const id = card.dataset.id;
            localStorage.setItem("pokemonId", id);
            window.location.href = "pokemon.html";
        }
    }
});
