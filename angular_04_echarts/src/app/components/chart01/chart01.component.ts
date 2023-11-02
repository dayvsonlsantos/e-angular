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
  FinaluserOptions: boolean = false;
  showChartOptions:boolean = false;
  chartWasChosen:boolean = false;
  chartOption:number = 0;

  constructor(private chartDataService: ChartDataService) {}

  @Output() userChoiceChanged = new EventEmitter<string[]>();

  setOption(choice: string){
    // Counts how many options are selected
    this.selectedOptions += 1;
    console.log(this.selectedOptions);

    // Adds the option into the Array userOptions
    this.userOptions.push(choice);
    console.log(this.userOptions);
  }

  openChart(){
    // Opens chart options
    this.showChartOptions = true;
  }

  setChart(choice: string){
    //Adding chartOption to the array
    this.userOptions[this.selectedOptions] = (choice)

    // Updates that a chart as alredy been chosen
    this.chartWasChosen = true;
  }

  updateChart() {
    // Updates & Change the chart option in the Array
    this.chartOption = this.userOptions.length - 1;

    // console.log(this.chartOption)

    if (this.selectedOptions === 2){      
      if(this.userOptions[this.chartOption] === 'pie'){
        // console.log('uhu pie');
      }
    }
    else {
      if(this.userOptions[this.chartOption] === 'bar'){
        // console.log('uhu bar');
      }
    }
    this.FinaluserOptions = true;
    // console.log(this.userOptions)
    // console.log(this.userOptions[this.chartOption]);
    this.chartDataService.updateUserOptions(this.userOptions);;
  }
}
