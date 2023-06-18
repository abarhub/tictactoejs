import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Store, StoreModule} from '@ngrx/store';
import {GridComponent} from './grid/grid.component';
import {GameStateComponent} from './game-state/game-state.component';
import {ThemeManagerComponent} from './theme-manager/theme-manager.component';

describe('AppComponent', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        AppComponent,
        GridComponent,
        GameStateComponent,
        ThemeManagerComponent
      ],
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tictactoejs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tictactoejs');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Tic Tac Toe');
  });
});
