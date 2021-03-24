import {createReducer, on} from '@ngrx/store';
import {selectionneCase} from './jeux.actions';

//ReadonlyArray
export const initialState: Array<Array<string>> = [['', '', ''], ['', '', ''], ['', '', '']];

export const jeuxReducer = createReducer(
  initialState,
  // on(retrievedBookList, (state, { Book }) => [...Book])
  on(selectionneCase, (state, {joueur, ligne, colonne}) => {
    if (ligne < 1 || ligne > 3 || colonne < 1 || colonne > 3) {
      return state;
    }
    let newState: Array<Array<string>> = [];
    let modification = false;
    for (let i = 0; i < 3; i++) {
      let tab: Array<string> = [];
      newState.push(tab);
      for (let j = 0; j < 3; j++) {
        const valeurPrecedante = state[i][j];
        if (i === ligne - 1 && j === colonne - 1) {
          const nouvelleValeur = (joueur === 1) ? 'O' : 'X';
          if (valeurPrecedante === '') {
            tab.push(nouvelleValeur);
            modification = true;
          } else {
            tab.push(valeurPrecedante);
          }
        } else {
          tab.push(valeurPrecedante);
        }
      }
    }
    if (modification) {
      return newState;
    } else {
      return state;
    }
  })
);

