import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Device } from '../smart-home-components/device';

@Injectable({
  providedIn: 'root'
})
export class AcService {

  private devicesUrl: string = 'http://localhost:8000';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', '*');

  constructor(private httpClient: HttpClient) { }


  retrieveAll(): Observable<any> {
    return this.httpClient.get<any>(this.devicesUrl + '/ac', { 'headers': this.headers });
  }

  updateStatusAC(device : Device) : Observable<any>{
    device.status = !device.status;
    return this.sendUpdateRequest(device);
  }
  updateTemperatureAC(device : Device) : Observable<any>{
    return this.sendUpdateRequest(device);
  }

  sendUpdateRequest(device : Device) : Observable<any> {
    let body = JSON.stringify(device);
    console.log('body ' , body);    
    return this.httpClient.post<any>(this.devicesUrl + '/changeOptions', body,  { 'headers': this.headers });
  }

}
