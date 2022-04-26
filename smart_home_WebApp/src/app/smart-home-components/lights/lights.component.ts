import { Component, OnInit } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {

  constructor() { }

  lights : Device[] = [];  
  ngOnInit(): void {

    this.lights.push(this.makeLight('0', 'luz 1', false, 'luz', 0));
    this.lights.push(this.makeLight('0', 'luz 2', true, 'luz', 0));
    
    
  }

  makeLight(id : string, name: string , status : boolean, type : string, temperature : number) {
    let light  = new Device();
    light.id = id;
    light.name = name;
    light._status = status;
    light._temperature = 0;
    light.type = type;
    return light;
  }
  changeState(device:Device){
    
    if(device._status == true)
      device._status = false;
    else
      device._status = true;
    console.log("to aqui");
  }
  
}
