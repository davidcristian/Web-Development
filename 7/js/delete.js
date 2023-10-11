"use strict";

$(document).ready(function () {
  fetchRecipes("Delete");

  $("table").on("click", "#delete-button", function () {
    const tableId = $(this).closest("tr").data("id");
    const requestData = JSON.stringify({ id: tableId });

    const tableRecipe = $(this).closest("tr")[0].cells[3].innerText;
    if (confirm(`The '${tableRecipe}' recipe will be deleted.`)) {
      $.ajax({
        url: "/api/delete.php",
        type: "POST",
        data: requestData,
        dataType: "json",
        success: function () {
          fetchRecipes("Delete");
        },
        error: function (_jqXHR, textStatus, errorThrown) {
          const message = `Error deleting recipe: ${textStatus} - ${errorThrown}`;

          console.error(message);
          alert(message);
        },
      });
    }
  });
});
