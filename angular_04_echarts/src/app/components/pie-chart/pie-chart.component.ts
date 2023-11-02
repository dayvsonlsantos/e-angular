import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { ChartDataService } from 'src/app/services/chart-data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit {

  constructor(private chartDataService: ChartDataService) {}

  chartOption:number = 0;

  ngOnInit(): void {
    this.chartDataService.userOptions$.subscribe((userOptions) => {
      this.chartOption = userOptions.length - 1;      
      if(userOptions[this.chartOption] === 'pie'){
        console.log('Dados recebidos no BarChartComponent:', userOptions[this.chartOption]);
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
