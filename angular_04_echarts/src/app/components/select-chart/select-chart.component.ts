import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserOptions } from 'src/app/interfaces/user-options';
@Component({
  selector: 'app-select-chart',
  templateUrl: './select-chart.component.html',
  styleUrls: ['./select-chart.component.css']
})
export class SelectChartComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dateAdapter: DateAdapter<Date>
  ) { }

  getCurrentDate = new Date();

  currentDate = this.getCurrentDate.toISOString();

  userOptions: UserOptions = {
    cardValueID: '',
    chartType: 'empty', //(en) Receives the chart chosen by the user.
    selectedOptions: [], //(en)Receives the Options selected by the user
    startDate: '2014-01-01T00:00:00.000Z', //(en) startDate receive the value of the initial date from the filter. 
    endDate: this.currentDate, //(en) endDate receive the value of the final date from the filter. 
    aggregate: '', //(en) Receives the user's option, either count, sum, or avg.
    //(en) The count is already executed when necessary for those where the value of this aggregate is ''.
    timeGrouping: 'month'
  };

  //(en) Number of options selected by the user
  selectedOptions: number = this.userOptions.selectedOptions.length;

  //(en) Display or hide chart options
  showChartOptions: boolean = false;

  //(en) Extracts the columns from the "extracs" and "Users" tables.
  extractsColumnsOption: string[] = [];
  usersColumnsOption: string[] = [];
  readyQueries: string[] = [];

  //(en) Array responsible for receiving user responses without any processing.
  setColumnOptions: boolean = false;

  //(en) Shows and hides the filter button.
  isFilter: boolean = false;

  //(en) Receives the time grouping for some queries with the created_at column.
  timeGrouping: string = 'month'

  //(en) Get the chart ID
  @Input() cardID!: string;

  //(en) Get the chart Class
  @Input() cardClass!: string;

  //(en) Recives the Chart Data
  @Input() chartValues!: UserOptions;



  //(en) Inserts user options (database columns)
  setOption(choice: string) {

    //(en) Checks if the selected option has already been chosen; if so, removes.
    if (this.userOptions.selectedOptions.includes(choice)) {

      //(en) Removing option
      this.userOptions.selectedOptions = this.userOptions.selectedOptions.filter(item => item !== choice);

      //(en) Decreases the count of selected options by 1.
      --this.selectedOptions;

      //(en) Hides the charts.
      this.showChartOptions = false;

    } else {
      //(en) Counts how many options are selected
      this.selectedOptions += 1;

      //(en) Since the selected option wasn't found in the array, it is added.
      switch (choice) {
        case 'id':
          this.userOptions.selectedOptions.push(choice);
          break;
        case 'name':
          this.userOptions.selectedOptions.push(choice);
          break;
        case 'segment':
          this.userOptions.selectedOptions.push(choice);
          break;
        case 'created_at':
          this.userOptions.selectedOptions.push(choice);
          break;
        case 'pages_process':
          this.userOptions.selectedOptions.push(choice);
          this.userOptions.aggregate = 'sum';
          break;
        case 'doc_type':
          this.userOptions.selectedOptions.push(choice);
          break;
        case 'user_id':
          this.userOptions.selectedOptions.push(choice);
          break;
        case 'doc_count':
          this.userOptions.aggregate = '';
          this.userOptions.selectedOptions.push(choice);
          break;
        case 'only_doc_count':
          this.userOptions.aggregate = '';
          this.userOptions.selectedOptions.push(choice);
          break;
        default:
          this.userOptions.selectedOptions.push(choice)
          break;
      }
    }

  }

  //(en) Displays and hides the options to the user.
  showOptions() {
    this.setColumnOptions = !this.setColumnOptions;

    //(en) Closes filter options
    this.isFilter = false;

  }



  async addFilter(): Promise<void> {

    //(en) changes Date from 'Fri Mar 10 2000 00:00:00 GMT-0300' to '2023-11-19T00:00:46.614Z'
    this.userOptions.startDate = (new Date(this.userOptions.startDate).toISOString());
    this.userOptions.endDate = (new Date(this.userOptions.endDate).toISOString());

    //(en) Created only to receive the value of chartOption during 
    //toggleFilter, allowing the updating of chart data.
    let changeChartToFilter: string = this.userOptions.chartType;;

    //(en) chartOption has its value changed to the loading chart.
    this.userOptions.chartType = 'loading';

    // Adicionando um atraso
    await this.delay(1000);

    //(en) chartOption receives its previous value, set by the user or retrieved from the database.
    this.userOptions.chartType = changeChartToFilter;

    //(en) closes filter option
    this.isFilter = false;
  }


  cleanDataFilter() {
    this.userOptions.startDate = '2000-01-01T00:00:00.000Z';
    this.userOptions.endDate = this.currentDate;
  }

  cleanFilter() {
    this.cleanDataFilter();
    if (this.userOptions.selectedOptions.includes('pages_process')) {
      this.userOptions.aggregate = 'sum';
    } else {
      this.userOptions.aggregate = '';
    }

    this.userOptions.timeGrouping = 'month';
  }


  openChart() {
    //(en) Opens chart options
    this.showChartOptions = true;

  }

  //(en) Sets the chart chosen by the user.
  async setChart(event: Event): Promise<void> {
    const value = (event.target as HTMLSelectElement).value;

    //(en) chartOption has its value changed to the empty chart.
    this.userOptions.chartType = 'loading';

    // Adicionando um atraso
    await this.delay(1000);

    //(en) chartOption receives its previous value, set by the user.
    this.userOptions.chartType = value;
  }

  // (en) The delay function is asynchronous and creates a pause in 
  // the code using await and setTimeout, returning a Promise that is 
  // resolved after the specified time in milliseconds. This approach 
  // allows introducing delays in asynchronous operations in Angular 
  // without blocking the code execution.
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //(en) Retrieve the database columns.
  fetchColumns() {
    this.dataService.getColumns('extracts')
      .subscribe(data => {
        this.extractsColumnsOption = data
          .filter(item => item.column_name !== 'id' && item.column_name !== 'user_id')
          .map(item => item.column_name)
        this.extractsColumnsOption.push('doc_count')
      });
    this.dataService.getColumns('users')
      .subscribe(data => {
        this.usersColumnsOption = data
          .filter(item => item.column_name !== 'id')
          .map(item => item.column_name)
      });
    this.readyQueries = ['only_doc_count']
  }

  //(en) Clears all data selected by the user.
  resetData() {
    this.userOptions = {
      cardValueID: this.cardID,
      chartType: 'empty',
      selectedOptions: [],
      startDate: '2014-01-01T00:00:00.000Z',
      endDate: this.currentDate,
      aggregate: '',
      timeGrouping: 'month'
    };
    this.selectedOptions = 0;
    this.showChartOptions = false;
  }

  setAggregate(value: string) {
    if (this.userOptions.aggregate === value) {
      this.userOptions.aggregate = '';
    } else {
      this.userOptions.aggregate = value;
    }
  }

  saveToDatabase() {
    console.log(this.userOptions)
  }

  ngOnInit(): void {
    this.fetchColumns();

    //(en) Assigns the value of the ID
    this.userOptions.cardValueID = this.cardID;

    //(en) Sets the calendar language to Portuguese (Brazilian) in Angular
    this.dateAdapter.setLocale('pt-BR');

    // Simulation: Retrieving user preferences from the database. 

    if ((this.chartValues.chartType != '') && (this.chartValues.selectedOptions.length != 0)) {
      if (this.cardID === this.chartValues.cardValueID) {
        this.userOptions.selectedOptions = this.chartValues.selectedOptions;

        this.userOptions.chartType = this.chartValues.chartType;

        this.selectedOptions = this.chartValues.selectedOptions.length;

        if (this.chartValues.selectedOptions.includes('pages_process')) {
          this.userOptions.aggregate = 'sum'
        } else {
          this.userOptions.aggregate = ''
        }
      }
    }

    if (this.cardID === 'card01') {

      this.userOptions.selectedOptions = ['pages_process', 'segment']

      this.userOptions.chartType = 'bar';

      this.selectedOptions = this.userOptions.selectedOptions.length;

      if (this.userOptions.selectedOptions.includes('pages_process')) {
        this.userOptions.aggregate = 'sum'
      } else {
        this.userOptions.aggregate = ''
      }

    }
  }


}
