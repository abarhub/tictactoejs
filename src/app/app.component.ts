import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {CaseModel} from './model/case.model';
import {GameStoreService} from './services/game-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AppComponent implements OnInit {

  title = 'tictactoejs';

  constructor(private readonly gameStore: GameStoreService) {

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
