import { Component, Output, EventEmitter } from '@angular/core';

// Output -> Enviar algo
// EventEmitter -> Como é um evento, precisa desse, se fosse 
//apenas o dado, não precisaria


@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.css']
})
export class ChangeNumberComponent {

  @Output() changeNumber: EventEmitter<any> = new EventEmitter()

  handleClick(){
    this.changeNumber.emit()
  }

}
