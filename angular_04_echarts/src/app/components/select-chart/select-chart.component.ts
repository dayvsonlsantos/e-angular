import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { zip } from 'rxjs';
@Component({
  selector: 'app-select-chart',
  templateUrl: './select-chart.component.html',
  styleUrls: ['./select-chart.component.css']
})
export class Chart01Component implements OnInit {

  constructor(private dataService: DataService) { }

  //(en) Number of options selected by the user
  selectedOptions: number = 0;

  //(en) Options selected by the user.
  userOptions: string[] = [];

  //(en) Options selected by the user to send to the Database.
  userOptionsToDB: string[] = []

  //(en) User-selected options.
  userSelectedOptions: string[] = []

  //(en) Display or hide chart options
  showChartOptions: boolean = false;

  //(en) Receives the chart chosen by the user.
  chartOption: string = '';

  ExtractsColumnsOption: string[] = [];
  UsersColumnsOption: string[] = [];

  setColumnOptions: boolean = false;


  //(en) Get the chart ID
  @Input() cardID!: string;

  //(en) Inserts user options (database columns)
  setOption(choice: string) {

    //(en) Counts how many options are selected
    if (this.userSelectedOptions.includes(choice)) {
      this.userSelectedOptions = this.userSelectedOptions.filter(item => item !== choice);
      --this.selectedOptions;
      this.showChartOptions = false;
      this.chartOption = '';
      this.userOptions = [];
      this.userOptionsToDB = [];
    } else {
      this.selectedOptions += 1;
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
          this.userOptionsToDB.push('doc_type');
          break;
        default:
          this.userOptionsToDB.push(item)
          break;
      }

    });
  }

  openColumnOptions() {
    this.setColumnOptions = true;
  }

  closeColumnOptions() {
    this.setColumnOptions = false;
  }


  openChart() {
    //(en) Opens chart options
    this.showChartOptions = true;
    this.optionsSelectByUser();
  }

  //(en) Sets the chart chosen by the user.
  setChart(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.chartOption = value;
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

  resetData() {
    this.selectedOptions = 0;
    this.userOptions = [];
    this.userOptionsToDB = [];
    this.showChartOptions = false;
    this.chartOption = '';
    this.userSelectedOptions = [];
  }

  ngOnInit(): void {
    this.fetchColumns();

    // Simulation: Retrieving user preferences from the database. 

    // if(this.cardID === 'card01'){

    //   this.userOptions = ['Páginas Processadas','Segmento']

    //   this.userOptionsToDB = ['pages_process','segment']

    //   this.chartOption = 'bar';
    // }
  }


}
