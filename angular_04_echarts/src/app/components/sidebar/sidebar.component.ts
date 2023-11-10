import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() menuOption = new EventEmitter<string>();
  menuOptionValue:string = 'favorite'

  sendMenuOption(value: string){
    this.menuOption.emit(value);
    this.menuOptionValue = value;
  }
}
