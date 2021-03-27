import {JoueursConstantes} from '../constantes/joueurs.constantes';


export class GridModel {
  private grid: ReadonlyArray<ReadonlyArray<string>>;

  constructor(grid: Array<Array<string>>) {
    const tab3: Array<ReadonlyArray<string>> = new Array<ReadonlyArray<string>>();
    for (let i = 0; i < 3; i++) {
      const tab: Array<string> = new Array<string>();
      for (let j = 0; j < 3; j++) {
        tab.push(grid[i][j]);
      }
      const tab2: ReadonlyArray<string> = tab;
      tab3.push(tab2);
    }
    this.grid = tab3;
  }

  get(ligne: number, colonne: number): string {
    return this.grid[ligne][colonne];
  }

  calculJoueurGagnant(): number {
    const tab: ReadonlyArray<ReadonlyArray<string>> = this.grid;

    // vérification si une ligne a la même valeur
    for (let i = 0; i < 3; i++) {
      let identiqueLigne = true;

      for (let j = 0; j < 3; j++) {
        if (tab[i][j] === '' || tab[i][0] !== tab[i][j]) {
          identiqueLigne = false;
          break;
        }
      }
      if (identiqueLigne) {
        if (tab[i][0] === 'O') {
          return 1;
        } else {
          return 2;
        }
      }
    }

    // vérification des colonnes
    for (let i = 0; i < 3; i++) {
      let identiqueColonne = true;
      for (let j = 0; j < 3; j++) {
        if (tab[j][i] === '' || tab[0][i] !== tab[j][i]) {
          identiqueColonne = false;
          break;
        }
      }
      if (identiqueColonne) {
        if (tab[i][0] === JoueursConstantes.JOUEUR1_AFFICHAGE) {
          return JoueursConstantes.JOUEUR1;
        } else {
          return JoueursConstantes.JOUEUR2;
        }
      }
    }

    // vérification de la diagonale haut vers bas
    let identique = true;
    for (let i = 0; i < 3; i++) {
      if (tab[i][i] === '' || tab[0][0] !== tab[i][i]) {
        identique = false;
        break;
      }
    }
    if (identique) {
      if (tab[0][0] === JoueursConstantes.JOUEUR1_AFFICHAGE) {
        return JoueursConstantes.JOUEUR1;
      } else {
        return JoueursConstantes.JOUEUR2;
      }
    }

    // vérification de la diagonale base vers haut
    identique = true;
    for (let i = 0; i < 3; i++) {
      if (tab[2 - i][i] === '' || tab[2][0] !== tab[2 - i][i]) {
        identique = false;
        break;
      }
    }
    if (identique) {
      if (tab[2][0] === JoueursConstantes.JOUEUR1_AFFICHAGE) {
        return JoueursConstantes.JOUEUR1;
      } else {
        return JoueursConstantes.JOUEUR2;
      }
    }

    return 0;
  }

  getCopy(): Array<Array<string>> {
    const tab:Array<Array<string>> = new Array<Array<string>>();
    for (let i = 0; i < 3; i++) {
      const tab2: Array<string> = new Array<string>();
      tab.push(tab2);
      for (let j = 0; j < 3; j++) {
        tab2.push(this.grid[i][j]);
      }
    }
    return tab;
  }

}
