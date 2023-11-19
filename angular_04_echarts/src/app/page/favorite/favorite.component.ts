import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  //(en) Receives the IDs for each chart.
  @Input() card01!: string;
  @Input() card02!: string;
  @Input() card03!: string;
  @Input() card04!: string;
  @Input() card05!: string;
  @Input() card06!: string;
  @Input() card07!: string;
  @Input() card08!: string;

}
