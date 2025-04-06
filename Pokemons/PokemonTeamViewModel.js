import { PokemonList } from './pokemon.js';
import { Player } from './Player.js';

export class PokemonTeamViewModel {
  constructor() {
    this.pokemonList = new PokemonList();
    this.player1 = null;
    this.player2 = null;
    this.currentPlayer = null;
  }

  initializeMatch(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.currentPlayer = this.player1;
  }

  switchPlayer() {
    this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  areTeamsComplete() {
    return this.player1.team.hasAvailablePokemon() && this.player2.team.hasAvailablePokemon();
  }

  addPokemonToTeam(pokemonName) {
    const pokemon = this.pokemonList.getPokemonByName(pokemonName);
    if (pokemon) {
      return this.currentPlayer.addPokemon(pokemon);
    }
    return false;
  }

  removePokemonFromTeam(pokemonName) {
    return this.currentPlayer.removePokemon(pokemonName);
  }

  sortGlobalList(criteria, method) {
    this.pokemonList.sortPokemons(criteria, method);
  }

  getGlobalList() {
    return this.pokemonList.allPokemons;
  }

  getTeamDetails(playerNumber) {
    return (playerNumber === 1)
      ? this.player1.team.getTeamDetails()
      : this.player2.team.getTeamDetails();
  }

  getCredits(playerNumber) {
    return (playerNumber === 1)
      ? this.player1.team.getCredits()
      : this.player2.team.getCredits();
  }

  autoSelectCpuTeam() {
    this.player2.team.selectedTeam = [];
    this.player2.team.credits = 200;
    let totalPoints = 0;
    let availablePokemons = this.pokemonList.allPokemons;
    // Se añaden Pokémons de manera random hasta tener 6 Pokémons o llegar a 200 créditos
    availablePokemons.sort(() => Math.random() - 0.5);
    for (let p of availablePokemons) {
      if (this.player2.team.selectedTeam.length < 6) {
        if (totalPoints + p.points <= 200) {
          this.player2.team.addPokemon(p);
          totalPoints += p.points;
        }
      } else {
        break;
      }
    }
  }
// esta función ejecuta una ronda de ataque entre los dos jugadores
  fightRound() {
    const fighter1 = this.getRandomFighter(this.player1);
    const fighter2 = this.getRandomFighter(this.player2);
  
    let log = `${fighter1.name} (${fighter1.special_power}) vs ${fighter2.name} (${fighter2.special_power}). `;
  
    if (fighter1.special_power > fighter2.special_power) {
      this.player2.team.removePokemon(fighter2.name);
      log += `${fighter1.name} de <strong>${this.player1.getName()}</strong> guanya la ronda!`;
    } else if (fighter1.special_power < fighter2.special_power) {
      this.player1.team.removePokemon(fighter1.name);
      log += `${fighter2.name} de <strong>${this.player2.getName()}</strong> guanya la ronda.`;
    } else {
      // en caso de empate, se elimina un pokemon aleatorio entre los dos equipos
      if (Math.random() < 0.5) {
        this.player2.team.removePokemon(fighter2.name);
        log += `Empat! Aleatòriament, guanya <strong>${this.player1.getName()}</strong>.`;
      } else {
        this.player1.team.removePokemon(fighter1.name);
        log += `Empat! Aleatòriament, guanya <strong>${this.player2.getName()}</strong>.`;
      }
    }
    return log;
  }
// decide de manera aleatoria que pokemon del equipo atacará
  getRandomFighter(player) {
    const team = player.team.getTeamDetails();
    if (team.length === 0) return null;
    const index = Math.floor(Math.random() * team.length);
    return team[index];
  }

}
