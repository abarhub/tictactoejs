import {JoueurEnum} from './joueur.enum';
import {GridService} from '../services/grid.service';
import {signal, WritableSignal} from '@angular/core';

export class GridModel {
  private readonly _champ00 = signal<JoueurEnum | null>(null);
  private readonly _champ01 = signal<JoueurEnum | null>(null);
  private readonly _champ02 = signal<JoueurEnum | null>(null);
  private readonly _champ10 = signal<JoueurEnum | null>(null);
  private readonly _champ11 = signal<JoueurEnum | null>(null);
  private readonly _champ12 = signal<JoueurEnum | null>(null);
  private readonly _champ20 = signal<JoueurEnum | null>(null);
  private readonly _champ21 = signal<JoueurEnum | null>(null);
  private readonly _champ22 = signal<JoueurEnum | null>(null);
  private gridService: GridService = new GridService();

  public readonly champ00 = this._champ00.asReadonly();
  public readonly champ01 = this._champ01.asReadonly();
  public readonly champ02 = this._champ02.asReadonly();
  public readonly champ10 = this._champ10.asReadonly();
  public readonly champ11 = this._champ11.asReadonly();
  public readonly champ12 = this._champ12.asReadonly();
  public readonly champ20 = this._champ20.asReadonly();
  public readonly champ21 = this._champ21.asReadonly();
  public readonly champ22 = this._champ22.asReadonly();
  private readonly grid2: ReadonlyArray<ReadonlyArray<WritableSignal<JoueurEnum | null>>>;

  constructor(grid: Array<Array<JoueurEnum | null>>) {
    this.grid2 = [[this._champ00, this._champ01, this._champ02],
      [this._champ10, this._champ11, this._champ12],
      [this._champ20, this._champ21, this._champ22]];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.grid2[i][j].set(grid[i][j]);
      }
    }
  }

  get(ligne: number, colonne: number): JoueurEnum | null {
    if (ligne >= 0 && ligne <= 2 && colonne >= 0 && colonne <= 2 &&
      ligne < this.grid2.length && colonne < this.grid2[ligne].length) {
      return this.grid2[ligne][colonne]();
    } else {
      return null;
    }
  }

  calculJoueurGagnant(): JoueurEnum | null {
    return this.gridService.calculJoueurGagnant(this);
  }

  plusDeCaseDisponible(): boolean {
    const tab: ReadonlyArray<ReadonlyArray<WritableSignal<JoueurEnum | null>>> = this.grid2;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tab[i][j]() === null) {
          return false;
        }
      }
    }
    return true;
  }

  selectionCase(ligne: number, colonne: number, joueurCourant: JoueurEnum): boolean {
    if (ligne >= 0 && ligne <= 2 && colonne >= 0 && colonne <= 2 &&
      ligne < this.grid2.length && colonne < this.grid2[ligne].length) {
      if (this.grid2[ligne][colonne]() == null) {
        this.grid2[ligne][colonne].set(joueurCourant);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  vide() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.grid2[i][j].set(null);
      }
    }
  }

}
