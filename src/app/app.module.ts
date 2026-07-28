import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GridComponent} from './grid/grid.component';
import {GameStateComponent} from './game-state/game-state.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeManagerComponent} from './theme-manager/theme-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GameStateComponent,
    ThemeManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
