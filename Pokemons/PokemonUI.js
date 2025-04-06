export class PokemonUI {
  constructor(viewModel, jsonUrl = "./pokemon_data.json") {
    this.viewModel = viewModel;
    this.jsonUrl = jsonUrl;
  }

  async init() {
    this.cacheDom();
    this.bindEvents();
    await this.fetchAndLoadPokemons();
    this.renderGlobalList();
    this.showTeam();
    this.updateCreditsDisplay();
  }

  cacheDom() {
    this.twoPlayersToggle = document.getElementById("two-players-toggle");
    this.player2Container = document.getElementById("player2-container");
    this.player2Input = document.getElementById("player2-name");
    this.player1Input = document.getElementById("player1-name");
    this.startTeamSelectionButton = document.getElementById("start-team-selection-button");
    this.playerSetupSection = document.getElementById("player-setup-section");
    this.teamSelectionSection = document.getElementById("team-selection-section");
    this.currentPlayerSelection = document.getElementById("current-player-selection");
    this.pokemonGrid = document.getElementById("pokemon-grid");
    this.nextPlayerButton = document.getElementById("next-player-button");
    this.sortOptionsSection = document.getElementById("sort-options-section");
    this.sortOptionsForm = document.getElementById("sort-options-form");
    this.sortTeamButton = document.getElementById("sort-team");
    this.battleSection = document.getElementById("battle-section");
    this.currentTurnDisplay = document.getElementById("current-turn-display");
    this.selectedTeamGrid = document.getElementById("selected-team-grid");
    this.creditsDisplay = document.getElementById("remaining-credits");
    this.attackButton = document.getElementById("attack-button");
  }

  bindEvents() {
    this.twoPlayersToggle.addEventListener("change", () => this.updatePlayer2Visibility());
    this.startTeamSelectionButton.addEventListener("click", () => this.startTeamSelection());
    this.nextPlayerButton.addEventListener("click", () => this.handleNextPlayer());
    this.sortTeamButton.addEventListener("click", () => this.handleSortOptions());
    this.pokemonGrid.addEventListener("click", (event) => this.toggleSelection(event));
    this.attackButton.onclick = () => this.fightRound();
  }

  updatePlayer2Visibility() {
    if (this.twoPlayersToggle.checked) {
      this.player2Container.style.display = "block";
      this.player2Input.required = true;
      if (this.player2Input.value === "CPU") {
        this.player2Input.value = "";
      }
    } else {
      this.player2Container.style.display = "none";
      this.player2Input.required = false;
      this.player2Input.value = "CPU";
    }
  }
// se cargan los pokemons del json
  async fetchAndLoadPokemons() {
    try {
      const response = await fetch(this.jsonUrl);
      const data = await response.json();
      this.viewModel.pokemonList.loadPokemons(data);
    } catch (error) {
      console.error("Error loading pokemons:", error);
    }
  }
// en esta función se carga la lista de pokemons
  renderGlobalList() {
    this.pokemonGrid.innerHTML = "";
    const pokemons = this.viewModel.getGlobalList();
    pokemons.forEach((pokemon) => {
      const card = document.createElement("div");
      card.className = "pokemon-card";
      card.dataset.name = pokemon.name;

      const img = document.createElement("img");
      let imgSrc = pokemon.image;
      if (!imgSrc || imgSrc === "Type:_Null.png") {
        imgSrc = "./images/Type:_Null.png";
      }
      img.src = imgSrc;
      img.alt = pokemon.name;

      const name = document.createElement("h3");
      name.textContent = pokemon.name;

      const points = document.createElement("p");
      points.textContent = `Puntos: ${pokemon.points}`;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(points);

      // Marcar si ya está en el equipo del jugador actual
      if (this.viewModel.player1 && this.viewModel.player2) {
        const currentTeam =
          this.viewModel.getCurrentPlayer() === this.viewModel.player1
            ? this.viewModel.player1.team.getTeamDetails()
            : this.viewModel.player2.team.getTeamDetails();
        if (currentTeam.find(p => p.name === pokemon.name)) {
          card.classList.add("selected");
        }
      }

      this.pokemonGrid.appendChild(card);
    });
  }
// en esta función se agrega o quita el pokemon seleccionado
  toggleSelection(event) {
    const card = event.target.closest('.pokemon-card');
    if (!card) return;
    
    const pokemonName = card.dataset.name;
    const currentPlayer = this.viewModel.getCurrentPlayer();
    const currentTeam = currentPlayer.team.getTeamDetails();
    const isSelected = currentTeam.some(p => p && p.name === pokemonName);
    
    if (!isSelected) {
      const added = this.viewModel.addPokemonToTeam(pokemonName);
      if (added) {
        card.classList.add("selected");
      } 
    } else {
      const removed = this.viewModel.removePokemonFromTeam(pokemonName);
      if (removed) {
        card.classList.remove("selected");
      }
    }
    this.renderGlobalList();
    this.showTeam();
    this.updateCreditsDisplay();
  }
// sirve para ordenar los pokemons
  handleSortOptions() {
    const criteria = this.sortOptionsForm.querySelector('input[name="sort-criteria"]:checked').value;
    const method = this.sortOptionsForm.querySelector('input[name="sort-method"]:checked').value;
    this.viewModel.sortGlobalList(criteria, method);
    this.renderGlobalList();
  }
// sirve para iniciar la selección de equipos
  startTeamSelection() {
    const p1 = this.player1Input.value.trim();
    let p2 = this.player2Input.value.trim();
  
    if (!p1) {
      alert("Por favor, introduce el nombre del Jugador 1.");
      return;
    }
    if (this.twoPlayersToggle.checked && !p2) {
      alert("Por favor, introduce el nombre del Jugador 2.");
      return;
    }
  
    const isSinglePlayer = !this.twoPlayersToggle.checked;
    if (isSinglePlayer) {
      p2 = "CPU";
    }
    this.viewModel.initializeMatch(p1, p2);
  
    // Ocultamos la sección de configuración y mostramos la selección de equipos
    this.playerSetupSection.style.display = "none";
    this.teamSelectionSection.style.display = "block";
    this.sortOptionsSection.style.display = "block";
    this.nextPlayerButton.style.display = "block";
  
    // cambia de pantalla y muestra el nombre del jugador actual
    this.currentPlayerSelection.textContent = `${this.viewModel.player1.getName()}, selecciona tus Pokémon`;
    this.renderGlobalList();
    this.showTeam();
    this.updateCreditsDisplay();
  
    // Si se juega contra la CPU, se selecciona automáticamente su equipo
    if (isSinglePlayer) {
      this.viewModel.autoSelectCpuTeam();
    }
  }
  // Cambia al siguiente jugador
  handleNextPlayer() {
    if (this.viewModel.currentPlayer === this.viewModel.player1) {
      if (this.viewModel.player1.team.selectedTeam.length === 0) {
        alert(`${this.viewModel.player1.getName()}, ¡por favor selecciona al menos un Pokémon!`);
        return;
      }
      if (this.twoPlayersToggle.checked) {
        this.viewModel.switchPlayer();
        this.currentPlayerSelection.textContent = `${this.viewModel.player2.getName()}, selecciona tus Pokémon`;
        this.renderGlobalList();
        this.showTeam();
        this.updateCreditsDisplay();
      } else {
        this.viewModel.autoSelectCpuTeam();
        this.transitionToBattle();
      }
    } else {
      if (this.viewModel.player2.team.selectedTeam.length === 0) {
        alert(`${this.viewModel.player2.getName()}, ¡por favor selecciona al menos un Pokémon!`);
        return;
      }
      this.transitionToBattle();
    }
  }
  // Cambia a la sección de batalla
  transitionToBattle() {
    this.teamSelectionSection.style.display = "none";
    this.sortOptionsSection.style.display = "none";
    this.battleSection.style.display = "block";
    this.currentTurnDisplay.textContent = `Batalla: ${this.viewModel.player1.getName()} vs ${this.viewModel.player2.getName()}`;
    this.startBattle();
    this.attackButton.disabled = false;
  }
  // hace que se ejecute una ronda de ataque
  fightRound() {
    const battleLogDiv = document.getElementById("battle-log");
    const roundLog = this.viewModel.fightRound();
    battleLogDiv.innerHTML += roundLog + "<br/>";
    this.updateTeamsDisplay();
    
    // Si alguno de los equipos se queda sin Pokemons, se muestra el ganador
    if (
      this.viewModel.player1.team.selectedTeam.length === 0 ||
      this.viewModel.player2.team.selectedTeam.length === 0
    ) {
      const winner = (this.viewModel.player1.team.selectedTeam.length > 0)
                     ? this.viewModel.player1.getName()
                     : this.viewModel.player2.getName();
      battleLogDiv.innerHTML += `<strong>Guanyador: ${winner}</strong>`;
      this.attackButton.disabled = true;
    }
  }

  // muestra los equipos de cada jugador al inicio de la ronda de ataque
  startBattle() {
    const player1 = this.viewModel.player1;
    const player2 = this.viewModel.player2;

    document.getElementById("player1-name-battle").textContent = player1.getName();
    document.getElementById("player2-name-battle").textContent = player2.getName();

    const player1Pokemons = document.getElementById("player1-pokemons");
    const player2Pokemons = document.getElementById("player2-pokemons");

    player1Pokemons.innerHTML = "";
    player2Pokemons.innerHTML = "";

    player1.team.getTeamDetails().forEach(pokemon => {
      const div = document.createElement("div");
      div.className = "team-pokemon-card";
      div.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
      `;
      player1Pokemons.appendChild(div);
    });

    player2.team.getTeamDetails().forEach(pokemon => {
      const div = document.createElement("div");
      div.className = "team-pokemon-card";
      div.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
      `;
      player2Pokemons.appendChild(div);
    });
  }
  // actualiza la pantalla de los equipos de pokemons de cada jugador
  updateTeamsDisplay() {
    const player1 = this.viewModel.player1;
    const player2 = this.viewModel.player2;

    document.getElementById("player1-name-battle").textContent = player1.getName();
    document.getElementById("player2-name-battle").textContent = player2.getName();

    const player1Pokemons = document.getElementById("player1-pokemons");
    const player2Pokemons = document.getElementById("player2-pokemons");

    player1Pokemons.innerHTML = "";
    player2Pokemons.innerHTML = "";

    player1.team.getTeamDetails().forEach(pokemon => {
      const div = document.createElement("div");
      div.className = "team-pokemon-card";
      div.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
      `;
      player1Pokemons.appendChild(div);
    });

    player2.team.getTeamDetails().forEach(pokemon => {
      const div = document.createElement("div");
      div.className = "team-pokemon-card";
      div.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
      `;
      player2Pokemons.appendChild(div);
    });
  }
  // muestra el equipo los jugadores
  showTeam() {
    if (!this.selectedTeamGrid) return;
    this.selectedTeamGrid.innerHTML = "";
    const currentPlayer = this.viewModel.getCurrentPlayer();
    if (!currentPlayer || !currentPlayer.team) return;
    const teamDetails = currentPlayer.team.getTeamDetails();
    teamDetails.forEach((pokemon) => {
      const div = document.createElement("div");
      div.className = "team-pokemon-card";
      let imgSrc = pokemon.image;
      div.innerHTML = `
        <img src="${imgSrc}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>Puntos: ${pokemon.points}</p>
      `;
      this.selectedTeamGrid.appendChild(div);
    });
  }
// actualiza los creditos
  updateCreditsDisplay() {
    if (this.creditsDisplay && this.viewModel.getCurrentPlayer() && this.viewModel.getCurrentPlayer().team) {
      const currentCredits = this.viewModel.getCurrentPlayer().team.getCredits();
      this.creditsDisplay.textContent = `Créditos restantes: ${currentCredits}`;
    } 
  }

// indica si un Pokémon ya se encuentra en el equipo del jugador actual
  isPokemonInTeam(name) {
    const currentPlayer = this.viewModel.getCurrentPlayer();
    if (!currentPlayer || !currentPlayer.team) return false;
    return currentPlayer.team.getTeamDetails().some(pokemon => pokemon.name === name);
  }
}
