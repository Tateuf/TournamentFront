import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const endpoint = "http://localhost:8000/";

export interface Organizer{
  name : string;
  password : string;
}
export interface OrganizerById{
  name : string;
  organizer_id : number;
}
export interface Verification{
  message: string;
}

export interface Team{
  name : string;
  email: string;
  member: number;
}

export interface TeamUsefull{
  team_id : number;
  name : string;
  email: string;
  member: number;
  link_Tournament_Team: {
    tournament_id: number;
    teamTeamId: number;
    score: number
  }
}

export interface TeamComplete{
  team_id : number;
  name : string;
  email: string;
  member: number;
  updatedAt : string;
  createdAt:string;
}

export interface Tournament{
  tournament_id : number;
  name: string;
  organizerOrganizerId: number;
}

export interface TournamentCreate{
  name: string;
  organizer_id : number;
}

export interface TournamentAddTeam{
  tournament_id : number;
  team_id : number;
}

export interface TournamentAddMatch{
  tournament_id : number;
  match_id : number;
}

export interface TournamentComplete{
  name: string;
  organizer_id : number;
  tournament_id : number;
  updatedAt : string;
  createdAt:string;
}

export interface Match{
  scoreA : number;
  scoreB: number;
  teamA : number;
  teamB: number;
  match_id : number;
  winner : number;
}

export interface MatchCreate{
  teamA_id : number;
  teamB_id: number;
}

export interface MatchComplete{
  scoreA : number;
  scoreB: number;
  teamA : number;
  teamB: number;
  match_id : number;
  winner : number;
  updatedAt : string;
  createdAt:string;
}

export interface MatchUpdate{
  scoreA : number;
  scoreB: number;
  match_id : number;
  winner : number;
}

export interface ScoreUpdate{
  score : number;
  team_id : number;
  tournament_id: number;
}

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }
  
  signIn(organizer: Organizer): Observable<any>{
    return this.http.post<Verification>(endpoint + "signIn", organizer );
  }

  signUp(organizer: Organizer): Observable<any>{
    return this.http.post<Verification>(endpoint + "signUp", organizer );
  }

  getOrganizer(organizer_id :number):Observable<any>{
    return this.http.get<OrganizerById>(endpoint + "organizer/" + organizer_id);
  }

  createTeam(team: Team): Observable<any>{
    return this.http.post<TeamComplete>(endpoint+"team",team);
  }

  modifyTeam(team: Team): Observable<any>{
    return this.http.put<Verification>(endpoint+"team",team);
  }

  getTeam(id : number): Observable<any>{
    return this.http.get<TeamComplete>(endpoint+"team/"+id);
  }
  getTeams(): Observable<any>{
    return this.http.get<TeamComplete>(endpoint+'teams');
  }

  createTournament(tournament: TournamentCreate): Observable<any>{
    return this.http.post<Verification>(endpoint+"tournament/create",tournament);
  }

  addTeam(tournament : TournamentAddTeam): Observable<any>{
    return this.http.post<TeamComplete>(endpoint+"tournament/addteam",tournament);
  }

  addMatch(tournament : TournamentAddMatch): Observable<any>{
    return this.http.post<Verification>(endpoint+"tournament/addMatch",tournament);
  }

  getTournaments():Observable<any>{
    return this.http.get<Tournament>(endpoint+'tournament');
  }

  getMyTournaments(organizer_id:number):Observable<any>{
    return this.http.get<Tournament>(endpoint+'tournament/'+organizer_id);
  }
  
  getTournamentTeams(tournament_id : number):Observable<any>{
    return this.http.get(endpoint+'tournament/teams/'+tournament_id);
  }

  getTournamentMatches(tournament_id : number):Observable<any>{
    return this.http.get(endpoint+'tournament/matches/'+tournament_id);
  }

  createMatch(match : MatchCreate):Observable<any>{
    return this.http.post<MatchComplete>(endpoint+"match", match);
  }

  updateMatch(match : MatchUpdate):Observable<any>{
    return this.http.put<Verification>(endpoint+"match", match);
  }
  updateScore(scoreUpdate : ScoreUpdate): Observable<any>{
    return this.http.put<Verification>(endpoint + "tournament/updateScore", scoreUpdate);
  }
}
