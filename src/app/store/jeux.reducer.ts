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
    let newStateTab: Array<Array<string>> = [];
    let modification = false;
    let joueurCourant = state.joueurCourant;
    const grid: GridModel = state.jeux;
    newStateTab = grid.getCopy();
    const valeurPrecedante = grid.get(ligne - 1, colonne - 1);

    const nouvelleValeur = (joueurCourant === JoueursConstantes.JOUEUR1) ?
      JoueursConstantes.JOUEUR1_AFFICHAGE : JoueursConstantes.JOUEUR2_AFFICHAGE;
    if (valeurPrecedante === '') {
      modification = true;
      newStateTab[ligne - 1][colonne - 1] = nouvelleValeur;
      if (joueurCourant === JoueursConstantes.JOUEUR1) {
        joueurCourant = JoueursConstantes.JOUEUR2;
      } else {
        joueurCourant = JoueursConstantes.JOUEUR1;
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


