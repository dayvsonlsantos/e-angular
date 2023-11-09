import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_04_echarts';

  profile_picture = '../assets/profilePicture.png';
  username = 'Fulano';
  profileType = 'Admin';

  card01ID = 'card01'
  card02ID = 'card02'
  card03ID = 'card03'
}
