import { Component } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  showPass:boolean = false;
  showPass2: boolean = false;

  values:number[] = [
    1,
    2,
    3,
    4
  ]

  timestamp:Date[] = [

  ]

  value:number = this.values.length;

  showPassword(){
    this.showPass = !this.showPass
    this.value++
    return this.values.push(this.value)
  }

  showPassword2(){
    this.showPass = !this.showPass
    return this.timestamp.push(new Date())
  }

}
