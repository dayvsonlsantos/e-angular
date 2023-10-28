import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-if-render',
  templateUrl: './if-render.component.html',
  styleUrls: ['./if-render.component.css']
})

export class IfRenderComponent {

  canShow: boolean = false;
  
  onCardClick(e: Event): void {
    e.preventDefault();
    this.canShow = !this.canShow;
  }

  @Input() name:string = ''

}
