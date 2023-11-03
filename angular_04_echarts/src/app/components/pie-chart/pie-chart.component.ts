import { DataService } from 'src/app/services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { ChartDataService } from 'src/app/services/chart-data.service';
import { Data } from 'src/app/models/data.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit {

  constructor(
    private chartDataService: ChartDataService,
    private dataService: DataService,
  ) { }

  chartOption: number = 0;
  data: Data[] = [];
  dataUserOptions: string[] = [];
  valueProperty: string = '';
  nameProperty: string = '';

  ngOnInit(): void {
    this.chartDataService.userOptions$.subscribe((userOptions) => {

      // Chart chose by user
      this.chartOption = userOptions.length - 1;

      // Remove o último item do array userOptions e atribui a this.dataUserOptions
      this.dataUserOptions = userOptions.slice(0, -1);
      console.log(this.dataUserOptions);
      

      if (userOptions[this.chartOption] === 'pie') {

        this.dataService.getAll().subscribe((data: Data[]) => {
          this.data = data;

          this.dataUserOptions.forEach((item: string) => {
            if (item === 'quant') {
              this.valueProperty = item;
            } else {
              this.nameProperty = item;
            }
          });

          console.log(this.valueProperty);
          console.log(this.nameProperty);
          
          // Mapear os valores do seu array de objetos para o formato esperado pelo ECharts
          const mappedData = this.data.map(item => ({
            value: item[this.valueProperty],
            name: item[this.nameProperty]
          }));

          type EChartsOption = echarts.EChartsOption;

          var chartDom = document.getElementById('pieChart')!;
          var myChart = echarts.init(chartDom);
          var option: EChartsOption;

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
                data: mappedData
              }
            ]
          };

          option && myChart.setOption(option);


        })


      }
    });
  }

  // ngOnInit(): void {
  //   type EChartsOption = echarts.EChartsOption;

  //   var chartDom = document.getElementById('pieChart')!;
  //   var myChart = echarts.init(chartDom);
  //   var option: EChartsOption;

  //   option = {
  //     tooltip: {
  //       trigger: 'item'
  //     },
  //     legend: {
  //       top: '5%',
  //       left: 'center'
  //     },
  //     series: [
  //       {
  //         name: 'Access From',
  //         type: 'pie',
  //         radius: ['40%', '70%'],
  //         avoidLabelOverlap: false,
  //         itemStyle: {
  //           borderRadius: 10,
  //           borderColor: '#fff',
  //           borderWidth: 2
  //         },
  //         label: {
  //           show: false,
  //           position: 'center'
  //         },
  //         emphasis: {
  //           label: {
  //             show: true,
  //             fontSize: 40,
  //             fontWeight: 'bold'
  //           }
  //         },
  //         labelLine: {
  //           show: false
  //         },
  //         data: [
  //           { value: 1048, name: 'Search Engine' },
  //           { value: 735, name: 'Direct' },
  //           { value: 580, name: 'Email' },
  //           { value: 484, name: 'Union Ads' },
  //           { value: 300, name: 'Video Ads' }
  //         ]
  //       }
  //     ]
  //   };

  //   option && myChart.setOption(option);
  // }

}
