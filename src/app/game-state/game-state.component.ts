import {Component, effect, signal} from '@angular/core';
import {JoueursConstantes} from '../constantes/joueurs.constantes';
import {JoueurEnum} from '../model/joueur.enum';
import {GameStoreService} from '../services/game-store.service';
import {GameCurrentState} from '../model/game-current-state';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss'],
  standalone: false
})
export class GameStateComponent {

  joueurCourant: JoueurEnum = JoueurEnum.JOUEUR1;
  jeuxTermine = false;
  joueurGagnant: JoueurEnum | null = null;

  public joueurEnum: typeof JoueurEnum = JoueurEnum;

  public joueursConstantes: typeof JoueursConstantes = JoueursConstantes;

  private modification = signal<GameCurrentState | null>(null);

  constructor(private gameStoreService: GameStoreService) {
    this.modification = gameStoreService.modification;

    effect(() => {
      let state = this.modification();
      console.log('etat:', state);
      if (state) {
        this.joueurCourant = state.joueurCourant;
        this.jeuxTermine = state.fini;
        this.joueurGagnant = state.joueurGagnant;
      }
    });
  }

}
