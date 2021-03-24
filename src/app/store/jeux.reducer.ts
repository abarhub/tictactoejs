import {createReducer, on} from '@ngrx/store';
import {selectionneCase} from './jeux.actions';
import {AppState} from './app.state';


// export
// createInitialState();
// :
// AppState;
// {
//   let tab: Array<Array<string>> = [['', '', ''], ['', '', ''], ['', '', '']];
//   let state: AppState = new AppState();
//   state.jeux = tab;
//   state.joueurCourant = 1;
// }

//ReadonlyArray
//export const initialState: Array<Array<string>> = [['', '', ''], ['', '', ''], ['', '', '']];
//export const initialState: AppState = createInitialState();
export const initialState: AppState = {
  jeux: [['', '', ''], ['', '', ''], ['', '', '']],
  joueurCourant: 1
};

export const jeuxReducer = createReducer(
  initialState,
  // on(retrievedBookList, (state, { Book }) => [...Book])
  on(selectionneCase, (state, {joueur, ligne, colonne}) => {
    if (ligne < 1 || ligne > 3 || colonne < 1 || colonne > 3) {
      return state;
    }
    let newStateTab: Array<Array<string>> = [];
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
      const newState: AppState = {
        jeux: newStateTab,
        joueurCourant
      };
      return newState;
    } else {
      return state;
    }
  })
);

