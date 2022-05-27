import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  tournament = {name :"", organizer_id: 0}
  
  constructor(public rest:RestService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.tournament.organizer_id = this.route.snapshot.params['organizer_id?'];
  }

  create(){
    this.rest.createTournament(this.tournament).subscribe(
      (data) => {
        this.router.navigate(['addTeam/'+ this.route.snapshot.params['organizer_id?'] + "/" + data.tournament_id])
      }
    )
  }
}
