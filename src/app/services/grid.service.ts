import {Injectable} from '@angular/core';
import {GridModel} from '../model/grid.model';
import {JoueurEnum} from '../model/joueur.enum';

@Injectable({
  providedIn: 'root',
})
export class GridService {

  public creerGrilleVide(): GridModel {
    return new GridModel([[null, null, null], [null, null, null], [null, null, null]]);
  }

  public copieGrille(grid: GridModel): GridModel {
    const tab: Array<Array<JoueurEnum | null>> = [];
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
