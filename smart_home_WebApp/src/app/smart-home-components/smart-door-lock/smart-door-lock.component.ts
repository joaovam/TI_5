import { Component, OnInit } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'app-smart-door-lock',
  templateUrl: './smart-door-lock.component.html',
  styleUrls: ['./smart-door-lock.component.css']
})
export class SmartDoorLockComponent implements OnInit {

  constructor() { }

  smartDoor: Device[] = [];
  ngOnInit(): void {

    this.smartDoor.push(this.makeSmartDoor('0', 'porta 1', false, 'Tranca', 0));
    this.smartDoor.push(this.makeSmartDoor('1', 'porta 2', true, 'Tranca', 0));


  }

  makeSmartDoor(id: string, name: string, status: boolean, type: string, temperature: number) {
    let smartDoorLock = new Device();
    smartDoorLock.id = id;
    smartDoorLock.name = name;
    smartDoorLock._status = status;
    smartDoorLock._temperature = 0;
    smartDoorLock.type = type;
    return smartDoorLock;
  }
  changeState(device: Device) {

    if (device._status == true)
      device._status = false;
    else
      device._status = true;
  }

}
