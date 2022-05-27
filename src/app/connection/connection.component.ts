import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  organizer = { name : '', password : ''}
  organizer2 = { name : '', password : ''}
  erreur = "le mot de passe n'est pas le bon"
  boolean = false;
  
  constructor(public rest:RestService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit():void{
  }

  signUp(){
    this.rest.signUp(this.organizer2).subscribe(
      (resp)=> {
        this.router.navigate(['configuration/'+ resp.organizer_id +"/0"]);
      }
    )
  }

  signIn(){
    this.rest.signIn(this.organizer).subscribe(
      (resp)=> {
        this.router.navigate(['configuration/'+ resp.organizer_id +"/0"]);
      }
    )
  }

  disconnect(){
    this.router.navigate(["mainPage/0"])
  }
}
