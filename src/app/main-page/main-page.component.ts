import { Component, OnInit } from '@angular/core';
import { RestService, Tournament,Match, TeamUsefull } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  matches : Match[] = [];
  teams : TeamUsefull[] = [];
  tournaments: Tournament[] = [];
  tournament = { name : "", tournament_id: 0 , organizerOrganizerId : 0};
  organizer = { name : "", organizer_id : 0}
  errorMessage = "";
  boolean = false;

  constructor(public rest:RestService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void{
    this.initialyze()
    if(this.route.snapshot.params['tournament_id?'] != 0){
      this.boolean = true;
    }
  }

  initialyze(){
    this.rest.getTournaments().subscribe(
      data => {
        this.tournaments = data
        this.tournaments.forEach(tournament => {
          if(tournament['tournament_id'] == this.route.snapshot.params['tournament_id?']){
                this.tournament = tournament
                this.rest.getOrganizer(this.tournament.organizerOrganizerId).subscribe(
                  resp => {
                    this.organizer = resp
                  }
                )
                this.rest.getTournamentMatches(this.tournament.tournament_id).subscribe(
                  resp => {
                    this.matches = resp['matches']
                    console.log(this.matches)
                  }
                )
                this.rest.getTournamentTeams(this.tournament.tournament_id).subscribe(
                  resp => {
                    this.teams = resp['teams']
                    console.log(this.teams)
                  }
                )
          }
          else {
            this.errorMessage = "L'id du tournois n'est pas valide"
          }
        })
      }
    )
  }

  connect(){
    this.router.navigate(['connection']);
  }
}
