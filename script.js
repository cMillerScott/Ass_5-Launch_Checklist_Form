//load event
window.addEventListener("load", function () {
  //access form div
  let form = document.querySelector("form");
  //access form input data
  let pilotNameInput = document.querySelector("input[name=pilotName]");
  let copilotNameInput = document.querySelector("input[name=copilotName]");
  let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
  let cargoMassInput = document.querySelector("input[name=cargoMass]");
  //listens for submit
  form.addEventListener("submit", function (event) {
    //prevents form submission to server
    event.preventDefault();
    //validates user fills each field
    if (
      pilotNameInput.value === "" ||
      copilotNameInput.value === "" ||
      fuelLevelInput.value === "" ||
      cargoMassInput.value === ""
    ) {
      alert("All fields are required!");
      //stops launch status change if user input invalid
      event.stopImmediatePropagation();
    }
    //validates user input data types
    if (
      isNaN(pilotNameInput.value) === false ||
      isNaN(copilotNameInput.value) === false ||
      isNaN(fuelLevelInput.value) === true ||
      isNaN(cargoMassInput.value) === true
    ) {
      alert("Make sure to enter valid information for each field!");
      //stops launch status change if user input invalid
      event.stopImmediatePropagation();
    }
  });

  //2nd submit event listener to enable validation to prevent launch status changes
  form.addEventListener("submit", function (event) {
    //references IDs for HTML list items
    let faultyItemsDiv = document.getElementById("faultyItems");
    let launchStatusText = document.getElementById("launchStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let coPilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    //updates faulty items div, Pilot/CoPilot names, and launch status text and color
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

  //fetch planetary data
  fetch("https://handlers.education.launchcode.org/static/planets.json").then(
    function (response) {
      response.json().then(function (json) {
        //references div for planetary data
        let missionTargetDiv = document.getElementById("missionTarget");
        //random selection function
        function randomSelection(arr) {
          let index = Math.floor(Math.random() * arr.length);
          return arr[index];
        }
        //event listener to cycle through randomized mission targets
        missionTargetDiv.addEventListener("click", function () {
          //variable to hold random json selection
          randoJson = randomSelection(json);
          //adds randomized json content to mission target div
          missionTargetDiv.innerHTML = `
           <h2>Mission Destination</h2>
           <button id="missionRandomizer">Mission Randomizer</button>
           <ol>
           <li>Name: ${randoJson.name}</li>
           <li>Diameter: ${randoJson.diameter}</li>
           <li>Star: ${randoJson.star}</li>
           <li>Distance from Earth: ${randoJson.distance}</li>
           <li>Number of Moons: ${randoJson.moons}</li>
           </ol>
           <img src="${randoJson.image}">
           `;
        });
      });
    }
  );
});
