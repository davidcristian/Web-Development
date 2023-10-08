"use strict";

$(document).ready(function () {
  fetchRecipes("Update");

  $("#update-form").on("submit", function (e) {
    e.preventDefault();
    console.log("update front-end validation");

    const entity = {
      id: $("#id").val(),
      author: $("#author").val(),
      name: $("#name").val(),
      type: $("#type").val(),
      recipe: $("#recipe").val(),
    };

    if (!validateEntity(entity)) return;
    var formData = JSON.stringify(entity);

    $.ajax({
      url: "/api/update.php",
      type: "POST",
      data: formData,
      dataType: "json",
      success: function () {
        $("#update-form").css("visibility", "hidden");
        fetchRecipes("Update");
      },
      error: function (_jqXHR, textStatus, errorThrown) {
        const message = `Error updating recipe: ${textStatus} - ${errorThrown}`;

        console.error(message);
        alert(message);
      },
    });
  });

  $("table").on("click", "#update-button", function () {
    const recipeId = $(this).closest("tr").data("id");
    if (recipeId === $("#update-form #id").val()) {
      $("#update-form").css("visibility", "hidden");
      $("#update-form #id").val("0");

      return;
    }

    const recipeAuthor = $(this).closest("tr")[0].cells[0].innerText;
    const recipeName = $(this).closest("tr")[0].cells[1].innerText;
    const recipeType = $(this).closest("tr")[0].cells[2].innerText;
    const recipeRecipe = $(this).closest("tr")[0].cells[3].innerText;

    $("#update-form #id").val(recipeId);
    $("#update-form #author").val(recipeAuthor);
    $("#update-form #name").val(recipeName);
    $("#update-form #type").val(recipeType);
    $("#update-form #recipe").val(recipeRecipe);

    if ($("#update-form").css("visibility") !== "visible") {
      $("#update-form").css("visibility", "visible");
    }
  });
});
