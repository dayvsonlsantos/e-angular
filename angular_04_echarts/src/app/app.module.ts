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


@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    PieChartComponent,
    Chart01Component,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
