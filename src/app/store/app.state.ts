import {GridModel} from '../model/grid.model';

export interface AppState {
  jeux: GridModel;
  joueurCourant: number;
  fini: boolean;
  joueurGagnant: number;
}
