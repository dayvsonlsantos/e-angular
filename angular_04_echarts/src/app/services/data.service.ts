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

  // 
  userOptionsToDbString:string = ''
  serv_tableSelected: string = ''
  
  constructor(private http: HttpClient) { }

  getAllExtracts(): Observable<Extracts[]>{
    return this.http.get<Extracts[]>(this.apiURLExtracts)
  }

  getExtracts(userOptionsToDB: string[]){
    console.log(userOptionsToDB)
    this.userOptionsToDbString = userOptionsToDB.join(',');
    console.log(this.userOptionsToDbString)
    
    return this.http.get<any[]>(`${environment.api}/extracts?userOptions=${this.userOptionsToDbString}`)
  }

  getTables(): Observable<any[]> {
    return this.http.get<string[]>(`${environment.api}/extracts/getTables`)
  }

  getColumns(tableSelected: string){      
    this.serv_tableSelected = tableSelected;
    return this.http.get<any[]>(`${environment.api}/extracts/getColumns?tableSelected=${this.serv_tableSelected}`)
  }

  getAllUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.apiURLUsers)
  }
}
