const typeApi = "https://pokeapi.co/api/v2/type";

const typeFilter = document.querySelector("#filter");

fetch(typeApi)
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((type) => {
            const option = document.createElement("option");
            option.value = type.name;
            option.textContent = type.name;
            typeFilter.appendChild(option);
        });
    });

typeFilter.addEventListener("change", function () {
    const selectedType = this.value;

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        if (selectedType === "" || card.dataset.type.includes(selectedType)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});
