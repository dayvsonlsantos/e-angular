import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { zip } from 'rxjs';
@Component({
  selector: 'app-chart01',
  templateUrl: './chart01.component.html',
  styleUrls: ['./chart01.component.css']
})
export class Chart01Component implements OnInit {

  constructor(private dataService: DataService) { }

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

  ExtractsColumnsOption: string[] = [];
  UsersColumnsOption: string[] = [];


  //(en) Get the chart ID
  @Input() cardProp!: string;

  //(en) Inserts user options (database columns)
  setOption(choice: string) {

    //(en) Counts how many options are selected
    this.selectedOptions += 1;

    switch (choice) {
      case 'id':
        this.userOptions.push('ID')
        this.userOptionsToDB.push(choice);
        break;
      case 'name':
        this.userOptions.push('Usuário')
        this.userOptionsToDB.push(choice);
        break;
      case 'segment':
        this.userOptions.push('Segmento')
        this.userOptionsToDB.push(choice);
        break;
      case 'created_at':
        this.userOptions.push('Data de Criação')
        this.userOptionsToDB.push(choice);
        break;
      case 'pages_process':
        this.userOptions.push('Páginas Processadas')
        this.userOptionsToDB.push(choice);
        break;
      case 'doc_type':
        this.userOptions.push('Tipo de Documento')
        this.userOptionsToDB.push(choice);
        break;
      case 'user_id':
        this.userOptions.push('ID do Usuário')
        this.userOptionsToDB.push(choice);
        break;
      case 'doc_count':
        this.userOptions.push('Documentos processados')
        this.userOptionsToDB.push('doc_type');
        break;
      default:
        this.userOptionsToDB.push(choice)
        break;
    }

  }

  openChart() {
    //(en) Opens chart options
    this.showChartOptions = true;
  }

  //(en) Sets the chart chosen by the user.
  setChart(choice: string) {
    this.chartOption = choice;
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
  }

  ngOnInit(): void {
    this.fetchColumns();

    // Simulation: Retrieving user preferences from the database. 

    // if(this.cardProp === 'card01'){

    //   this.userOptions = ['Páginas Processadas','Segmento']

    //   this.userOptionsToDB = ['pages_process','segment']

    //   this.chartOption = 'pie';
    // }
  }


}
