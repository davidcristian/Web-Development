"use strict";

$(document).ready(function () {
  const $overlay = $("#overlay");

  function clearMainForm() {
    $("#first-name").val("");
    $("#last-name").val("");
    $("#email").val("");
    $("#password").val("");
    $("#country").val("");

    $("#address").val("");
  }

  function clearModalFields() {
    $("#address-modal").val("");
    $("#state-county").val("");
    $("#city").val("");
    $("#zip-code").val("");
  }

  // Ignore Enter key press in input fields
  $("input").keydown(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });

  function setAddressFieldValue() {
    const address =
      $("#address-modal").val() +
      $("#state-county").val() +
      $("#city").val() +
      $("#zip-code").val();

    $("#address").val(address);
  }

  // Open modal when Open button is clicked
  $("#open-modal").click(function (event) {
    event.preventDefault();

    clearModalFields();
    $overlay.fadeIn();

    $("#address-modal").focus();
  });

  // Close modal when Close button is clicked
  $("#modal-form").submit(function (event) {
    event.preventDefault();

    setAddressFieldValue();
    $overlay.fadeOut();

    $("#first-name").focus();
  });

  clearMainForm();
  $("#first-name").focus();
});
