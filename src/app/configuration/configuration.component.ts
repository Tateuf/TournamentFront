import { Component, OnInit } from '@angular/core';
import { RestService, Tournament,Match, TeamUsefull } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})

export class ConfigurationComponent implements OnInit {
  matches : Match[] = [];
  teams : TeamUsefull[] = [];
  tournaments: Tournament[] = [];
  tournament = { name : "", tournament_id: 0 , organizerOrganizerId : 0};
  organizer = { name : "", organizer_id : 0}
  errorMessage = "";
  scoreModification = { score : 0, team_id : 0, tournament_id : 0}
  score = 0;
  boolean = false;

  constructor(public rest:RestService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.initialyze()
    if(this.route.snapshot.params['tournament_id?'] != 0){
      this.boolean = true;
    }
  }

  initialyze(){
    this.rest.getMyTournaments(this.route.snapshot.params['organizer_id']).subscribe(
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
            this.errorMessage = "L'id du tournoi n'est pas valide"
          }
        })
      }
    )
  }

  createTournament(){
      this.router.navigate(['creation/'+ this.route.snapshot.params['organizer_id']]);    
  }

  validateScore(match_id : number, scoreA :number, scoreB : number, winner: number){
      this.rest.updateMatch({match_id,scoreA,scoreB,winner}).subscribe(
        rest => {
          console.log(rest)
          this.updateScore()
          this.router.navigate(['configuration/'+ this.route.snapshot.params['organizer_id'] + "/" + this.route.snapshot.params['tournament_id?'] ])
          .then(()=> {
            window.location.reload();
         })
        }
      )
  }

  updateScore(){
    this.teams.forEach(team => {
      this.scoreModification.team_id = team.team_id
      this.scoreModification.tournament_id = this.tournament.tournament_id
      this.score = 0
      this.matches.forEach(match => {
        if((team.team_id == match.teamA || team.team_id == match.teamB) && team.team_id==match.winner ){
          this.score += 3
        }
        else if ((team.team_id == match.teamA || team.team_id == match.teamB) && team.team_id!=match.winner && (match.winner == match.teamA || match.winner == match.teamB)){
          this.score -= 3
        }
      })
      this.scoreModification.score = this.score
      this.rest.updateScore(this.scoreModification).subscribe(data => {
        console.log(data)
      })
    })
  }

  disconnect(){
    this.router.navigate(["mainPage/0"])
  }
}
