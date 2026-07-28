import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectJeux} from './store/jeux.selectors';
import {nouveauJeaux, selectionneCase} from './store/jeux.actions';
import {Observable} from 'rxjs';
import {AppState} from './store/app.state';
import {CaseModel} from './model/case.model';
import {GameStoreService} from './services/game-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {

  title = 'tictactoejs';

  constructor(private gameStore: GameStoreService) {

  }

  ngOnInit(): void {
  }

  nouveauJeux(): void {
    this.gameStore.nouveauJeux();
  }

  selectionCase(caseSelectionnee: CaseModel): void {
    if (caseSelectionnee) {
      this.gameStore.caseSelectionnee(caseSelectionnee);
    }
  }

}
