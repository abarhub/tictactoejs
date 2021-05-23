import {JoueurEnum} from './joueur.enum';
import {GridService} from '../services/grid.service';

export class GridModel {
  private grid: ReadonlyArray<ReadonlyArray<JoueurEnum | null>>;
  private gridService: GridService = new GridService();

  constructor(grid: Array<Array<JoueurEnum | null>>) {
    const tab3: Array<ReadonlyArray<JoueurEnum | null>> = [];
    for (let i = 0; i < 3; i++) {
      const tab: Array<JoueurEnum | null> = [];
      for (let j = 0; j < 3; j++) {
        tab.push(grid[i][j]);
      }
      const tab2: ReadonlyArray<JoueurEnum | null> = tab;
      tab3.push(tab2);
    }
    this.grid = tab3;
  }

  get(ligne: number, colonne: number): JoueurEnum | null {
    return this.grid[ligne][colonne];
  }

  calculJoueurGagnant(): JoueurEnum | null {
    return this.gridService.calculJoueurGagnant(this);
  }

  plusDeCaseDisponible(): boolean {
    const tab: ReadonlyArray<ReadonlyArray<JoueurEnum | null>> = this.grid;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tab[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  }

  getCopy(): Array<Array<JoueurEnum | null>> {
    const tab: Array<Array<JoueurEnum | null>> = [];
    for (let i = 0; i < 3; i++) {
      const tab2: Array<JoueurEnum | null> = [];
      tab.push(tab2);
      for (let j = 0; j < 3; j++) {
        tab2.push(this.grid[i][j]);
      }
    }
    return tab;
  }

}
