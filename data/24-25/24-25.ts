import elenco from "./elenco.json";
import noticias from "./noticias.json";
import premierLeague from "./competicoes/premier-league.json";
import carabaoCup from "./competicoes/carabao-cup.json";

export const temporada_25_26 = {
  temporada: "2025/2026",
  elenco,
  noticias,
  competicoes: [premierLeague, carabaoCup],
};
