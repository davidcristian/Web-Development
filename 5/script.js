"use strict";

const countiesSelect = document.getElementById("counties");
const citiesSelect = document.getElementById("cities");

// Load counties from API
fetch("https://roloca.coldfuse.io/judete")
  .then((response) => response.json())
  .then((counties) => {
    // Sort counties alphabetically
    counties.sort((a, b) => a.nume.localeCompare(b.nume));

    // Populate counties select box
    counties.forEach((county) => {
      const option = document.createElement("option");
      option.text = county.nume;
      option.value = county.auto;
      countiesSelect.add(option);
    });

    // Trigger change event to populate cities based on initial county
    //countiesSelect.dispatchEvent(new Event('change'));
  });

function addCity(text, value) {
  const option = document.createElement("option");
  option.text = text;
  option.value = value;
  citiesSelect.add(option);
}

// Populate cities based on selected county
countiesSelect.addEventListener("change", async () => {
  // Clear cities select box
  citiesSelect.innerHTML = "";

  const selectedCounty = countiesSelect.value;
  if (!selectedCounty) {
    citiesSelect.setAttribute("disabled", "disabled");
    addCity("--Select city--", "");
    return;
  }

  // Load cities for selected county from API
  await fetch(`https://roloca.coldfuse.io/orase/${selectedCounty}`)
    .then((response) => response.json())
    .then((cities) => {
      // Sort cities alphabetically
      cities.sort((a, b) => a.nume.localeCompare(b.nume));

      // Populate cities select box
      cities.forEach((city) => {
        addCity(city.nume, city.nume);
      });
    });

  if (citiesSelect.options.length > 0) {
    citiesSelect.removeAttribute("disabled");
  }
});
