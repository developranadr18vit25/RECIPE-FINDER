let search = document.querySelector("#searchBtn");
let recipeInput = document.querySelector("#searchInput");
let displaymeal = document.querySelector(".recipes");


search.addEventListener("click", async () => {

    const recipeName = recipeInput.value.trim();
    console.log(recipeName);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);
    let data = await response.json();
    console.log(data);

    restaurant(data);

});

async function restaurant(data) {
    displaymeal.innerHTML = "";

    let mealName = data.meals.forEach(meal => {
        console.log(meal.strMeal);

        const card = document.createElement("div");
        const viewRecipeBtn = document.createElement("button");
        viewRecipeBtn.innerText = "View Recipe";

        card.classList.add("recipe-card");
        card.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>`;

        displaymeal.appendChild(card);
        card.appendChild(viewRecipeBtn);

        viewRecipeBtn.addEventListener("click", () => {

            const displaypopup = document.createElement("div");
            const displaypopupcontent = document.createElement("div");
            const closePopup=document.createElement("button");
            displaypopup.classList.add("popup");
            displaypopupcontent.classList.add("popup-content");
            closePopup.classList.add("close-btn");
            closePopup.innerText="Close";

            let itemsUsed = "";

            for (let i = 1; i <= 20; i++) {
                let quantityList = meal[`strMeasure${i}`];
                let ingredientList = meal[`strIngredient${i}`];

                if (ingredientList) {
                    itemsUsed = itemsUsed + `<li>${quantityList} ${ingredientList}</li>`
                }
            }

            displaypopupcontent.innerHTML = `

            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}">

            <p>Ingredients : </p>
            <br>
            <ul>${itemsUsed}</ul>
            <br>

            <p>Instructions : </p>
            <br>
            ${meal.strInstructions}
            `

            closePopup.addEventListener("click",()=>{
                displaypopup.remove();
            })

            displaypopup.appendChild(displaypopupcontent);
            displaypopup.appendChild(closePopup);
            document.body.appendChild(displaypopup);
        })
    });
}



