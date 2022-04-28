import { Component, OnInit } from '@angular/core';
import { AcService } from 'src/app/service/ac-service.service';
import { Device } from '../device';

@Component({
  selector: 'app-air-conditioner',
  templateUrl: './air-conditioner.component.html',
  styleUrls: ['./air-conditioner.component.css']
})
export class AirConditionerComponent implements OnInit {


  constructor(private acService: AcService) { }

  air_conditioners: Device[] = [];
  ngOnInit(): void {
    this.retrieveAll();
    //this.air_conditioners.push(this.makeAC('2', 'Ar Condicionado', false, 'AC', null));


  }

  makeAC(id: string, name: string, status: boolean, type: string, temperature: number | null) {
    let AC = new Device();
    AC.ID = id;
    AC.name = name;
    AC._status = status;
    AC._temperature = temperature;
    AC.type_device = type;
    return AC;
  }
  changeTemperature(device: Device, temperature: number) {
    device.temperature = temperature;
  }
  changeState(device: Device) {

    if (device._status == true)
      device._status = false;
    else
      device._status = true;
    console.log("to aqui");
  }
  print() {
    console.log(this.air_conditioners[0].temperature);
  }

  retrieveAll(): void {
    this.acService.retrieveAll().subscribe({
      next: air_conditioners => {

        this.air_conditioners = air_conditioners.Devices;
        console.log(air_conditioners)

      },
      error: err => console.log('Error', err)
    });

  }
  updateStatusAC(ac : Device): void {
    console.log("ar antigo ", ac)
    this.acService.updateStatusAC(ac).subscribe({
      next: updated_ac => {
        console.log( "updated" ,updated_ac)        
        ac = updated_ac;
        console.log(ac.status)

      },
      error: err => console.log('Error', err)
    });
    
  }
  updateTemperatureAC(ac : Device): void {
    console.log("ar antigo ", ac)
    this.acService.sendUpdateRequest(ac).subscribe({
      next: updated_ac => {
        console.log( "updated" ,updated_ac)        
        ac = updated_ac;
        console.log(ac.status)

      },
      error: err => console.log('Error', err)
    });
    
  }

}
