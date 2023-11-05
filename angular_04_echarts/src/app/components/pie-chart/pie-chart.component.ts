import { Extracts, Users } from './../../models/data.model';
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
      if (item === 'Documentos processados') {
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
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },

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

      if (this.tableOption === 'extracts') {
        // this.dataService.getAllExtracts().subscribe((dataExtracts: Extracts[]) => {
        //   console.log('oiee')
        //   console.log(dataExtracts)
        //   this.teste(dataExtracts);
        // });
        this.dataService.getExtracts(this.userOptionsToDB).subscribe((dataExtracts: Extracts[]) => {
          console.log(dataExtracts)
          this.teste(dataExtracts);
        });
      }
      if (this.tableOption === 'users') {
        this.dataService.getAllUsers().subscribe((dataUsers: Users[]) => {
          console.log('oiee')
          console.log(dataUsers)
          this.teste(dataUsers);
        });
      }

    }
  }
}
