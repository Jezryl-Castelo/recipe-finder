const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector(".container");
const sushiImage = document.querySelector(".sushi");
let searchQuery = '';
const APP_ID = "0afafdc7";
const APP_key = "69cb8af4aa436ea914b9305824fa8871";



searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;
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
        generatedHTML +=
        `<div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
        </div>
            
        <div class="details">
            <p class="item-data">
            <ion-icon name="flame-outline"></ion-icon>
            ${result.recipe.calories.toFixed(0)}</p>
            <p class="restrictions">${result.recipe.healthLabels}</p>
            
            <a class="view-button" href="${result.recipe.url}">View Recipe</a>
            </div>
        </div> `
    })
    searchResultDiv.innerHTML = generatedHTML;
}