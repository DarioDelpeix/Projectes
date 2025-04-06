import { PokemonTeamViewModel } from './PokemonTeamViewModel.js';
import { PokemonUI } from './PokemonUI.js';

class Pokemon {
    constructor(id, name, image, points, special_power, type) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.points = points;
      this.special_power = special_power; 
      this.type = type;
    }
  
    displayDetails() {
      return `${this.name} (${this.type}) - ${this.points} points - Power: ${this.special_power}`;
    }
  }
  

class GrassPokemon extends Pokemon {}
class FirePokemon extends Pokemon {}
class WaterPokemon extends Pokemon {}
class ElectricPokemon extends Pokemon {}
class PoisonPokemon extends Pokemon {}
class DragonPokemon extends Pokemon {}
class DarkPokemon extends Pokemon {}
class FairyPokemon extends Pokemon {}
class PsychicPokemon extends Pokemon {}
class IcePokemon extends Pokemon {}
class FightingPokemon extends Pokemon {}
class RockPokemon extends Pokemon {}
class GroundPokemon extends Pokemon {}
class BugPokemon extends Pokemon {}
class GhostPokemon extends Pokemon {}
class SteelPokemon extends Pokemon {}
class FlyingPokemon extends Pokemon {}
class NormalPokemon extends Pokemon {}

export class PokemonList {
    constructor(jsonUrl) {
        this.jsonUrl = jsonUrl;
        this.allPokemons = [];
        this.isLoaded = false;
    }

