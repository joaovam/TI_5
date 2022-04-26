import { Component, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-smart-home-menu',
  templateUrl: './smart-home-menu.component.html',
  styleUrls: ['./smart-home-menu.component.css']
})
export class SmartHomeMenuComponent implements OnInit {

  constructor() { }

  _items: MenuItem[] = [];

  ngOnInit(): void {

    this.makeMenuItem('LÂMPADAS', 'wb_incandescent', '/smartHome/lights');
    this.makeMenuItem('AR CONDICIONADO', 'ac_unit', '/smartHome/ac');
    this.makeMenuItem('FECHADURAS', 'meeting_room', '/smartHome/smartLock');


  }

  makeMenuItem(name: string, icon: string, routerLink: string) {
    let menu_items = new MenuItem();
    menu_items.name = name;
    menu_items._icon = icon;
    menu_items._routerLink = routerLink;
    this._items.push(menu_items);
  }

}
