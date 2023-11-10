import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  //(en) Receives the IDs for each chart.
  @Input() card01!:string;
  @Input() card02!:string;
  @Input() card03!:string;
  
}
