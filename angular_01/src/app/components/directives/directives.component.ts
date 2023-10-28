import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent {

  size = 40;
  font = 'Arial';
  color = 'red';

  classes = ["green-title", 'small-title']
  // Posso adicionar os efeitos da classe, no arquivo css

}
