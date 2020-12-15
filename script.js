//load event
window.addEventListener("load", function () {
  //access form div
  let form = document.querySelector("form");
  //listens for click
  form.addEventListener("submit", function (event) {
    //prevents form submission to server
    event.preventDefault();
    //access form input data
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");
    //validates user fills each field
    if (
      pilotNameInput.value === "" ||
      copilotNameInput.value === "" ||
      fuelLevelInput.value === "" ||
      cargoMassInput.value === ""
    ) {
      alert("All fields are required!");
    }
    //validates user input data types
    if (
      isNaN(pilotNameInput.value) === false ||
      isNaN(copilotNameInput.value) === false ||
      isNaN(fuelLevelInput.value) === true ||
      isNaN(cargoMassInput.value) === true
    ) {
      alert("Make sure to enter valid information for each field.");
    }
    //references IDs for HTML list items
    let faultyItemsDiv = document.getElementById("faultyItems");
    let launchStatusText = document.getElementById("launchStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let coPilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    //updates Pilot/CoPilot names
    faultyItemsDiv.style.visibility = "visible";
    launchStatusText.innerHTML = `Shuttle is ready for launch`;
    launchStatusText.style.color = "green";
    pilotStatus.innerText = `Pilot ${pilotNameInput.value} is ready for launch`;
    coPilotStatus.innerText = `Co-pilot ${copilotNameInput.value} is ready for launch`;
    //updates faulty items div, fuel status text, and launch status text and color
    if (fuelLevelInput.value < 10000) {
      faultyItemsDiv.style.visibility = "visible";
      fuelStatus.innerText = `Fuel level too low for launch`;
      launchStatusText.innerHTML = `Shuttle not ready for launch`;
      launchStatusText.style.color = "red";
    }
    //updates faulty items div, cargo status text, and launch status text and color
    if (cargoMassInput.value > 10000) {
      faultyItemsDiv.style.visibility = "visible";
      cargoStatus.innerText = `Cargo mass too high for launch`;
      launchStatusText.innerHTML = `Shuttle not ready for launch`;
      launchStatusText.style.color = "red";
    }
  });
});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
