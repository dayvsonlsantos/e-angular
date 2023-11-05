import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { Extracts, Users } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {

  // cardProp -> (en) Receives the chart ID.
  // userOptions -> (en) Receives the options selected by the user
  // chartOption -> (en) Receives the chart chosen by the user

  @Input() cardProp!: string;
  @Input() userOptions!: string[];
  @Input() chartOption!: string;
  @Input() tableOption!: string;

  constructor(
    //(en) Retrieves data from the database.
    private dataService: DataService,
  ) { }

  //(en) Receives data from the database.
  dataExtracts: Extracts[] = [];
  dataUsers: Users[] = [];

  //(en) Will receive the value of a user option.
  valueProperty: string = '';
  nameProperty: string = '';

  teste(data: any[]) {
    //(en) Assigns the value coming from the dataService to the variable 'data'.
    data = data;

    // (en) Checks the possible user options and redirects to the correct assignment.
    this.userOptions.forEach((item: string) => {
      if (item === 'quant') {
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

    //(en) Creating an alias (an alternative name) for the echarts.EChartsOption type.
    type EChartsOption = echarts.EChartsOption;

    //(en) Getting an HTML element from the DOM using the cardID (via this.cardProp), ensuring it's not null.
    var chartDom = document.getElementById(this.cardProp)!;

    //(en) Initializing an ECharts chart using the echarts instance.
    var myChart = echarts.init(chartDom);

    //(en) Creating a variable of type EChartsOption.
    var option: EChartsOption;

    //(en) Configuring the options for an ECharts chart.
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
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
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',

          //(en) Getting the values of the 'value' property from each object in the 'mappedData' array
          data: mappedData.map(item => item.value)
        }
      ]
    };

    //(en) Applying the specified chart configurations stored in the 'option' variable.
    option && myChart.setOption(option);
  }

  ngOnInit(): void {

    //(en) Checks if the selected option on the chart is the same.
    if (this.chartOption === 'bar') {

      if (this.tableOption === 'extracts') {
        this.dataService.getAllExtracts().subscribe((dataExtracts: Extracts[]) => {
          console.log(dataExtracts)
          this.teste(dataExtracts);
        });
      }
      if (this.tableOption === 'users') {
        this.dataService.getAllUsers().subscribe((dataUsers: Users[]) => {
          console.log(dataUsers)
          this.teste(dataUsers);
        });
      }

    }
  }
}


