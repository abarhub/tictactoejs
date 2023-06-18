import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemeManagerComponent} from './theme-manager.component';
import {Store, StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ThemeManagerComponent', () => {
  let component: ThemeManagerComponent;
  let fixture: ComponentFixture<ThemeManagerComponent>;
  let untypedFormBuilder: UntypedFormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeManagerComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule]
    })
      .compileComponents();
    untypedFormBuilder = TestBed.inject(UntypedFormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeManagerComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form valid when empty', () => {
    expect(component.themeForm.valid).toBeTruthy();
  });
});
