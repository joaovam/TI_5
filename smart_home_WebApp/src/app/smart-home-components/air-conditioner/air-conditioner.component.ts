import { Component, OnInit } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'app-air-conditioner',
  templateUrl: './air-conditioner.component.html',
  styleUrls: ['./air-conditioner.component.css']
})
export class AirConditionerComponent implements OnInit {


    constructor() { }
  
    air_conditioners : Device[] = [];  
    ngOnInit(): void {
      this.air_conditioners.push(this.makeAC('2', 'Ar Condicionado', false, 'AC', 20));
      
      
    }
  
    makeAC(id : string, name: string , status : boolean, type : string, temperature : number) {
      let AC  = new Device();
      AC.id = id;
      AC.name = name;
      AC._status = status;
      AC._temperature = temperature;
      AC.type = type;
      return AC;
    }
    changeTemperature(device:Device, temperature:number){
        device.temperature = temperature;
    }
    changeState(device:Device){
    
      if(device._status == true)
        device._status = false;
      else
        device._status = true;
      console.log("to aqui");
    }
    print(){
      console.log(this.air_conditioners[0].temperature);
    }

}
