// HTML
const mapCountSelect = document.getElementById("map-count"); // Selector de cantidad de maps
const startDrawButton = document.getElementById("start-draw"); // input para sortear
const matchList = document.getElementById("match-list"); // Lista resultados
const addTeamButton = document.getElementById("add-team"); // Botón para agregar teams
const teamInput = document.getElementById("team-input"); // Input para ingresar teams
const teamList = document.getElementById("team-list"); // Lista de teams

// Lista de teams
let teams = [];

// Lista original
const mapListDefault = [
  "Agony", "dabo", "farewell", "lost_village", "semonz", "ag_crossfire", "DARN", "fling",
  "lost_village2", "snark_pit", "ag_hidden_lab", "datacore", "frenzy", "moss", "stalkx",
  "boot_camp", "dm_dust2", "gasworks", "olvidada_muerte", "stalkyard", "bounce", "doublecross",
  "havoc", "outcry", "subtransit", "cabrito", "echo", "homeworld", "rapidcore", "the_beach",
  "cold_faces", "eden", "isotonic", "rats", "undertow", "COMBAT2", "elixir", "lambda_bunker",
  "rustmill", "urethane", "crossfire", "endcamp", "last_call", "scary_1", "vengeance"
];

// Lista LMBDA
const mapListLMBDA = [
  "agony","awol","ag_aztec","ag_aztec2","ag_crossfire","ag_cbble","ag_hidden_lab","ag_park","ag_inferno",
  "battlegrounds","boot_camp","bounce","boot_campx","cabrito","cold_faces","cyanidestalkyard","crossfire",
  "datacore","dabo","darn","de_railroad","dm_delve","dm_dust","dm_dust2","dockingbay","doublecross","echo",
  "eden","endcamp","endworld","enix","elixir","farewell","fling","frenzied","frenzy","gasworks","havoc",
  "homeworld","isotonic","kabul","last_call","lambda_bunker","lost_village","lost_village2","moss","no_remorse",
  "obsolete","outcry","olvidada_muerte","pwrcore","rapidcore","rebellion","rats","rustmill","scary_1","scary_2",
  "semonz","stalkx","snark_pit","stalkyard","subtransit","the_beach","the_tube","undertow","undyz","urethane",
  "vengeance","xbounce","xbounce2"
];

//  Lista OGHL WORLDCUP 2025
const WcMaps = [
  "ag_aztec","ag_aztec2","ag_crossfire","ag_hidden_lab","ag_inferno","ag_italy","ag_park","ag_mirage","agony",
  "awol","battlegrounds","boot_camp","boot_campx","bounce","cabrito","cold_faces","crossfire","cliffside3",
  "cyanidestalkyard","dabo","darn","datacore","combat2","doublecross","dm_delve","dm_dust","dm_dust2","donkingbay",
  "echo","eden","elixir","endcamp","endworld","enix","farewell","fling","frenzy","frenzied","gasworks","havoc",
  "homeworld","hl_pyrozone","isotonic","kabul","lambda_bunker","last_call","lost_village","lost_village2","moss",
  "morning_frost","no_remorse","olvidada_muerte","pwrcore","outcry","rats","rebellion","rapidcore","rustmill",
  "scary_1","scary_2","semonz","snark_pit","stalkyard","stalkx","stalkx_amped","subtransit","tear","the_beach",
  "undertow","undyz","urethane","vengeance","xbounce","xbounce_2"
];



// Agregar team
// Evento para agregar equipo al hacer clic en el botón
addTeamButton.addEventListener("click", addTeam);

// Evento para agregar equipo al presionar Enter
teamInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Evita que se envíe el formulario o se recargue la pag
    addTeam();
  }
});

// Función para agregar un equipo
function addTeam() {
  const teamName = teamInput.value.trim(); // Obtener y limpiar el valor del input
  if (teamName !== "") {
    teams.push(teamName); // Agregar el equipo a la lista
    updateTeamList(); // Actualizar la lista visualmente
    teamInput.value = ""; // Limpiar el input
  } else {
    alert("Por favor, ingrese un nombre de team/player válido.");
  }
}



// Realizar sorteo
startDrawButton.addEventListener("click", () => {
  const mapCount = parseInt(mapCountSelect.value); // Cantidad de mapas por cruce
  const selectedMapPool = document.getElementById("map-pool").value; // Obtener selección de lista

  // ✅ Asegurar que la lista seleccionada se use correctamente
let maps;

switch (selectedMapPool) {
  case "lmbda":
    maps = [...lmbdaMaps];
    break;
  case "wc":
    maps = [...WcMaps]; // ✅ Ya se usa correctamente acá
    break;
  default:
    maps = [...defaultMaps];
}


  if (teams.length < 2) {
    alert("Se necesitan al menos 2 teams/players para realizar el mixer.");
    return;
  }

  // Mezclar teams aleatoriamente
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  const matches = [];

  // Crear cruces
  while (shuffledTeams.length > 1) {
    const team1 = shuffledTeams.pop();
    const team2 = shuffledTeams.pop();

    // ✅ Corregimos la selección aleatoria sin repetir
    const availableMaps = [...maps]; // Copia para evitar problemas de repetición
    const assignedMaps = [];

    for (let i = 0; i < mapCount; i++) {
      if (availableMaps.length === 0) break; // Evitar errores si hay pocos mapas
      const randomIndex = Math.floor(Math.random() * availableMaps.length);
      assignedMaps.push(availableMaps[randomIndex]);
      availableMaps.splice(randomIndex, 1); // Eliminar el mapa ya usado
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
