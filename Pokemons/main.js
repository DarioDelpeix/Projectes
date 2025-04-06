import { PokemonTeamViewModel } from "./PokemonTeamViewModel.js";
import { PokemonUI } from "./PokemonUI.js";

document.addEventListener("DOMContentLoaded", () => {
  const viewModel = new PokemonTeamViewModel();
  const ui = new PokemonUI(viewModel);
  ui.init();
});

