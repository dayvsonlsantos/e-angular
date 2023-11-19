import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extracts, Users } from '../models/data.model';
import { environment } from 'src/environments/environment';
import { UserOptions } from '../interfaces/user-options';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private apiURLExtracts = `${environment.api}/extracts`
  private apiURLUsers = `${environment.api}/users`

  // 
  userOptionsToDbString: string = ''
  filterDateString: string = ''
  serv_tableSelected: string = ''
  filterUserOptionsString: string = ''
  userOptions!: UserOptions;

  constructor(private http: HttpClient) { }

  // getAllExtracts(): Observable<Extracts[]> {
  //   return this.http.get<Extracts[]>(this.apiURLExtracts)
  // }

  getExtracts(userOptionsToDB: string[], filterDate: string[], filterUserOptions: string[]) {
    console.log(userOptionsToDB, filterDate, filterUserOptions)

    this.userOptionsToDbString = userOptionsToDB.join(',');
    this.filterDateString = filterDate.join(',');
    this.filterUserOptionsString = filterUserOptions.join(',')
    console.log(this.userOptionsToDbString)

    return this.http.get<any[]>(`${environment.api}/extracts?userOptions=${this.userOptionsToDbString}&filterDate=${this.filterDateString}&filterUserOptions=${this.filterUserOptionsString}`)
  }

  getData(userOptions: UserOptions) {
    console.log(userOptions)

    const params = {
      chartType: userOptions.chartType,
      selectedOptions: userOptions.selectedOptions.join(','), // Supondo que selectedOptions é uma lista
      startDate: userOptions.startDate,
      endDate: userOptions.endDate,
      aggregate: userOptions.aggregate,
      timeGrouping: userOptions.timeGrouping,
    };

    return this.http.get<any[]>(`${environment.api}/data`, { params });
// Aqui ta imprimindo, mas chega no back undefined                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            return this.http.get<any[]>(`${environment.api}/data?userOptions=${this.userOptions}`)
  }

  getTables(): Observable<any[]> {
    return this.http.get<string[]>(`${environment.api}/data/getTables`)
  }

  getColumns(tableSelected: string) {
    this.serv_tableSelected = tableSelected;
    return this.http.get<any[]>(`${environment.api}/data/getColumns?tableSelected=${this.serv_tableSelected}`)
  }

  // getAllUsers(): Observable<Users[]> {
  //   return this.http.get<Users[]>(this.apiURLUsers)
  // }
}
