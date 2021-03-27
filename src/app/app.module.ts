import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {jeuxReducer} from './store/jeux.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from './grid/grid.component';
import { GameStateComponent } from './game-state/game-state.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GameStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ jeux: jeuxReducer}, {}),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
