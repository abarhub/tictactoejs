import {createReducer, on} from '@ngrx/store';
import {nouveauJeaux, selectionneCase} from './jeux.actions';
import {AppState} from './app.state';
import {JoueursConstantes} from '../constantes/joueurs.constantes';
import {GridService} from '../services/grid.service';
import {GridModel} from '../model/grid.model';

const gridService: GridService = new GridService();

export const initialState: AppState = {
  jeux: gridService.creerGrilleVide(),
  joueurCourant: JoueursConstantes.JOUEUR1,
  fini: false,
  joueurGagnant: 0
};

export const jeuxReducer = createReducer(
  initialState,
  on(selectionneCase, (state, {joueur, ligne, colonne}) => {
    if (ligne < 1 || ligne > 3 || colonne < 1 || colonne > 3 || state.fini) {
      return state;
    }
    const newStateTab: Array<Array<string>> = [];
    let modification = false;
    let joueurCourant = state.joueurCourant;
    const grid: GridModel = state.jeux;
    for (let i = 0; i < 3; i++) {
      const tab: Array<string> = [];
      newStateTab.push(tab);
      for (let j = 0; j < 3; j++) {
        const valeurPrecedante = grid.get(i, j);
        if (i === ligne - 1 && j === colonne - 1) {
          const nouvelleValeur = (joueurCourant === JoueursConstantes.JOUEUR1) ?
            JoueursConstantes.JOUEUR1_AFFICHAGE : JoueursConstantes.JOUEUR2_AFFICHAGE;
          if (valeurPrecedante === '') {
            tab.push(nouvelleValeur);
            modification = true;
            if (joueurCourant === JoueursConstantes.JOUEUR1) {
              joueurCourant = JoueursConstantes.JOUEUR2;
            } else {
              joueurCourant = JoueursConstantes.JOUEUR1;
            }
          } else {
            tab.push(valeurPrecedante);
          }
        } else {
          tab.push(valeurPrecedante);
        }
      }
    }
    if (modification) {
      const nouvelleGrille = new GridModel(newStateTab);
      const joueurGagnant = nouvelleGrille.calculJoueurGagnant();
      const fini = joueurGagnant !== 0;
      const newState: AppState = {
        jeux: nouvelleGrille,
        joueurCourant,
        fini,
        joueurGagnant
      };
      return newState;
    } else {
      return state;
    }
  }),
  on(nouveauJeaux, (state, {joueur}) => {
    const newState: AppState = {
      jeux: gridService.creerGrilleVide(),
      joueurCourant: JoueursConstantes.JOUEUR1,
      fini: false,
      joueurGagnant: 0
    };
    return newState;
  })
);


