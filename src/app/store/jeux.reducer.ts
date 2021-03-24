import {createReducer, on} from '@ngrx/store';
import {nouveauJeaux, selectionneCase} from './jeux.actions';
import {AppState} from './app.state';
import {JoueursConstantes} from '../joueurs.constantes';

export const initialState: AppState = {
  jeux: [['', '', ''], ['', '', ''], ['', '', '']],
  joueurCourant: JoueursConstantes.JOUEUR1,
  fini: false,
  joueurGagnant: 0
};

function calculTermine(tab: Array<Array<string>>) {

  console.log('calculTermine ligne', tab);
  // vérification si une ligne a la même valeur
  for (let i = 0; i < 3; i++) {
    let identiqueLigne = true;
    for (let j = 0; j < 3; j++) {
      if (tab[i][j] === '' || tab[i][0] !== tab[i][j]) {
        identiqueLigne = false;
        break;
      }
    }
    if (identiqueLigne) {
      console.log('calculTermine ligne identique');
      return true;
    }
  }

  console.log('calculTermine colonnes');
  // vérification des colonnes
  for (let i = 0; i < 3; i++) {
    let identiqueColonne = true;
    for (let j = 0; j < 3; j++) {
      if (tab[j][i] === '' || tab[0][i] !== tab[j][i]) {
        identiqueColonne = false;
        break;
      }
    }
    if (identiqueColonne) {
      console.log('calculTermine colonnes identique');
      return true;
    }
  }

  console.log('calculTermine diag1');
  // vérification de la diagonale haut vers bas
  let identique = true;
  for (let i = 0; i < 3; i++) {
    if (tab[i][i] === '' || tab[0][0] !== tab[i][i]) {
      identique = false;
      break;
    }
  }
  if (identique) {
    console.log('calculTermine diag1 identique');
    return true;
  }

  console.log('calculTermine diag2');
  // vérification de la diagonale base vers haut
  identique = true;
  for (let i = 0; i < 3; i++) {
    if (tab[2 - i][i] === '' || tab[2][0] !== tab[2 - i][i]) {
      identique = false;
      break;
    }
  }
  if (identique) {
    console.log('calculTermine diag2 identique');
    return true;
  }

  console.log('calculTermine tout remplit');
  // vérification si toutes les cases sont remplit
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tab[i][j] === '') {
        console.log('calculTermine tout remplit non');
        return false;
      }
    }
  }
  console.log('calculTermine tout remplit oui');
  return true;
}

function calculJoueurGagnant(tab: Array<Array<string>>) {

  // vérification si une ligne a la même valeur
  for (let i = 0; i < 3; i++) {
    let identiqueLigne = true;

    for (let j = 0; j < 3; j++) {
      if (tab[i][j] === '' || tab[i][0] !== tab[i][j]) {
        identiqueLigne = false;
        break;
      }
    }
    if (identiqueLigne) {
      if (tab[i][0] === 'O') {
        return 1;
      } else {
        return 2;
      }
    }
  }

  // vérification des colonnes
  for (let i = 0; i < 3; i++) {
    let identiqueColonne = true;
    for (let j = 0; j < 3; j++) {
      if (tab[j][i] === '' || tab[0][i] !== tab[j][i]) {
        identiqueColonne = false;
        break;
      }
    }
    if (identiqueColonne) {
      if (tab[i][0] === JoueursConstantes.JOUEUR1_AFFICHAGE) {
        return JoueursConstantes.JOUEUR1;
      } else {
        return JoueursConstantes.JOUEUR2;
      }
    }
  }

  // vérification de la diagonale haut vers bas
  let identique = true;
  for (let i = 0; i < 3; i++) {
    if (tab[i][i] === '' || tab[0][0] !== tab[i][i]) {
      identique = false;
      break;
    }
  }
  if (identique) {
    if (tab[0][0] === JoueursConstantes.JOUEUR1_AFFICHAGE) {
      return JoueursConstantes.JOUEUR1;
    } else {
      return JoueursConstantes.JOUEUR2;
    }
  }

  // vérification de la diagonale base vers haut
  identique = true;
  for (let i = 0; i < 3; i++) {
    if (tab[2 - i][i] === '' || tab[2][0] !== tab[2 - i][i]) {
      identique = false;
      break;
    }
  }
  if (identique) {
    if (tab[2][0] === JoueursConstantes.JOUEUR1_AFFICHAGE) {
      return JoueursConstantes.JOUEUR1;
    } else {
      return JoueursConstantes.JOUEUR2;
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
          const nouvelleValeur = (joueur === JoueursConstantes.JOUEUR1) ? JoueursConstantes.JOUEUR1_AFFICHAGE : JoueursConstantes.JOUEUR2_AFFICHAGE;
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
  }),
  on(nouveauJeaux, (state, {joueur}) => {
    const newState: AppState = {
      jeux: [['', '', ''], ['', '', ''], ['', '', '']],
      joueurCourant: JoueursConstantes.JOUEUR1,
      fini: false,
      joueurGagnant: 0
    };
    return newState;
  })
);


