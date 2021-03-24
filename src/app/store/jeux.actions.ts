import {createAction, props} from '@ngrx/store';


export const selectionneCase = createAction(
  '[Book List] Selectionne case',
  props<{ joueur: number, ligne: number, colonne: number }>()
);

