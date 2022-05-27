import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CreationComponent } from './creation/creation.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AddTeamComponent } from './add-team/add-team.component';

const routes: Routes = [
  {
    path : 'connection',
    component:ConnectionComponent
  },
  {
    path : 'mainPage/:tournament_id?',
    component:MainPageComponent
  },
  {
    path : 'creation/:organizer_id?',
    component:CreationComponent
  },
  {
    path : 'addTeam/:organizer_id/:tournament_id',
    component:AddTeamComponent
  }, 
  {
    path : 'configuration/:organizer_id/:tournament_id?',
    component:ConfigurationComponent
  },
  {
    path:'',
    redirectTo:'mainPage/',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
