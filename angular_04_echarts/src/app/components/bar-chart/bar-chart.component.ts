import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { Data } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';
import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: '[app-bar-chart]',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  // @Input() userChoice: string[] = [];

  constructor(
    private chartDataService: ChartDataService,
    private dataService: DataService,
  ) { }

  chartOption: number = 0;
  data: Data[] = [];

  ngOnInit(): void {
    this.chartDataService.userOptions$.subscribe((userOptions) => {

      // Chart chose by user
      this.chartOption = userOptions.length - 1;


      if (userOptions[this.chartOption] === 'bar') {


        this.dataService.getAll().subscribe((data: Data[]) => {
          this.data = data;
          console.log(this.data);

          // Mapear os valores do seu array de objetos para o formato esperado pelo ECharts
          const mappedData = this.data.map(item => ({
            value: item.quant,
            name: item.doc_type
          }));

          type EChartsOption = echarts.EChartsOption;

          var chartDom = document.getElementById('barChart')!;
          var myChart = echarts.init(chartDom);
          var option: EChartsOption;

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
                data: mappedData.map(item => item.value)
              }
            ]
          };

          option && myChart.setOption(option);

        }
        )


      }


    });
  }
}


