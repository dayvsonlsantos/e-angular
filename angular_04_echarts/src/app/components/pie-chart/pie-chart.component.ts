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

  // cardID -> (en) Receives the chart ID.
  // userOptions -> (en) Receives the options selected by the user
  // userOptions -> (en) Receives the options selected by the user to send to the Database (Using the column names from the database).
  // chartOption -> (en) Receives the chart chosen by the user

  @Input() cardID!: string;
  @Input() userOptions!: string[];
  @Input() userOptionsToDB!: string[];
  @Input() chartOption!: string;
  @Input() filterData!: string[];

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
    console.log('oie'+data.length)

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

    //(en) Listing the possible colors for the chart.
    const colors = [
      '#DB0185', '#BD0067', '#8C00D8', '#5c1c7c', '#350020', '#504A4C',
      '#FF00A5', '#9F0049', '#7900E4', '#8A2BE2', '#9e2984', '#A38474',
      '#f9a5ff', '#81002B', '#9E33E7', '#4B0082', '#4B0082',
      '#f463ff', '#63000D', '#FF67FF', '#483D8B', '#800080',
      '#ee00ff', '#A600C0', '#D899EC', '#8B008B', '#6e007a',
    ];

    //(en) Configuring the options for an ECharts chart.
    var option = {
      title: {
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#504A4C'
        },
        left: 'center', // Posição do título
        top: '2%',
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '8%',
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
    if (this.chartOption === 'pie') {

      try {
        this.dataService.getExtracts(this.userOptionsToDB, this.filterData).subscribe((dataColumns: string[]) => {
          this.openChart(dataColumns);
        });
      } catch {
        this.chartOption = 'loading'
      }

    }
  }
}
