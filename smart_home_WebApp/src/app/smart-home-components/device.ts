

export class Device {

    _status: boolean = true;
    _name: string = "";
    _ID: string = "";
    _temperature: number | null = 0;
    _type_device: string = "";

    set name(name: string) {
        this._name = name;
    }
    set ID(id: string) {
        this._ID = id;
    }
    set temperature(temperature: number | null) {
        this._temperature = temperature;
    }
    set type_device(type: string) {
        this._type_device = type;
    }

    set status(type: string) {
        this._type_device = type;
    }

    get status() {
        return this._type_device;
    }
    get type_device() {
        return this._type_device;
    }

    get temperature() {
        return this._temperature;
    }

    get ID() {
        return this._ID;
    }
    get name() {
        return this._name;
    }


}