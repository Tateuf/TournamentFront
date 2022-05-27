import { Component, OnInit } from '@angular/core';
import { RestService, Tournament,Match, TeamUsefull, TeamComplete, MatchCreate } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getInstructionStatements } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  teams : TeamComplete[] = [];
  team = { team_id : 0 , tournament_id : 0};
  newTeam = {name : "" , email : "", member : 0}
  MyTeams : TeamComplete[] = [];
  matches : MatchCreate[] = [];
  constructor(public rest:RestService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getTeams()
    this.team.tournament_id = this.route.snapshot.params['tournament_id']
    this.updateMyTeams()
  }

  getTeams(){
    this.rest.getTeams().subscribe(
      data => {
        this.teams = data;
        console.log(data)
      }
    )
  }

  updateMyTeams(){
    this.rest.getTournamentTeams(this.route.snapshot.params['tournament_id']).subscribe(
      data => {
        this.MyTeams = data.teams;
        console.log(data)
      }
    )
  }

  addTeam(){
    console.log(this.team)
    this.rest.addTeam(this.team).subscribe(
      data => {
        console.log(data)
        this.updateMyTeams()
      }
    )
  }

  generate(){
    this.MyTeams.forEach(team1 =>{
      this.MyTeams.forEach(team2 =>{
        if(team1 != team2){
          this.matches.push({teamA_id : team1.team_id , teamB_id : team2.team_id})
        }
      })
    })
    this.shuffle()
    this.matches.forEach(match => {
      this.rest.createMatch(match).subscribe(data => {
        this.rest.addMatch({match_id : data.match_id, tournament_id : this.route.snapshot.params['tournament_id']}).subscribe(resp => {
            console.log(resp)
          })
      })
    })
    this.router.navigate(['configuration/'+ this.route.snapshot.params['organizer_id'] +"/0"])
  }

  shuffle() {
    let currentIndex = this.matches.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.matches[currentIndex], this.matches[randomIndex]] = [
        this.matches[randomIndex], this.matches[currentIndex]];
      }
  }

  createTeam(){
    this.rest.createTeam(this.newTeam).subscribe(data => {
      this.router.navigate(['addTeam/'+ this.route.snapshot.params['organizer_id'] + "/" + this.route.snapshot.params['tournament_id'] ])
      .then(()=> {
        window.location.reload();
      })
    })
  }
}
