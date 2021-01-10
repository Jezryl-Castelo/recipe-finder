const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector(".container");
const sushiImage = document.querySelector(".sushi");
let searchQuery = '';
const APP_ID = "0afafdc7";
const APP_key = "69cb8af4aa436ea914b9305824fa8871";
const input = document.querySelector('input')
const searchIcon = document.querySelector('.search-icon');

//Make form enter and icon click fire the submit event
searchForm.addEventListener('submit', submitForm)
searchIcon.addEventListener('click', submitForm)

function submitForm() {
    searchQuery = input.value;
    fetchAPI();
}

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&to=48&app_id=${APP_ID}&app_key=${APP_key}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    container.classList.remove('initial');
    sushiImage.style.display = "none";
    let generatedHTML = '';
    results.map(result => {
        let spaced = ""
        result.recipe.healthLabels.map(ingredient => {
            spaced.trimEnd(',');
            spaced += ingredient + "," + " ";
            
        })
        console.log(spaced)
        generatedHTML +=
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
        </div>
        <div class="details">
            <p class="item-data">
            <ion-icon name="flame-outline"></ion-icon>
            ${result.recipe.calories.toFixed(0)}</p>
            <p class="restrictions">${spaced}</p>

            <a class="view-button" target="_blank" href="${result.recipe.url}">View Recipe</a>
            </div>
        </div> `
    })
    searchResultDiv.innerHTML = generatedHTML;
}



