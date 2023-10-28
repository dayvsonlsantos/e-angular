import { Injectable } from '@angular/core';
import { Animal } from '../Animal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiURL = 'http://localhost:3000/animals'

  constructor(private http: HttpClient) { }

  remove(id: number/*animals: Animal[], animal: Animal*/){
    // return animals.filter((a) => animal.name !== a.name);
    return this.http.delete<Animal>(`${this.apiURL}/${id}`);
  }

  getAll(): Observable<Animal[]>{
    return this.http.get<Animal[]>(this.apiURL)
  }

  getItem(id: number): Observable<Animal>{
    return this.http.get<Animal>(`${this.apiURL}/${id}`)
  }
}
