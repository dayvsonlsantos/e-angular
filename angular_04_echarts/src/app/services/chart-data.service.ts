import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private userOptionsSubject = new BehaviorSubject<string[]>([]);
  userOptions$ = this.userOptionsSubject.asObservable();

  updateUserOptions(userOptions: string[]) {
    this.userOptionsSubject.next(userOptions);
  }
}