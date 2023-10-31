import { Component } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  showPass:boolean = false;

  values:number[] = [
    1,
    2,
    3,
    4
  ]

  value:number = this.values.length;

  showPassword(){
    this.showPass = !this.showPass
    this.value++
    return this.values.push(this.value)
  }

}
