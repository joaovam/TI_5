import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart-home-menu',
  templateUrl: './smart-home-menu.component.html',
  styleUrls: ['./smart-home-menu.component.css']
})
export class SmartHomeMenuComponent implements OnInit {

  constructor() { }

  _options = new Map();

  ngOnInit(): void {
    this._options.set('wb_incandescent', 'LÂMPADAS');
    this._options.set('ac_unit', 'AR CONDICIONADO');
    this._options.set('meeting_room', 'FECHADURAS');
    this._options.forEach((oi, tchau) => console.log(oi, tchau));
  }

}
