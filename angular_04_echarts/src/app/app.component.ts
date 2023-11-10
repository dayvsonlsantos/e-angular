import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_04_echarts';

  menuOptionValue: string = 'favorite';

  receivesMenuOption(value: string){
    this.menuOptionValue = value;
  }

  profile_picture = '../assets/profilePicture.png';
  username = 'Fulano';
  profileType = 'Admin';

  card01 = 'card01'
  card02 = 'card02'
  card03 = 'card03'
}
