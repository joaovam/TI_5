

export class Device{

    _status: boolean = true;
    _name: string = "";
    _id: string = "";
    _temperature: number = 0;
    _type: string = ""; 

    set name(name : string){
        this._name = name;
    }
    set id(id : string){
        this._id = id;
    }
    set temperature(temperature : number){
        this._temperature = temperature;
    }
    set type(type : string){
        this._type = type;
    }

    get  type(){
        return this._type;
    }

    get  temperature(){
        return this._temperature;
    }

    get  id(){
        return this._id;
    }
    get name(){
        return this._name;
    }


}