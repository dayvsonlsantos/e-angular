import { Columns, Extracts, Users } from './../../models/data.model';
import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit {

  // cardProp -> (en) Receives the chart ID.
  // userOptions -> (en) Receives the options selected by the user
  // chartOption -> (en) Receives the chart chosen by the user

  @Input() cardProp!: string;
  @Input() userOptions!: string[];
  @Input() userOptionsToDB!: string[];
  @Input() chartOption!: string;
  @Input() tableOption!: string;

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

    //(en) Creating an alias (an alternative name) for the echarts.EChartsOption type.
    type EChartsOption = echarts.EChartsOption;

    //(en) Getting an HTML element from the DOM using the cardID (via this.cardProp), ensuring it's not null.
    var chartDom = document.getElementById(this.cardProp)!;

    //(en) Initializing an ECharts chart using the echarts instance.
    var myChart = echarts.init(chartDom);

    //(en) Creating a variable of type EChartsOption.
    var option: EChartsOption;

    //(en) Listing the possible colors for the chart.
    const colors = [
      '#DB0185', '#BD0067', '#8C00D8', '#5c1c7c', '#350020', '#504A4C',
      '#FF00A5', '#9F0049', '#7900E4', '#8A2BE2', '#9e2984', '#A38474',
      '#f9a5ff', '#81002B', '#9E33E7', '#4B0082', '#4B0082',
      '#f463ff', '#63000D', '#FF67FF', '#483D8B', '#800080',
      '#ee00ff', '#A600C0', '#D899EC', '#8B008B', '#6e007a',
    ];

    //(en) Configuring the options for an ECharts chart.
    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: this.valueProperty,
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            formatter: '{b}\n\n{d}% de ' + totalSum, // {b} representa o nome, {d} representa a porcentagem
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'normal'
            }
          },
          labelLine: {
            show: true
          },
          color: colors,

          //(en) Getting the values of the properties (value and name) present in the 'mappedData' array.
          data: mappedData
        }
      ]
    };

    //(en) Applying the specified chart configurations stored in the 'option' variable.
    option && myChart.setOption(option);

  }


  ngOnInit(): void {

    //(en) Checks if the selected option on the chart is the same.
    if (this.chartOption === 'pie') {

      this.dataService.getExtracts(this.userOptionsToDB).subscribe((dataColumns: string[]) => {
        console.log(dataColumns)
        this.openChart(dataColumns);
      });

    }
  }
}
