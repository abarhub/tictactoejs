import {GridModel} from './grid.model';
import {JoueurEnum} from './joueur.enum';

export interface GameCurrentState {
  jeux: GridModel;
  joueurCourant: JoueurEnum;
  fini: boolean;
  joueurGagnant: JoueurEnum | null;
}
