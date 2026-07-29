import {Component, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class GridComponent {

  protected tab: GridModel | null = null;

  protected readonly JoueurEnum = JoueurEnum;
  protected readonly JoueursConstantes = JoueursConstantes;

  @Output()
  selectionCase: EventEmitter<CaseModel> = new EventEmitter<CaseModel>();

  constructor(private readonly gameStoreService: GameStoreService) {
    this.tab = gameStoreService.gamestate.jeux;
  }

  selection(ligne: number, colonne: number): void {
    this.selectionCase.emit({ligne, colonne});
  }

}
