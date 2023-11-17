import { Columns, Extracts, Users } from './../../models/data.model';
import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  // cardID -> (en) Receives the chart ID.
  // userOptions -> (en) Receives the options selected by the user
  // userOptions -> (en) Receives the options selected by the user to send to the Database (Using the column names from the database).
  // chartOption -> (en) Receives the chart chosen by the user

  @Input() cardID!: string;
  @Input() userOptions!: string[];
  @Input() userOptionsToDB!: string[];
  @Input() chartOption!: string;
  @Input() filterDate!: string[];
  @Input() filterUserOptions!: string[];

  constructor(
    //(en) Retrieves data from the database.
    private dataService: DataService,
  ) { }

  //(en) Receives data from the database.
  dataColumns: Columns[] = [];

  //(en) Will receive the value of a user option.
  valueProperty: string = '';
  nameProperty: string = '';

  //(en) Display the chart title.
  showChartTitle: string = ''

  //(en) Determines whether the filtered chart has data or not.
  isDataUsingFilter: boolean = true;

  openChart(data: any[]) {
    //(en) Assigns the value coming from the dataService to the variable 'data'.
    data = data;

    console.log(data)
    console.log('oie' + data.length)

    console.log(this.userOptions)

    //(en) Checks if the values returned from the data are equal to 0, with isDataUsingFilter set to false.
    if (data.length === 0) {
      this.isDataUsingFilter = false;
    } else {
      this.isDataUsingFilter = true;
    }

    // (en) Checks the possible user options and redirects to the correct assignment.
    this.userOptions.forEach((item: string) => {
      if (item === 'Documentos processados' || item === 'Páginas Processadas') {
        this.valueProperty = item;
      } else {
        this.nameProperty = item;
      }
    });

    //(en) Map the values from your array of objects to the format expected by ECharts.
    const mappedData = data.map(item => ({
      value: item[this.valueProperty],
      name: item[this.nameProperty]
    }));

    //(en) Calculate the total sum of values from the data array.
    const totalSum = data.reduce((acc, item) => {
      const itemValue = parseInt(item[this.valueProperty]);
      if (!isNaN(itemValue)) {
        return acc + itemValue;
      } else {
        return acc;
      }
    }, 0);

    //(en) Getting an HTML element from the DOM using the cardID (via this.cardID), ensuring it's not null.
    var chartDom = document.getElementById(this.cardID)!;

    //(en) Initializing an ECharts chart using the echarts instance.
    var myChart = echarts.init(chartDom);

    //(en) Configuring the options for an ECharts chart.
    var option = {
      xAxis: {
        type: 'category',
        data: mappedData.map(item => item.name),
        axisLabel: {
          fontSize: 12, // Tamanho da fonte para o rótulo do eixo X
          inside: false,
          rotate: 45,
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: mappedData.map(item => item.value),
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#DB0185'
          },
          itemStyle: {  // Defina a cor das barras aqui
            color: '#DB0185'  // Altere 'blue' para a cor desejada
          },
          label: {
            show: true,  // Exibe os valores nos pontos
            position: 'top'  // Posição dos valores (pode ser 'top', 'bottom', 'inside', etc.)
          },
        }
      ]
    };


    //(en) Applying the specified chart configurations stored in the 'option' variable.
    myChart.setOption(option);

    //(en) If there is a value in 'isDataUsingFilter', showChartTitle will receive the title.
    if (this.isDataUsingFilter) {
      this.showChartTitle = 'Relação entre: ' + this.userOptions.join(', ');
    } //(en) Otherwise, it won't have a value and will remain empty.

    window.addEventListener('resize', function () {
      myChart.resize();
    })

  }


  ngOnInit(): void {

    //(en) Checks if the selected option on the chart is the same.
    if (this.chartOption === 'line') {

      try {
        this.dataService.getExtracts(this.userOptionsToDB, this.filterDate, this.filterUserOptions).subscribe((dataColumns: string[]) => {
          this.openChart(dataColumns);
        });
      } catch {
        this.chartOption = 'loading'
      }

    }
  }
}
