import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extracts, Users } from '../models/data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiURLExtracts = `${environment.api}/extracts`
  private apiURLUsers = `${environment.api}/users`

  constructor(private http: HttpClient) { }

  getAllExtracts(): Observable<Extracts[]>{
    return this.http.get<Extracts[]>(this.apiURLExtracts)
  }

  getAllUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.apiURLUsers)
  }
}
