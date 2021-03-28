import {createReducer, on} from '@ngrx/store';
import {nouveauJeaux, selectionneCase} from './jeux.actions';
import {AppState} from './app.state';
import {GridService} from '../services/grid.service';
import {GridModel} from '../model/grid.model';
import {JoueurEnum} from '../model/joueur.enum';

const gridService: GridService = new GridService();

export const initialState: AppState = {
  jeux: gridService.creerGrilleVide(),
  joueurCourant: JoueurEnum.JOUEUR1,
  fini: false,
  joueurGagnant: null
};

export const jeuxReducer = createReducer(
  initialState,
  on(selectionneCase, (state, {ligne, colonne}) => {
    if (ligne < 1 || ligne > 3 || colonne < 1 || colonne > 3 || state.fini) {
      return state;
    }
    let newStateTab: Array<Array<JoueurEnum | null>>;
    let modification = false;
    let joueurCourant = state.joueurCourant;
    const grid: GridModel = state.jeux;
    newStateTab = grid.getCopy();
    const valeurPrecedante = grid.get(ligne - 1, colonne - 1);

    const nouvelleValeur = (joueurCourant === JoueurEnum.JOUEUR1) ?
      JoueurEnum.JOUEUR1 : JoueurEnum.JOUEUR2;
    if (valeurPrecedante === null) {
      modification = true;
      newStateTab[ligne - 1][colonne - 1] = nouvelleValeur;
      if (joueurCourant === JoueurEnum.JOUEUR1) {
        joueurCourant = JoueurEnum.JOUEUR2;
      } else {
        joueurCourant = JoueurEnum.JOUEUR1;
      }
    }

    if (modification) {
      const nouvelleGrille = new GridModel(newStateTab);
      const joueurGagnant = nouvelleGrille.calculJoueurGagnant();
      const fini = joueurGagnant !== null || nouvelleGrille.plusDeCaseDisponible();
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
  on(nouveauJeaux, (_) => {
    const newState: AppState = {
      jeux: gridService.creerGrilleVide(),
      joueurCourant: JoueurEnum.JOUEUR1,
      fini: false,
      joueurGagnant: null
    };
    return newState;
  })
);


