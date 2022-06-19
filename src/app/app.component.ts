import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectJeux} from './store/jeux.selectors';
import {nouveauJeaux, selectionneCase} from './store/jeux.actions';
import {Observable} from 'rxjs';
import {AppState} from './store/app.state';
import {CaseModel} from './model/case.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'tictactoejs';

  // @ts-ignore
  jeux$: Observable<AppState>;

  constructor(private store: Store) {
    // @ts-ignore
    this.jeux$ = this.store.pipe(select(selectJeux));
  }

  ngOnInit(): void {
  }

  nouveauJeux(): void {
    this.store.dispatch(nouveauJeaux());
  }

  selectionCase(caseSelectionnee: CaseModel): void {
    if (caseSelectionnee) {
      this.store.dispatch(selectionneCase({ligne: caseSelectionnee.ligne, colonne: caseSelectionnee.colonne}));
    }
  }

}
