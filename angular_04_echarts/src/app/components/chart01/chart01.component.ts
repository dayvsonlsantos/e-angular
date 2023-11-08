import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

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

  tableSelected: string = '';

  tableData: string[] = [];

  columnsOption: string[] = [];

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
        this.userOptions.push('Nome')
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

    // if (choice == 'Documentos'){
    //   //(en) Adds the option to the userOptionsToDB array
    //   this.userOptionsToDB.push('doc_type')
    // }
    // if (choice == 'Documentos processados'){
    //   this.userOptionsToDB.push('doc_type')
    // }

    //(en) Adds the option to the userOptions array

  }

  openChart() {
    //(en) Opens chart options
    this.showChartOptions = true;
  }

  //(en) Sets the chart chosen by the user.
  setChart(choice: string) {
    this.chartOption = choice;
  }

  fetchTables() {
    this.dataService.getTables()
      .subscribe(data => {
        this.tableData = data.map(item => item.table_name);
        console.log(this.tableData); // Verifique os dados aqui
      });
  }

  selectTableAndShowColumn(table: string) {
    this.tableSelected = table;
    this.fetchColumns()
  }

  fetchColumns() {
    if (this.tableSelected) {
      this.dataService.getColumns(this.tableSelected)
        .subscribe(data => {
          this.columnsOption = data.map(item => item.column_name);
          this.columnsOption.push('doc_count')
        });
    }
  }

  ngOnInit(): void {
    this.fetchTables();
    // console.log(this.tableData); // Isso será executado antes dos dados serem carregados
  }


}
