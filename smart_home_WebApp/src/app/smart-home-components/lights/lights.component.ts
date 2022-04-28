import { Component, OnInit } from '@angular/core';
import { LightService } from 'src/app/service/light-service.service';
import { Device } from '../device';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {


  constructor(private lightService: LightService) { }

  lights: Device[] = [];
  ngOnInit(): void {

    this.retrieveAll();


  }

  makeLight(id: string, name: string, status: boolean, type: string, temperature: number | null) {
    let light = new Device();
    light.ID = id;
    light.name = name;
    light._status = status;
    light._temperature = 0;
    light.type_device = type;
    return light;
  }
  changeState(device: Device) {

    if (device.status == true)    
      device.status = false;
    else
      device.status = true;
    console.log("to aqui" + device.status);
  }

  retrieveAll(): void {
    this.lightService.retrieveAll().subscribe({
      next: lights => {

        this.lights = lights.Devices;
        console.log('liiiiights' ,this.lights)
       // console.log("lights " + lights[0] + lights[1])

      },
      error: err => console.log('Error', err)
    });

  }

  updateLight(light : Device): void {
    this.lightService.updateLight(light).subscribe({
      next: updated_light => {
        console.log(updated_light)        
        light = updated_light;
        console.log(light.status)

      },
      error: err => console.log('Error', err)
    });
    
  }

}
