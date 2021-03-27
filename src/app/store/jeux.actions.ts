import {createAction, props} from '@ngrx/store';


export const selectionneCase = createAction(
  '[TicTacToe] Selectionne case',
  props<{ ligne: number, colonne: number }>()
);

export const nouveauJeaux = createAction(
  '[TicTacToe] Nouveau Jeux'
);

