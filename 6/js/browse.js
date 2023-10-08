"use strict";

let previousFilter = "none";

$(document).ready(function () {
  fetchRecipeTypes();
  fetchRecipes();
});

function filter_by_type() {
  const selectedType = $("#select-type").val();
  fetchRecipesByType(selectedType);

  // Update previous filter text
  $("#previous").text(`Previous filter: ${previousFilter}`);
  previousFilter = selectedType;
}

function fetchRecipeTypes() {
  const selectType = $("#select-type");

  $.ajax({
    url: "/api/recipe-types.php",
    type: "GET",
    dataType: "json",
    success: function (recipeTypes) {
      recipeTypes.forEach((type) => {
        const option = $("<option>");
        option.text(type);
        selectType.append(option);
      });
      $("#select-container").css("visibility", "visible");
    },
    error: function (_jqXHR, textStatus, errorThrown) {
      const message = `Error fetching recipe types: ${textStatus} - ${errorThrown}`;
      console.error(message);
    },
  });
}

function fetchRecipesByType(selectedType) {
  const requestData = JSON.stringify({ type: selectedType });
  const tbody = $("#recipes-tbody");

  $.ajax({
    url: "/api/filter-type.php",
    type: "POST",
    data: requestData,
    dataType: "json",
    success: function (recipes) {
      tbody.empty();

      recipes.forEach((recipe) => {
        const tr = $("<tr>");
        tr.data("id", recipe.id);

        const authorTd = $("<td>");
        authorTd.text(recipe.author);
        tr.append(authorTd);

        const nameTd = $("<td>");
        nameTd.text(recipe.name);
        tr.append(nameTd);

        const typeTd = $("<td>");
        typeTd.text(recipe.type);
        tr.append(typeTd);

        const recipeTd = $("<td>");
        recipeTd.text(recipe.recipe);
        tr.append(recipeTd);

        tbody.append(tr);
      });
    },
    error: function (_jqXHR, textStatus, errorThrown) {
      const message = `Error fetching recipes: ${textStatus} - ${errorThrown}`;
      console.error(message);
    },
  });
}
