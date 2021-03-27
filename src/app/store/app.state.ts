import {GridModel} from '../model/grid.model';
import {JoueurEnum} from '../model/joueur.enum';

export interface AppState {
  jeux: GridModel;
  joueurCourant: JoueurEnum;
  fini: boolean;
  joueurGagnant: JoueurEnum | null;
}
