import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectJeux} from './store/jeux.selectors';
import {nouveauJeaux, selectionneCase} from './store/jeux.actions';
import {Observable} from 'rxjs';
import {AppState} from './store/app.state';
import {JoueursConstantes} from './joueurs.constantes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tictactoejs';

  tab: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  joueurCourant: number = JoueursConstantes.JOUEUR1;
  jeuxTermine: boolean = false;
  joueurGagnant: number = 0;

  public joueursConstantes: typeof JoueursConstantes = JoueursConstantes;
  // joueursConstantes = JoueursConstantes;

  // @ts-ignore
  jeux$: Observable<AppState>;

  constructor(private store: Store) {
    // @ts-ignore
    this.jeux$ = this.store.pipe(select(selectJeux));
  }

  ngOnInit(): void {
    this.jeux$.subscribe(data => {
      console.log('ngOnInit jeux', data, data.jeux);
      if (data) {
        if (data.jeux) {
          const tmp = (data.jeux as unknown) as AppState;
          console.log('ngOnInit jeux', tmp);
          if (tmp && tmp.jeux && tmp.jeux.length === 3) {
            let tab: Array<Array<string>> | null;
            tab = this.copieTab(tmp.jeux);
            console.info('copie tab', tab);
            if (tab) {
              this.tab = tab;
              this.joueurCourant = tmp.joueurCourant;
              this.jeuxTermine = tmp.fini;
              this.joueurGagnant = tmp.joueurGagnant;
            }
          }
        }
      }
    }, error => {
      console.error('Erreur', error);
    });
  }

  private copieTab(tableau: Array<Array<string>>): Array<Array<string>> | null {
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

  selection(ligne: number, colonne: number): void {
    console.log('selection', ligne, colonne);
    if (this.joueurCourant === JoueursConstantes.JOUEUR1) {
      this.store.dispatch(selectionneCase({joueur: this.joueurCourant, ligne, colonne}));
    } else {
      this.store.dispatch(selectionneCase({joueur: this.joueurCourant, ligne, colonne}));
    }
  }

  nouveauJeaux(): void {
    this.store.dispatch(nouveauJeaux({joueur: 0}));
  }
}
