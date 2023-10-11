"use strict";

$(document).ready(function () {
  fetchRecipes();

  $("#add-form").submit(function (e) {
    e.preventDefault();
    console.log("add front-end validation");

    const entity = {
      author: $("#author").val(),
      name: $("#name").val(),
      type: $("#type").val(),
      recipe: $("#recipe").val(),
    };

    if (!validateEntity(entity)) return;
    var requestData = JSON.stringify(entity);

    $.ajax({
      url: "/api/add.php",
      type: "POST",
      data: requestData,
      dataType: "json",
      success: function () {
        $("#author").val("");
        $("#name").val("");
        $("#type").val("");
        $("#recipe").val("");

        fetchRecipes();
      },
      error: function (_jqXHR, textStatus, errorThrown) {
        const message = `Error adding recipe: ${textStatus} - ${errorThrown}`;

        console.error(message);
        alert(message);
      },
    });
  });
});
