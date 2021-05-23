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

  public calculJoueurGagnant(grid: GridModel): JoueurEnum | null {
    // vérification si une ligne a la même valeur
    for (let i = 0; i < 3; i++) {
      let identiqueLigne = true;

      for (let j = 0; j < 3; j++) {
        if (grid.get(i, j) === null || grid.get(i, 0) !== grid.get(i, j)) {
          identiqueLigne = false;
          break;
        }
      }
      if (identiqueLigne) {
        if (grid.get(i, 0) === JoueurEnum.JOUEUR1) {
          return JoueurEnum.JOUEUR1;
        } else {
          return JoueurEnum.JOUEUR2;
        }
      }
    }

    // vérification des colonnes
    for (let i = 0; i < 3; i++) {
      let identiqueColonne = true;
      for (let j = 0; j < 3; j++) {
        if (grid.get(j, i) === null || grid.get(0, i) !== grid.get(j, i)) {
          identiqueColonne = false;
          break;
        }
      }
      if (identiqueColonne) {
        if (grid.get(0, i) === JoueurEnum.JOUEUR1) {
          return JoueurEnum.JOUEUR1;
        } else {
          return JoueurEnum.JOUEUR2;
        }
      }
    }

    // vérification de la diagonale haut vers bas
    let identique = true;
    for (let i = 0; i < 3; i++) {
      if (grid.get(i, i) === null || grid.get(0, 0) !== grid.get(i, i)) {
        identique = false;
        break;
      }
    }
    if (identique) {
      if (grid.get(0, 0) === JoueurEnum.JOUEUR1) {
        return JoueurEnum.JOUEUR1;
      } else {
        return JoueurEnum.JOUEUR2;
      }
    }

    // vérification de la diagonale base vers haut
    identique = true;
    for (let i = 0; i < 3; i++) {
      if (grid.get(2 - i, i) === null || grid.get(2, 0) !== grid.get(2 - i, i)) {
        identique = false;
        break;
      }
    }
    if (identique) {
      if (grid.get(2, 0) === JoueurEnum.JOUEUR1) {
        return JoueurEnum.JOUEUR1;
      } else {
        return JoueurEnum.JOUEUR2;
      }
    }

    return null;
  }

}
