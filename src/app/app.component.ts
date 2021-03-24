import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tictactoejs';

  readonly JOUEUR1 = 1;
  readonly JOUEUR2 = 2;
  readonly JOUEUR1_AFFICHAGE = 'X';
  readonly JOUEUR2_AFFICHAGE = 'O';
  tab: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  joueurCourant: number = this.JOUEUR1;

  selection(ligne: number, colonne: number): void {
    console.log('selection', ligne, colonne);
    if (this.joueurCourant === this.JOUEUR1) {
      this.tab[ligne - 1][colonne - 1] = this.JOUEUR1_AFFICHAGE;
      this.joueurCourant = this.JOUEUR2;
    } else {
      this.tab[ligne - 1][colonne - 1] = this.JOUEUR2_AFFICHAGE;
      this.joueurCourant = this.JOUEUR1;
    }
  }
}
