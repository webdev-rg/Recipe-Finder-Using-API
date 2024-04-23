const recipeInput = document.getElementById("search-recipe");
const btn = document.getElementById("search-recipe-btn");
const resultCount = document.querySelector(".result-count span");
const recipeContainer = document.querySelector(".recipe-container");

const searchRecipes = async () => {
  let searchValue = recipeInput.value.trim();

  const url = `https://api.edamam.com/search?q=${searchValue}&app_id=26b655cb&app_key=2d0929bf6db9da861ac5ac326984a422`;

  const response = await fetch(url);
  const data = await response.json();

  displayRecipes(data.hits);

  resultCount.style.display = "block";
  resultCount.innerText = `${data.hits.length} Results for "${searchValue}"`;
  searchValue = "";
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  searchRecipes();
});

const displayRecipes = (recipes) => {
  let recipeContent = "";
  recipes.forEach((recipe) => {
    recipeContent += `
      <div class="recipe-content">
        <div class="recipe-img">
          <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" />
        </div>
        <h2 class="title">${recipe.recipe.label}</h2>
        <ul class="ingredients-list">
          ${recipe.recipe.ingredientLines
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}
        </ul>
        <a href="${recipe.recipe.url}" class="view-recipe">View Recipe</a>
      </div>
    `;
  });
  recipeContainer.innerHTML = recipeContent;
};
