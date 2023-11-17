import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-select-chart',
  templateUrl: './select-chart.component.html',
  styleUrls: ['./select-chart.component.css']
})
export class Chart01Component implements OnInit {

  constructor(
    private dataService: DataService,
    private dateAdapter: DateAdapter<Date>
  ) { }

  //(en) Number of options selected by the user
  selectedOptions: number = 0;

  //(en)Receives the User-selected options with formatted names.
  userOptions: string[] = [];

  //(en)Receives the Options selected by the user to send to the Database (Using the column names from the database).
  userOptionsToDB: string[] = []

  //(en) User-selected options.
  userSelectedOptions: string[] = []

  //(en) Display or hide chart options
  showChartOptions: boolean = false;

  //(en) Receives the chart chosen by the user.
  chartOption: string = 'empty';

  //(en) Extracts the columns from the "extracs" and "Users" tables.
  ExtractsColumnsOption: string[] = [];
  UsersColumnsOption: string[] = [];

  //(en) Array responsible for receiving user responses without any processing.
  setColumnOptions: boolean = false;

  //(en) Shows and hides the filter button.
  isFilter: boolean = false;

  //(en) startDate and endDate receive the values of the initial and final dates from the filter. 
  startDate: string = '';
  endDate: string = '';

  //(en) Receives the start date and end date data from the date filter.
  filterDate: string[] = [];

  //(en) Created only to receive the value of chartOption during 
  //toggleFilter, allowing the updating of chart data.
  changeChartToFilter: string = '';

  //(en) Receives the user's option, either count, sum, or avg.
  //(en) The count is already executed when necessary for those where the value of this aggregate is ''.
  aggregate: string = '';

  //(en) Receives the user's option from the filter
  filterUserOptions: string[] = [];

  //(en) Receives the time grouping for some queries with the created_at column.
  timeGrouping: string = 'month'

  //(en) Get the chart ID
  @Input() cardID!: string;

  //(en) Inserts user options (database columns)
  setOption(choice: string) {

    //After receiving data from the database, selectedOptions remains empty. To avoid bugs, I reset the values.
    if (this.selectedOptions === 0) {
      this.userOptions = []

      this.userOptionsToDB = []

      this.userSelectedOptions = [];

      this.selectedOptions = 0;

      this.aggregate = '';

      this.filterUserOptions = [];

      this.timeGrouping = 'month'
    }

    //(en) Checks if the selected option has already been chosen; if so, removes.
    if (this.userSelectedOptions.includes(choice)) {

      //(en) Removing option
      this.userSelectedOptions = this.userSelectedOptions.filter(item => item !== choice);

      //(en) Decreases the count of selected options by 1.
      --this.selectedOptions;

      //(en) Hides the charts.
      this.showChartOptions = false;

      //(en) Deletes userOptions and userOptionsToDB
      this.userOptions = [];
      this.userOptionsToDB = [];
    } else {
      //(en) Counts how many options are selected
      this.selectedOptions += 1;

      //(en) Since the selected option wasn't found in the array, it is added.
      switch (choice) {
        case 'id':
          this.userSelectedOptions.push(choice);
          break;
        case 'name':
          this.userSelectedOptions.push(choice);
          break;
        case 'segment':
          this.userSelectedOptions.push(choice);
          break;
        case 'created_at':
          this.userSelectedOptions.push(choice);
          break;
        case 'pages_process':
          this.userSelectedOptions.push(choice);
          this.aggregate = 'sum';
          break;
        case 'doc_type':
          this.userSelectedOptions.push(choice);
          break;
        case 'user_id':
          this.userSelectedOptions.push(choice);
          break;
        case 'doc_count':
          this.userSelectedOptions.push(choice);
          break;
        default:
          this.userSelectedOptions.push(choice)
          break;
      }
    }

  }

