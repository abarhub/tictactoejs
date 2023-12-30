import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GridComponent} from './grid.component';
import {Store, StoreModule} from '@ngrx/store';
import {jeuxReducer} from '../store/jeux.reducer';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent],
      imports: [StoreModule.forRoot({jeux: jeuxReducer}, {})]
    })
      .compileComponents();
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
