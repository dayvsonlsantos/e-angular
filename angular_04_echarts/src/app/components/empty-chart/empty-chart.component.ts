import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-chart',
  templateUrl: './empty-chart.component.html',
  styleUrls: ['./empty-chart.component.css']
})
export class EmptyChartComponent {
    @Input() cardID!: string;

    @Input() title: string = '';
    @Input() text: string = '';
}
