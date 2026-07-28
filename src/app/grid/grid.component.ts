import {Component, EventEmitter, Output} from '@angular/core';
import {CaseModel} from '../model/case.model';
import {GridService} from '../services/grid.service';
import {GridModel} from '../model/grid.model';
import {JoueurEnum} from '../model/joueur.enum';
import {JoueursConstantes} from '../constantes/joueurs.constantes';
import {GameStoreService} from '../services/game-store.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  standalone: false
})
export class GridComponent {

  public tab: GridModel | null = null;

  protected readonly JoueurEnum = JoueurEnum;
  protected readonly JoueursConstantes = JoueursConstantes;

  @Output()
  selectionCase: EventEmitter<CaseModel> = new EventEmitter<CaseModel>();

  constructor(private gameStoreService: GameStoreService) {
    this.tab = gameStoreService.gamestate.jeux;
  }

  selection(ligne: number, colonne: number): void {
    this.selectionCase.emit({ligne, colonne});
  }

  get(ligne: number, colonne: number): string {
    if (this.tab) {
      const valeur = this.tab.get(ligne, colonne);
      if (valeur === JoueurEnum.JOUEUR1) {
        return JoueursConstantes.JOUEUR1_AFFICHAGE;
      } else if (valeur === JoueurEnum.JOUEUR2) {
        return JoueursConstantes.JOUEUR2_AFFICHAGE;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}
