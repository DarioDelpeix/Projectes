import { PokemonTeam } from './pokemon.js';

export class Player {
    constructor(name, team = new PokemonTeam(200)) {
        this.name = name;
        this.team = team;
    }

    getName() {
        return this.name;
    }

    addPokemon(pokemon) {
        return this.team.addPokemon(pokemon);
    }

    removePokemon(pokemonName) {
        this.team.removePokemon(pokemonName);
    }

    /*getTeamDetails() {
        return this.team.getTeamDetails();
    }

    getCredits() {
        return this.team.getCredits();
    }

    attack(target) {
    } */

}