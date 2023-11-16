import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { Chart01Component } from './components/select-chart/select-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/page/dashboard/dashboard.component';
import { FavoriteComponent } from './components/page/favorite/favorite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { EmptyChartComponent } from './components/empty-chart/empty-chart.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    PieChartComponent,
    Chart01Component,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    FavoriteComponent,
    EmptyChartComponent,
    LoadingComponent,
    LineChartComponent,
    AreaChartComponent,
    ScatterChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
