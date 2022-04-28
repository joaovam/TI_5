import { Component, OnInit } from '@angular/core';
import { LocksService } from 'src/app/service/locks.service';
import { Device } from '../device';

@Component({
  selector: 'app-smart-door-lock',
  templateUrl: './smart-door-lock.component.html',
  styleUrls: ['./smart-door-lock.component.css']
})
export class SmartDoorLockComponent implements OnInit {

  constructor(private locksService: LocksService) { }

  smartDoor: Device[] = [];
  ngOnInit(): void {

    this.retrieveAll();
    //this.smartDoor.push(this.makeSmartDoor('0', 'porta 1', false, 'Tranca', 0));
    //this.smartDoor.push(this.makeSmartDoor('1', 'porta 2', true, 'Tranca', 0));


  }

  makeSmartDoor(id: string, name: string, status: boolean, type: string, temperature: number) {
    let smartDoorLock = new Device();
    smartDoorLock.ID = id;
    smartDoorLock.name = name;
    smartDoorLock._status = status;
    smartDoorLock._temperature = 0;
    smartDoorLock.type_device = type;
    return smartDoorLock;
  }
  changeState(device: Device) {

    if (device._status == true)
      device._status = false;
    else
      device._status = true;
  }

  retrieveAll(): void {
    this.locksService.retrieveAll().subscribe({
      next: smartDoor => {
        this.smartDoor = smartDoor.Devices;
        console.log(smartDoor);

      },
      error: err => console.log('Error', err)
    });

  }

  updateLock(lock : Device): void {
    this.locksService.updateLocks(lock).subscribe({
      next: updated_lock => {
        console.log(updated_lock)        
        lock = updated_lock;
        console.log(lock.status)

      },
      error: err => console.log('Error', err)
    });
    
  }

}
