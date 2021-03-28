import {JoueurEnum} from './joueur.enum';

export class GridModel {
  private grid: ReadonlyArray<ReadonlyArray<JoueurEnum | null>>;

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
    const tab: ReadonlyArray<ReadonlyArray<JoueurEnum | null>> = this.grid;

    // vérification si une ligne a la même valeur
    for (let i = 0; i < 3; i++) {
      let identiqueLigne = true;

      for (let j = 0; j < 3; j++) {
        if (tab[i][j] === null || tab[i][0] !== tab[i][j]) {
          identiqueLigne = false;
          break;
        }
      }
      if (identiqueLigne) {
        if (tab[i][0] === null) {
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
        if (tab[j][i] === null || tab[0][i] !== tab[j][i]) {
          identiqueColonne = false;
          break;
        }
      }
      if (identiqueColonne) {
        if (tab[i][0] === JoueurEnum.JOUEUR1) {
          return JoueurEnum.JOUEUR1;
        } else {
          return JoueurEnum.JOUEUR2;
        }
      }
    }

    // vérification de la diagonale haut vers bas
    let identique = true;
    for (let i = 0; i < 3; i++) {
      if (tab[i][i] === null || tab[0][0] !== tab[i][i]) {
        identique = false;
        break;
      }
    }
    if (identique) {
      if (tab[0][0] === JoueurEnum.JOUEUR1) {
        return JoueurEnum.JOUEUR1;
      } else {
        return JoueurEnum.JOUEUR2;
      }
    }

    // vérification de la diagonale base vers haut
    identique = true;
    for (let i = 0; i < 3; i++) {
      if (tab[2 - i][i] === null || tab[2][0] !== tab[2 - i][i]) {
        identique = false;
        break;
      }
    }
    if (identique) {
      if (tab[2][0] === JoueurEnum.JOUEUR1) {
        return JoueurEnum.JOUEUR1;
      } else {
        return JoueurEnum.JOUEUR2;
      }
    }

    return null;
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
