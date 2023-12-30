import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameStateComponent} from './game-state.component';
import {Store, StoreModule} from '@ngrx/store';
import {JoueurEnum} from '../model/joueur.enum';
import {jeuxReducer} from '../store/jeux.reducer';
import {nouveauJeaux} from '../store/jeux.actions';

describe('GameStateComponent', () => {
  let component: GameStateComponent;
  let fixture: ComponentFixture<GameStateComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameStateComponent],
      imports: [
        StoreModule.forRoot({jeux: jeuxReducer}, {})
      ]
    })
      .compileComponents();
    store = TestBed.inject(Store);
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
    store.dispatch(nouveauJeaux());

    expect(component.joueurCourant).toEqual(JoueurEnum.JOUEUR1);
    expect(component.jeuxTermine).toBeFalse();
    expect(component.joueurGagnant).toBeNull();
  });
});
