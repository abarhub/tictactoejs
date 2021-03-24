import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectJeux} from './store/jeux.selectors';
import {selectionneCase} from './store/jeux.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tictactoejs';

  readonly JOUEUR1 = 1;
  readonly JOUEUR2 = 2;
  readonly JOUEUR1_AFFICHAGE = 'X';
  readonly JOUEUR2_AFFICHAGE = 'O';
  tab: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  joueurCourant: number = this.JOUEUR1;

  // @ts-ignore
  jeux$ = this.store.pipe(select(selectJeux));

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.jeux$.subscribe(data => {
      console.log('jeux', data);
      if (data && data.length === 3) {
        let tab: Array<Array<string>> | null = null;
        tab = this.copieTab(data);
        if (tab) {
          this.tab = tab;
        }
      }
    }, error => {
      console.error('Erreur', error);
    });
  }

  private copieTab(tableau: Array<Array<string>>): Array<Array<string>> | null {
    if (tableau && tableau.length === 3) {
      let tab: Array<Array<string>> = [];
      for (let i = 0; i < 3; i++) {
        if (tableau[i].length !== 3) {
          return null;
        }
        let tab2: Array<string> = [];
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

  selection(ligne: number, colonne: number): void {
    console.log('selection', ligne, colonne);
    if (this.joueurCourant === this.JOUEUR1) {
      this.store.dispatch(selectionneCase({joueur: this.joueurCourant, ligne, colonne}));
      this.joueurCourant = this.JOUEUR2;
    } else {
      this.store.dispatch(selectionneCase({joueur: this.joueurCourant, ligne, colonne}));
      this.joueurCourant = this.JOUEUR1;
    }
  }
}
