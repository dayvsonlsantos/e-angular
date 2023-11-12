import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { Columns } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {

  // cardID -> (en) Receives the chart ID.
  // userOptions -> (en) Receives the options selected by the user
  // chartOption -> (en) Receives the chart chosen by the user
  // chartOption -> (en) Receives the chart chosen by the user

  @Input() cardID!: string;
  @Input() userOptions!: string[];
  @Input() userOptionsToDB!: string[];
  @Input() chartOption!: string;

  constructor(
    //(en) Retrieves data from the database.
    private dataService: DataService,
  ) { }

  //(en) Receives data from the database.
  dataColumns: Columns[] = [];

  //(en) Will receive the value of a user option.
  valueProperty: string = '';
  nameProperty: string = '';

  openChart(data: any[]) {
    //(en) Assigns the value coming from the dataService to the variable 'data'.
    data = data;

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
      name: item[this.nameProperty],
    }));

    //(en) Getting an HTML element from the DOM using the cardID (via this.cardID), ensuring it's not null.
    var chartDom = document.getElementById(this.cardID)!;

    //(en) Initializing an ECharts chart using the echarts instance.
    var myChart = echarts.init(chartDom);

    //(en) Configuring the options for an ECharts chart.
    var option = {
      title: {
        text: 'Relação entre: ' + this.userOptions.join(', '),
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#504A4C'
        },
        left: 'center', // Posição do título
        top: '2%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',

          //(en) Getting the values of the 'name' property from each object in the 'mappedData' array
          data: mappedData.map(item => item.name),
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            fontSize: 12, // Tamanho da fonte para o rótulo do eixo X
            inside: false,
            rotate: 45,
          },
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Total',
          type: 'bar',
          barWidth: '60%',
          label: {
            show: true,
            fontSize: 14, // Tamanho da fonte para as etiquetas da série
            position: 'insideTop' // Exibe o rótulo dentro da barra
          },
          itemStyle: {  // Defina a cor das barras aqui
            color: '#DB0185'  // Altere 'blue' para a cor desejada
          },

          //(en) Getting the values of the 'value' property from each object in the 'mappedData' array
          data: mappedData.map(item => item.value)
        }
      ]
    };

    //(en) Applying the specified chart configurations stored in the 'option' variable.
    myChart.setOption(option);

    window.addEventListener('resize', function () {
      myChart.resize();
    })
  }

  ngOnInit(): void {

    //(en) Checks if the selected option on the chart is the same.
    if (this.chartOption === 'bar') {

      this.dataService.getExtracts(this.userOptionsToDB).subscribe((dataColumns: string[]) => {
        this.openChart(dataColumns);
      });

    }
  }
}


