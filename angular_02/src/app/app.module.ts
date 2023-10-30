import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WarningAlertComponent } from './components/warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './components/success-alert/success-alert.component';
import { ServerComponent } from './components/server/server.component';
import { FormsModule } from '@angular/forms';
import { UsernameTaskComponent } from './components/username-task/username-task.component'; //Needed to use two-way-databinding

@NgModule({
  declarations: [
    AppComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    ServerComponent,
    UsernameTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
