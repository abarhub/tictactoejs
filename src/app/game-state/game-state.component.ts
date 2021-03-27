import {Component, OnInit} from '@angular/core';
import {JoueursConstantes} from '../constantes/joueurs.constantes';
import {select, Store} from '@ngrx/store';
import {selectJeux} from '../store/jeux.selectors';
import {Observable} from 'rxjs';
import {AppState} from '../store/app.state';
import {JoueurEnum} from '../model/joueur.enum';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss']
})
export class GameStateComponent implements OnInit {

  joueurCourant: JoueurEnum = JoueurEnum.JOUEUR1;
  jeuxTermine = false;
  joueurGagnant: JoueurEnum | null = null;

  public joueurEnum: typeof JoueurEnum = JoueurEnum;

  public joueursConstantes: typeof JoueursConstantes = JoueursConstantes;

  // @ts-ignore
  jeux$: Observable<AppState>;

  constructor(private store: Store) {
    // @ts-ignore
    this.jeux$ = this.store.pipe(select(selectJeux));
  }

  ngOnInit(): void {
    this.jeux$.subscribe(data => {
      console.log('ngOnInit jeux GameStateComponent', data, data.jeux);
      if (data) {
        if (data.jeux) {
          const tmp = (data.jeux as unknown) as AppState;
          console.log('ngOnInit jeux GameStateComponent', tmp);
          if (tmp) {
            this.joueurCourant = tmp.joueurCourant;
            this.jeuxTermine = tmp.fini;
            this.joueurGagnant = tmp.joueurGagnant;
          }
        }
      }
    }, error => {
      console.error('Erreur', error);
    });
  }

}
