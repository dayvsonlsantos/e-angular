import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; //Needed to use two-way-databinding

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {

  serverId: number = 10;
  serverStatus: string = "Online"

  getServerStatus(): string{
    return this.serverStatus;
  }

  allowNewServer:boolean = false;

  constructor(){
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }

  changeState(){
    this.allowNewServer = !this.allowNewServer
  }

  ServerName = ''
  newServerName = ''
  Server = ''
  count = 0

  onUpdateServerName(event: Event){
    this.newServerName = (<HTMLInputElement>event.target).value;
    
  }

  AddServer(){
    this.Server = ''
    return this.Server = 'Your Server ' + this.Server + ' was created successfully!';
  }

}
