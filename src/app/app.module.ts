import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreationComponent } from './creation/creation.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AddTeamComponent } from './add-team/add-team.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    MainPageComponent,
    ConfigurationComponent,
    CreationComponent,
    AddTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
