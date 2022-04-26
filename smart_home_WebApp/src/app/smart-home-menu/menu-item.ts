export class MenuItem {
    _name: string = '';
    _icon: string = ''; 
    _routerLink: string = ''; 
     set name(name : string){
        this._name = name;
    }
    set icon(icon : string){
        this._icon = icon;
    }
    set routerLink(routerLink : string){
        this._routerLink = routerLink;
    }
    get  routerLink(){
        return this._routerLink;
    }
    get  name(){
        return this._name;
    }
    get icon(){
        return this._icon;
    }
    
}