"use strict";

function fetchRecipes(buttonText = null) {
  const tbody = $("#recipes-tbody");

  $.ajax({
    url: "/api/recipes.php",
    type: "GET",
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

        if (buttonText) {
          const buttonTd = $("<td class='button-cell'>");
          const button = $("<button>");

          button.text(buttonText);
          button.attr("id", `${buttonText.toLowerCase()}-button`);

          buttonTd.append(button);
          tr.append(buttonTd);
        }

        tbody.append(tr);
        $("#entities").css("visibility", "visible");
      });
    },
    error: function (_jqXHR, textStatus, errorThrown) {
      const message = `Error fetching recipes: ${textStatus} - ${errorThrown}`;
      console.error(message);
    },
  });
}

function validateAuthor(author) {
  if (author.length < 3)
    return "\nAuthor name must be at least 3 characters long!";

  return "";
}
function validateName(name) {
  if (name.length < 3)
    return "\nRecipe name must be at least 3 characters long!";

  return "";
}
function validateType(type) {
  if (type.length < 3)
    return "\nRecipe type must be at least 3 characters long!";

  return "";
}
function validateRecipe(recipe) {
  if (recipe.length < 10)
    return "\nThe actual recipe must be at least 10 characters long!";

  return "";
}

function validateEntity(entity) {
  let errors = "";

  errors += validateAuthor(entity.author);
  errors += validateName(entity.name);
  errors += validateType(entity.type);
  errors += validateRecipe(entity.recipe);

  if (errors.length > 0) {
    const message = `Front end validation error!${errors}`;

    console.error(message);
    alert(message);
  }

  return errors.length === 0;
}
