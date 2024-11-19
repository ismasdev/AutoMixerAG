// HTML
const mapCountSelect = document.getElementById("map-count"); // Selector de cantidad de maps
const startDrawButton = document.getElementById("start-draw"); // input para sortear
const matchList = document.getElementById("match-list"); // Lista resultados
const addTeamButton = document.getElementById("add-team"); // Botón para agregar teams
const teamInput = document.getElementById("team-input"); // Input para ingresar teams
const teamList = document.getElementById("team-list"); // Lista de teams

// Lista de teams
let teams = [];

// Lista de maps
const maps = [
  "Agony", "dabo", "farewell", "lost_village", "semonz", "ag_crossfire", "DARN", "fling",
  "lost_village2", "snark_pit", "ag_hidden_lab", "datacore", "frenzy", "moss", "stalkx",
  "boot_camp", "dm_dust2", "gasworks", "olvidada_muerte", "stalkyard", "bounce", "doublecross",
  "havoc", "outcry", "subtransit", "cabrito", "echo", "homeworld", "rapidcore", "the_beach",
  "cold_faces", "eden", "isotonic", "rats", "undertow", "COMBAT2", "elixir", "lambda_bunker",
  "rustmill", "urethane", "crossfire", "endcamp", "last_call", "scary_1", "vengeance"
];

// Agregar team
addTeamButton.addEventListener("click", () => {
  const teamName = teamInput.value.trim(); 
  if (teamName !== "") {
    teams.push(teamName); 
    updateTeamList(); 
    teamInput.value = "";
  } else {
    alert("Por favor, ingrese un nombre de team/player.");
  }
});


function updateTeamList() {
  teamList.innerHTML = ""; 
  teams.forEach((team) => {
    const li = document.createElement("li");
    li.textContent = team;
    teamList.appendChild(li);
  });
}

// Realizar sorteo
startDrawButton.addEventListener("click", () => {
  const mapCount = parseInt(mapCountSelect.value);
  if (teams.length < 2) {
    alert("Se necesitan al menos 2 teams/players para realizar el mixer.");
    return;
  }

  // Mezclar teams aleatoriamente
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  const matches = [];
  let remainingMaps = [...maps];

  // Crear cruces
  while (shuffledTeams.length > 1) {
    const team1 = shuffledTeams.pop();
    const team2 = shuffledTeams.pop();

    // Asignar maps unicos
    const assignedMaps = [];
    for (let i = 0; i < mapCount; i++) {
      if (remainingMaps.length === 0) {
        // Si no quedan mapas, reiniciar maplist
        remainingMaps = [...maps];
      }
      const randomIndex = Math.floor(Math.random() * remainingMaps.length);
      assignedMaps.push(remainingMaps.splice(randomIndex, 1)[0]); 
    }

    matches.push({ team1, team2, maps: assignedMaps });
  }

  displayResults(matches);
});


// Mostrar resultado
function displayResults(matches) {
  matchList.innerHTML = ""; 
  matches.forEach((match, index) => {
    const li = document.createElement("li");
    li.innerHTML = `Match ${index + 1}: ${match.team1} vs ${match.team2}<br>Maps: ${match.maps.join(", ")}`;
    matchList.appendChild(li);
  });
}


// Agregar team al presionar el botón
addTeamButton.addEventListener("click", addTeam);

// Agregar team al presionar Enter
teamInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTeam(); // Llamar directamente a la función
  }
});

// Función para agregar un team
function addTeam() {
  const teamName = teamInput.value.trim();
  if (teamName !== "") {
    teams.push(teamName); 
    updateTeamList(); 
    teamInput.value = ""; 
  } else {
    alert("Por favor, ingrese un nombre de team/player válido.");
  }
}

// Actualizar la lista de team visualmente
function updateTeamList() {
  teamList.innerHTML = ""; 
  teams.forEach((team) => {
    const li = document.createElement("li");
    li.textContent = team; 
    teamList.appendChild(li); 
  });
}
