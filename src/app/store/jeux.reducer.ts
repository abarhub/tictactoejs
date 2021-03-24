import {createReducer, on} from '@ngrx/store';
import {selectionneCase} from './jeux.actions';
import {AppState} from './app.state';

export const initialState: AppState = {
  jeux: [['', '', ''], ['', '', ''], ['', '', '']],
  joueurCourant: 1,
  fini: false,
  joueurGagnant: 0
};

function calculTermine(tab: Array<Array<string>>) {

  // vérification si une ligne a la même valeur
  for (let i = 0; i < 3; i++) {
    let identique = true;
    for (let j = 0; j < 3; j++) {
      if (tab[i][j] === '' || tab[i][0] !== tab[i][j]) {
        identique = false;
        break;
      }
    }
    if (identique) {
      return true;
    }
  }

  // vérification des colonnes
  for (let i = 0; i < 3; i++) {
    let identique = true;
    for (let j = 0; j < 3; j++) {
      if (tab[j][i] === '' || tab[0][i] !== tab[j][i]) {
        identique = false;
        break;
      }
    }
    if (identique) {
      return true;
    }
  }

  // vérification de la diagonale haut vers bas
  for (let i = 0; i < 3; i++) {
    let identique = true;
    if (tab[i][i] === '' || tab[0][0] !== tab[i][i]) {
      identique = false;
      break;
    }
    if (identique) {
      return true;
    }
  }

  // vérification de la diagonale base vers haut
  for (let i = 0; i < 3; i++) {
    let identique = true;
    if (tab[2 - i][i] === '' || tab[2][0] !== tab[2 - i][i]) {
      identique = false;
      break;
    }
    if (identique) {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tab[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function calculJoueurGagnant(tab: Array<Array<string>>) {

  // vérification si une ligne a la même valeur
  for (let i = 0; i < 3; i++) {
    let identique = true;

    for (let j = 0; j < 3; j++) {
      if (tab[i][j] === '' || tab[i][0] !== tab[i][j]) {
        identique = false;
        break;
      }
    }
    if (identique) {
      if (tab[i][0] === 'O') {
        return 1;
      } else {
        return 2;
      }
    }
  }

  // vérification des colonnes
  for (let i = 0; i < 3; i++) {
    let identique = true;
    for (let j = 0; j < 3; j++) {
      if (tab[j][i] === '' || tab[0][i] !== tab[j][i]) {
        identique = false;
        break;
      }
    }
    if (identique) {
      if (tab[i][0] === 'O') {
        return 1;
      } else {
        return 2;
      }
    }
  }

  // vérification de la diagonale haut vers bas
  for (let i = 0; i < 3; i++) {
    let identique = true;
    if (tab[i][i] === '' || tab[0][0] !== tab[i][i]) {
      identique = false;
      break;
    }
    if (identique) {
      if (tab[i][i] === 'O') {
        return 1;
      } else {
        return 2;
      }
    }
  }

  // vérification de la diagonale base vers haut
  for (let i = 0; i < 3; i++) {
    let identique = true;
    if (tab[2 - i][i] === '' || tab[2][0] !== tab[2 - i][i]) {
      identique = false;
      break;
    }
    if (identique) {
      if (tab[2 - i][i] === 'O') {
        return 1;
      } else {
        return 2;
      }
    }
  }

  return 0;
}

export const jeuxReducer = createReducer(
  initialState,
  on(selectionneCase, (state, {joueur, ligne, colonne}) => {
    if (ligne < 1 || ligne > 3 || colonne < 1 || colonne > 3 || state.fini) {
      return state;
    }
    const newStateTab: Array<Array<string>> = [];
    let modification = false;
    let joueurCourant = state.joueurCourant;
    for (let i = 0; i < 3; i++) {
      const tab: Array<string> = [];
      newStateTab.push(tab);
      for (let j = 0; j < 3; j++) {
        const valeurPrecedante = state.jeux[i][j];
        if (i === ligne - 1 && j === colonne - 1) {
          const nouvelleValeur = (joueur === 1) ? 'O' : 'X';
          if (valeurPrecedante === '') {
            tab.push(nouvelleValeur);
            modification = true;
            if (joueurCourant === 1) {
              joueurCourant = 2;
            } else {
              joueurCourant = 1;
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
      const fini = calculTermine(newStateTab);
      let joueurGagnant = 0;
      if (fini) {
        joueurGagnant = calculJoueurGagnant(newStateTab);
      }
      const newState: AppState = {
        jeux: newStateTab,
        joueurCourant,
        fini,
        joueurGagnant
      };
      return newState;
    } else {
      return state;
    }
  })
);

