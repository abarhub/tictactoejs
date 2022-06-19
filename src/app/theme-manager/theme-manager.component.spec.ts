import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemeManagerComponent} from './theme-manager.component';
import {Store, StoreModule} from '@ngrx/store';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';

describe('ThemeManagerComponent', () => {
  let component: ThemeManagerComponent;
  let fixture: ComponentFixture<ThemeManagerComponent>;
  let store: Store;
  let untypedFormBuilder: UntypedFormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeManagerComponent],
      imports: [StoreModule.forRoot({}), ReactiveFormsModule]
    })
      .compileComponents();
    store = TestBed.inject(Store);
    untypedFormBuilder = TestBed.inject(UntypedFormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
