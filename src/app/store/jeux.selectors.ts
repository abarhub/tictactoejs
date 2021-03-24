import {createSelector} from '@ngrx/store';
import {AppState} from './app.state';


export const selectJeux = createSelector(
  (state: AppState) => state.jeux,
  (jeux: Array<Array<string>>) => jeux
);
