import { Component, EventEmitter, Output } from '@angular/core';
import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: 'app-chart01',
  templateUrl: './chart01.component.html',
  styleUrls: ['./chart01.component.css']
})
export class Chart01Component {

  selectedOptions: number = 0;
  userOptions: string[] = [];
  FinaluserOptions: number = 1;
  showChartOptions: boolean = false;
  chartWasChosen: boolean = false;
  chartOption: number = 0;

  constructor(private chartDataService: ChartDataService) { }

  @Output() userChoiceChanged = new EventEmitter<string[]>();

  setOption(choice: string) {
    // Counts how many options are selected
    this.selectedOptions += 1;
    console.log(this.selectedOptions);

    // Adds the option into the Array userOptions
    this.userOptions.push(choice);
    console.log(this.userOptions);
  }

  openChart() {
    // Opens chart options
    this.showChartOptions = true;
  }

  setChart(choice: string) {
    //Adding chartOption to the array
    this.userOptions[this.selectedOptions] = (choice)

    // Updates that a chart as alredy been chosen
    this.chartWasChosen = true;
  }

  updateChart() {
    // Updates & Change the chart option in the Array
    this.chartOption = this.userOptions.length - 1;

    if (this.userOptions[this.chartOption] === 'pie') {
      this.FinaluserOptions = 0;
    }

    if (this.userOptions[this.chartOption] === 'bar') {
      this.FinaluserOptions = 1;
    }

    this.chartDataService.updateUserOptions(this.userOptions);;
  }
}
