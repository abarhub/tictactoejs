import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameStateComponent} from './game-state.component';
import {JoueurEnum} from '../model/joueur.enum';
import {GameStoreService} from '../services/game-store.service';

describe('GameStateComponent', () => {
  let component: GameStateComponent;
  let fixture: ComponentFixture<GameStateComponent>;
  let gameStoreService: GameStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameStateComponent],
      imports: [      ]
    })
      .compileComponents();
    gameStoreService = TestBed.inject(GameStoreService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Nouveau Jeux', () => {
    gameStoreService.nouveauJeux();

    expect(component.joueurCourant).toEqual(JoueurEnum.JOUEUR1);
    expect(component.jeuxTermine).toBeFalse();
    expect(component.joueurGagnant).toBeNull();
  });
});
