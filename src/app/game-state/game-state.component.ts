import {Component, effect, signal, ChangeDetectionStrategy} from '@angular/core';
import {JoueursConstantes} from '../constantes/joueurs.constantes';
import {JoueurEnum} from '../model/joueur.enum';
import {GameStoreService} from '../services/game-store.service';
import {GameCurrentState} from '../model/game-current-state';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class GameStateComponent {

  protected joueurCourant: JoueurEnum = JoueurEnum.JOUEUR1;
  protected jeuxTermine = false;
  protected joueurGagnant: JoueurEnum | null = null;

  protected joueurEnum: typeof JoueurEnum = JoueurEnum;

  protected joueursConstantes: typeof JoueursConstantes = JoueursConstantes;

  private readonly modification = signal<GameCurrentState | null>(null);

  constructor(private readonly gameStoreService: GameStoreService) {
    this.modification = gameStoreService.modification;

    effect(() => {
      let state = this.modification();
      if (state) {
        this.joueurCourant = state.joueurCourant;
        this.jeuxTermine = state.fini;
        this.joueurGagnant = state.joueurGagnant;
      }
    });
  }

}
