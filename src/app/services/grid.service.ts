import {Injectable} from '@angular/core';
import {GridModel} from '../model/grid.model';

@Injectable({
  providedIn: 'root',
})
export class GridService {

  public copieTablean(tableau: Array<Array<string>>): Array<Array<string>> | null {
    if (tableau && tableau.length === 3) {
      const tab: Array<Array<string>> = [];
      for (let i = 0; i < 3; i++) {
        if (tableau[i].length !== 3) {
          return null;
        }
        const tab2: Array<string> = [];
        tab.push(tab2);
        for (let j = 0; j < 3; j++) {
          const valeur = tableau[i][j];
          if (valeur === '' || valeur === 'X' || valeur === 'O') {
            tab2.push(valeur);
          } else {
            return null;
          }
        }
      }
      return tab;
    } else {
      return null;
    }
  }

  public creerGrilleVide(): GridModel {
    return new GridModel([['', '', ''], ['', '', ''], ['', '', '']]);
  }

  public copieGrille(grid: GridModel): GridModel {
    const tab: Array<Array<string>> = new Array<Array<string>>();
    for (let i = 0; i < 3; i++) {
      tab.push([]);
      for (let j = 0; j < 3; j++) {
        const val = grid.get(i, j);
        tab[i].push(val);
      }
    }
    return new GridModel(tab);
  }

}
