import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chart01',
  templateUrl: './chart01.component.html',
  styleUrls: ['./chart01.component.css']
})
export class Chart01Component {

  //(en) Number of options selected by the user
  selectedOptions: number = 0;

  //(en) Options selected by the user.
  userOptions: string[] = [];

  //(en) Options selected by the user to send to the Database.
  userOptionsToDB: string[] = []

  //(en) Display or hide chart options
  showChartOptions: boolean = false;

  //(en) Receives the chart chosen by the user.
  chartOption: string = '';

  
  tableOption: string = '';

  constructor() { }

  //(en) Get the chart ID
  @Input() cardProp!: string;

  //(en) Inserts user options (database columns)
  setOption(choice: string) {

    //(en) Counts how many options are selected
    this.selectedOptions += 1;

    if (choice == 'Documentos'){
      //(en) Adds the option to the userOptionsToDB array
      this.userOptionsToDB.push('doc_type')
    }
    if (choice == 'Documentos processados'){
      this.userOptionsToDB.push('doc_type')
    }

    //(en) Adds the option to the userOptions array
    this.userOptions.push(choice);

    


  }

  openChart() {
    //(en) Opens chart options
    this.showChartOptions = true;
  }

  //(en) Sets the chart chosen by the user.
  setChart(choice: string) {
    this.chartOption = choice;
  }

}
