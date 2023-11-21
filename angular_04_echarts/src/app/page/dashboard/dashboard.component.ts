import { Component, Input } from '@angular/core';
import { UserOptions } from 'src/app/interfaces/user-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  card01 = 'dashboard-01'
  card02 = 'dashboard-02'
  card03 = 'dashboard-03'
  card04 = 'dashboard-04'
  card05 = 'dashboard-05'
  card06 = 'dashboard-06'
  card07 = 'dashboard-07'
  card08 = 'dashboard-08'

  getCurrentDate = new Date();

  currentDate = this.getCurrentDate.toISOString().slice(0, 10);

  dashboard01Data: UserOptions = {
    cardValueID: 'dashboard-01',
    chartType: 'uniqueValue',
    selectedOptions: ['only_doc_count'],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  dashboard02Data: UserOptions = {
    cardValueID: 'dashboard-02',
    chartType: 'uniqueValue',
    selectedOptions: ['only_pages_process'],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: 'sum',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  dashboard03Data: UserOptions = {
    cardValueID: 'dashboard-03',
    chartType: 'uniqueValue',
    selectedOptions: ['segment_most_analyzed_pages'],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: 'sum',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  dashboard04Data: UserOptions = {
    cardValueID: 'dashboard-04',
    chartType: 'bar',
    selectedOptions: ['doc_type', 'doc_count'],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  dashboard05Data: UserOptions = {
    cardValueID: 'dashboard-05',
    chartType: 'bar',
    selectedOptions: ['doc_type', 'doc_count'],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  dashboard06Data: UserOptions = {
    cardValueID: 'dashboard-06',
    chartType: 'horizontal-bar',
    selectedOptions: ['doc_type', 'pages_process'],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: 'sum',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  dashboard07Data: UserOptions = {
    cardValueID: 'dashboard-07',
    chartType: 'pie',
    selectedOptions: ['segment', 'pages_process'],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: 'sum',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }
}
