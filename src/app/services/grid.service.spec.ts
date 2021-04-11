import {GridService} from './grid.service';
import {GridModel} from '../model/grid.model';
import {JoueurEnum} from '../model/joueur.enum';

describe('GridService without Angular testing support', () => {

  it('test #creerGrilleVide', () => {
    const localGridService = new GridService();
    const grid = localGridService.creerGrilleVide();
    expect(grid).toBeTruthy();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(grid.get(i, j)).toBe(null);
      }
    }
  });

  it('test #copieGrille', () => {
    const localGridService = new GridService();
    const tab = [[JoueurEnum.JOUEUR1, JoueurEnum.JOUEUR2, JoueurEnum.JOUEUR1],
      [JoueurEnum.JOUEUR2, JoueurEnum.JOUEUR1, JoueurEnum.JOUEUR2],
      [JoueurEnum.JOUEUR1, JoueurEnum.JOUEUR1, null]];
    const gridInitiale = new GridModel(tab);
    const grid = localGridService.copieGrille(gridInitiale);
    expect(grid).toBeTruthy();
    expect(grid.get(0, 0)).toBe(JoueurEnum.JOUEUR1);
    expect(grid.get(0, 1)).toBe(JoueurEnum.JOUEUR2);
    expect(grid.get(0, 2)).toBe(JoueurEnum.JOUEUR1);
    expect(grid.get(1, 0)).toBe(JoueurEnum.JOUEUR2);
    expect(grid.get(1, 1)).toBe(JoueurEnum.JOUEUR1);
    expect(grid.get(1, 2)).toBe(JoueurEnum.JOUEUR2);
    expect(grid.get(2, 0)).toBe(JoueurEnum.JOUEUR1);
    expect(grid.get(2, 1)).toBe(JoueurEnum.JOUEUR1);
    expect(grid.get(2, 2)).toBe(null);
  });

});
