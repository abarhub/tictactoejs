import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectJeux} from '../store/jeux.selectors';
import {CaseModel} from '../model/case.model';
import {AppState} from '../store/app.state';
import {Observable} from 'rxjs';
import {GridService} from '../services/grid.service';
import {GridModel} from '../model/grid.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  tab: GridModel | null = null;

  // @ts-ignore
  jeux$: Observable<AppState>;

  @Output()
  selectionCase: EventEmitter<CaseModel> = new EventEmitter<CaseModel>();

  constructor(private store: Store, private gridService: GridService) {
    // @ts-ignore
    this.jeux$ = this.store.pipe(select(selectJeux));
  }

  ngOnInit(): void {
    this.jeux$.subscribe(data => {
      console.log('ngOnInit jeux GridComponent', data, data.jeux);
      if (data) {
        if (data.jeux) {
          const tmp = (data.jeux as unknown) as AppState;
          console.log('ngOnInit jeux GridComponent', tmp);
          if (tmp && tmp.jeux) {
            let tab: GridModel | null;
            tab = this.gridService.copieGrille(tmp.jeux);
            console.info('copie tab GridComponent', tab);
            if (tab) {
              this.tab = tab;
            }
          }
        }
      }
    }, error => {
      console.error('Erreur', error);
    });
  }

  selection(ligne: number, colonne: number): void {
    this.selectionCase.emit({ligne, colonne});
  }
}
