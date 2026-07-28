import {GridService} from './grid.service';
import {Injectable, signal} from '@angular/core';
import {CaseModel} from '../model/case.model';
import {JoueurEnum} from '../model/joueur.enum';
import {GameCurrentState} from '../model/game-current-state';

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {

  public gamestate: GameCurrentState;

  public modification = signal<GameCurrentState | null>(null);

  constructor(private gridService: GridService) {

    this.gamestate = {
      jeux: gridService.creerGrilleVide(),
      joueurCourant: JoueurEnum.JOUEUR1,
      joueurGagnant: null,
      fini: false
    };

  }

  public nouveauJeux(): void {
    this.gamestate.jeux.vide();
    this.gamestate.joueurCourant = JoueurEnum.JOUEUR1;
    this.gamestate.joueurGagnant = null;
    this.gamestate.fini = false;
    this.modification.set({...this.gamestate});
  }

  public caseSelectionnee(caseSelectionnee: CaseModel): void {
    if (!this.gamestate.fini) {
      var modif = this.gamestate.jeux.selectionCase(caseSelectionnee.ligne - 1, caseSelectionnee.colonne - 1, this.gamestate.joueurCourant);
      if (modif) {
        if (this.gamestate.joueurCourant === JoueurEnum.JOUEUR1) {
          this.gamestate.joueurCourant = JoueurEnum.JOUEUR2;
        } else {
          this.gamestate.joueurCourant = JoueurEnum.JOUEUR1;
        }
        const joueurGagnant = this.gamestate.jeux.calculJoueurGagnant();
        const fini = joueurGagnant !== null || this.gamestate.jeux.plusDeCaseDisponible();
        this.gamestate.joueurGagnant = joueurGagnant;
        this.gamestate.fini = fini;
        this.modification.set({...this.gamestate});
      }
    }
  }
}
