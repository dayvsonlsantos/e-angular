import { Component } from '@angular/core';

@Component({
  selector: 'app-username-task',
  templateUrl: './username-task.component.html',
  styleUrls: ['./username-task.component.css']
})
export class UsernameTaskComponent {
  username:string = '';
  isDisabled:boolean = true;

  updateUsername(event: Event){
    this.username = (<HTMLInputElement>event.target).value;

    if (this.username !== '') {
      this.isDisabled = false;
    }
  }
  

  resetUsername(){
    this.username = '';
    this.isDisabled = true;
  }

  // Two way databiding

  username2:string = '';
  isDisabled2:boolean = true;

  updateUsername2(event: Event){

    this.username2 = (<HTMLInputElement>event.target).value;

    if (this.username2 !== '') {
      this.isDisabled2 = false;
    }
  }

  resetUsername2(){
    this.username2 = ''
    this.isDisabled2 = true;
  }

  // Simple Way
  username3 = ''
}