  //(en) Gets the options selected by the user, sending the 
  //appropriate value to the userOptions and userOptionsToDB arrays.
  optionsSelectByUser() {
    this.userSelectedOptions.map((item) => {

      switch (item) {
        case 'id':
          this.userOptions.push('ID')
          this.userOptionsToDB.push(item);
          break;
        case 'name':
          this.userOptions.push('Usuário')
          this.userOptionsToDB.push(item);
          break;
        case 'segment':
          this.userOptions.push('Segmento')
          this.userOptionsToDB.push(item);
          break;
        case 'created_at':
          this.userOptions.push('Data de Criação')
          this.userOptionsToDB.push(item);
          break;
        case 'pages_process':
          this.userOptions.push('Páginas Processadas')
          this.userOptionsToDB.push(item);
          break;
        case 'doc_type':
          this.userOptions.push('Tipo de Documento')
          this.userOptionsToDB.push(item);
          break;
        case 'user_id':
          this.userOptions.push('ID do Usuário')
          this.userOptionsToDB.push(item);
          break;
        case 'doc_count':
          this.userOptions.push('Documentos processados')
          this.userOptionsToDB.push(item);
          break;
        default:
          this.userOptionsToDB.push(item)
          break;
      }

    });
  }

  //(en) Displays the options to the user.
  openColumnOptions() {
    this.setColumnOptions = true;
  }

  //(en) Hides the options from the user.
  closeColumnOptions() {
    this.setColumnOptions = false;

    //(en) Closes filter options
    this.isFilter = false;
  }


  async addFilter(): Promise<void> {

    if (this.startDate != '' && this.endDate != '') {
      this.filterDate[0] = this.startDate;
      this.filterDate[1] = this.endDate;
    } else {
      this.cleanDataFilter();
    }

    this.filterUserOptions[0] = this.aggregate;

    //(en) changeChartToFilter receives the value of chartOption
    this.changeChartToFilter = this.chartOption;

    //(en) chartOption has its value changed to the empty chart.
    this.chartOption = 'loading';

    // Adicionando um atraso
    await this.delay(1000);

    //(en) chartOption receives its previous value, set by the user or retrieved from the database.
    this.chartOption = this.changeChartToFilter;

    //(en) closes filter option
    this.isFilter = false;
  }

  cleanFilter() {
    this.startDate = '';
    this.endDate = '';
    this.filterDate = [];
    this.filterUserOptions = [];
    this.aggregate = '';
    this.filterUserOptions = [];
  }

  cleanDataFilter() {
    this.startDate = '';
    this.endDate = '';
    this.filterDate = [];
  }


  openChart() {
    //(en) Opens chart options
    this.showChartOptions = true;

    //(en) Executes the optionsSelectByUser function.
    this.optionsSelectByUser();
  }

  //(en) Sets the chart chosen by the user.
  async setChart(event: Event): Promise<void> {
    const value = (event.target as HTMLSelectElement).value;

    //(en) chartOption has its value changed to the empty chart.
    this.chartOption = 'loading';

    // Adicionando um atraso
    await this.delay(1000);

    //(en) chartOption receives its previous value, set by the user.
    this.chartOption = value;
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
        this.ExtractsColumnsOption = data
          .filter(item => item.column_name !== 'id' && item.column_name !== 'user_id')
          .map(item => item.column_name)
        this.ExtractsColumnsOption.push('doc_count')
      });
    this.dataService.getColumns('users')
      .subscribe(data => {
        this.UsersColumnsOption = data
          .filter(item => item.column_name !== 'id')
          .map(item => item.column_name)
      });
  }

  //(en) Clears all data selected by the user.
  resetData() {
    this.selectedOptions = 0;
    this.userOptions = [];
    this.userOptionsToDB = [];
    this.showChartOptions = false;
    this.chartOption = 'empty';
    this.userSelectedOptions = [];
    this.startDate = '';
    this.endDate = '';
    this.filterDate = [];
    this.timeGrouping = 'month'
  }

  setAggregate(value: string) {
    if (this.aggregate === value) {
      this.aggregate = '';
    } else {
      this.aggregate = value;
    }
  }

  ngOnInit(): void {
    this.fetchColumns();

    this.dateAdapter.setLocale('pt-BR');

    // Simulation: Retrieving user preferences from the database. 

    if (this.cardID === 'card01') {

      this.userOptions = ['Páginas Processadas', 'Segmento']

      this.userOptionsToDB = ['pages_process', 'segment']

      this.chartOption = 'bar';

    }
  }


}