    loadPokemons(pokemonData) {
        try {
        pokemonData.map((pokemon,index) => {
            switch(pokemon.class_type) {

                case "GrassPokemon":
                    this.allPokemons.push(
                        new GrassPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "FirePokemon":
                    this.allPokemons.push(
                        new FirePokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "WaterPokemon":
                    this.allPokemons.push(
                        new WaterPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "ElectricPokemon":
                    this.allPokemons.push(
                        new ElectricPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "PoisonPokemon":
                    this.allPokemons.push(
                        new PoisonPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "DragonPokemon":
                    this.allPokemons.push(
                        new DragonPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "DarkPokemon":
                    this.allPokemons.push(
                        new DarkPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "FairyPokemon":
                    this.allPokemons.push(
                        new FairyPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "PsychicPokemon":
                    this.allPokemons.push(
                        new PsychicPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "IcePokemon":
                    this.allPokemons.push(
                        new IcePokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "FightingPokemon":
                    this.allPokemons.push(
                        new FightingPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "NormalPokemon":
                    this.allPokemons.push(
                        new NormalPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "FlyingPokemon":
                    this.allPokemons.push(
                        new FlyingPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "BugPokemon":
                    this.allPokemons.push(
                        new BugPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "RockPokemon":
                    this.allPokemons.push(
                        new RockPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "GhostPokemon":
                    this.allPokemons.push(
                        new GhostPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "SteelPokemon":
                    this.allPokemons.push(
                        new SteelPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                case "GroundPokemon":
                    this.allPokemons.push(
                        new GroundPokemon(
                            index+1,
                            pokemon.name,
                            "./images/"+pokemon.name.replace(/\s+/g, '_')+".png",
                            pokemon.points,
                            pokemon.special_power,
                        )
                    );
                    break;
                }
            });
        } catch (error) {
            console.error("Error al carregar els pokemons");
        }
        this.isLoaded = true;    }

    getAllPokemons() {
        return this.allPokemons;
    }

    sortPokemons(criteria, method) {
        if (!this.isLoaded || this.allPokemons.length === 0) {
            console.error("no hi ha pokemons carregats");
            return;
        }
        if (criteria === "name" || criteria === "points") {
            switch (method) {
                case "bubble":
                    this.bubbleSort(criteria);
                    break;
                case "insertion":
                    this.insertionSort(criteria);
                    break;
                case "selection":
                    this.selectionSort(criteria);
                    break;
                default:
                    console.error("Mètode d'ordenació no reconegut");
                    return;
            }
        } else if (criteria === "type") {
            switch (method) {
                case "bubble":
                    this.bubbleSortypes();
                    break;
                case "insertion":
                    this.insertionSortypes();
                    break;
                case "selection":
                    this.selectionSortypes();
                    break;
                default:
                    console.error("Metode d'ordenació no reconegut");
                    break;
            }
        } else {
            console.error("Criteri d'ordenació no reconegut");
        }
    }

    bubbleSort(criteria) {
        let copiaArray = [...this.allPokemons];
        for (let i = 0; i < copiaArray.length - 1; i++) {
            for (let j = 0; j < copiaArray.length - i - 1; j++) {
                if (copiaArray[j][criteria] > copiaArray[j + 1][criteria]) {
                    [copiaArray[j], copiaArray[j + 1]] = [copiaArray[j + 1], copiaArray[j]];
                }
            }
        }
        this.allPokemons = copiaArray;
        return this.allPokemons;
    }

    insertionSort(criteria) {
        let copiaArray = [...this.allPokemons];
        for (let i = 1; i < copiaArray.length; i++) {
            let key = copiaArray[i];
            let j = i - 1;
            while (j >= 0 && copiaArray[j][criteria] > key[criteria]) {
                copiaArray[j + 1] = copiaArray[j];
                j = j - 1;
            }
            copiaArray[j + 1] = key;
        }
        this.allPokemons = copiaArray;
        return this.allPokemons;
    }

    selectionSort(criteria) {
        let copiaArray = [...this.allPokemons];
        for (let i = 0; i < copiaArray.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < copiaArray.length; j++) {
                if (copiaArray[j][criteria] < copiaArray[minIdx][criteria]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [copiaArray[i], copiaArray[minIdx]] = [copiaArray[minIdx], copiaArray[i]];
            }
        }
        this.allPokemons = copiaArray;
        return this.allPokemons;
    }

    bubbleSortypes() {
        let copiaArray = [...this.allPokemons];
        for (let i = 0; i < copiaArray.length - 1; i++) {
            for (let j = 0; j < copiaArray.length - i - 1; j++) {
                if (copiaArray[j].constructor.name > copiaArray[j + 1].constructor.name) {
                    [copiaArray[j], copiaArray[j + 1]] = [copiaArray[j + 1], copiaArray[j]];
                }
            }
        }
        this.allPokemons = copiaArray;
        return this.allPokemons;
    }

    insertionSortypes() {
        let copiaArray = [...this.allPokemons];
        for (let i = 1; i < copiaArray.length; i++) {
            let key = copiaArray[i];
            let j = i - 1;
            while (j >= 0 && copiaArray[j].constructor.name > key.constructor.name) {
                copiaArray[j + 1] = copiaArray[j];
                j = j - 1;
            }
            copiaArray[j + 1] = key;
        }
        this.allPokemons = copiaArray;
        return this.allPokemons;
    }

    selectionSortypes() {
        let copiaArray = [...this.allPokemons];
        for (let i = 0; i < copiaArray.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < copiaArray.length; j++) {
                if (copiaArray[j].constructor.name < copiaArray[minIdx].constructor.name) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [copiaArray[i], copiaArray[minIdx]] = [copiaArray[minIdx], copiaArray[i]];
            }
        }
        this.allPokemons = copiaArray;
        return this.allPokemons;
    }

    getPokemonByName(name) {
        return this.allPokemons.find(pokemon => pokemon.name === name) || null;
    }
}

export class PokemonTeam {
    constructor(credits) {
        this.selectedTeam = [];
        this.credits = credits;
    }

    addPokemon(pokemon) {
        if (this.credits >= pokemon.points) {
            if (this.selectedTeam.length >= 6) {
                this.removePokemon(this.selectedTeam[0].name);
            }
            this.selectedTeam.push(pokemon);
            this.credits -= pokemon.points;
            return true;
        }
        return false;
    }

    removePokemon(pokemonName) {
        const index = this.selectedTeam.findIndex(pokemon => pokemon.name === pokemonName);
        if (index !== -1) {
          this.credits += this.selectedTeam[index].points;
          this.selectedTeam.splice(index, 1);
          return true;
        }
        return false;
      }
      
    getTeamDetails() {
        return this.selectedTeam;
    }

    getCredits() {
        return this.credits;
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    const viewModel = new PokemonTeamViewModel();
    const ui = new PokemonUI(viewModel);
    ui.init();
});

