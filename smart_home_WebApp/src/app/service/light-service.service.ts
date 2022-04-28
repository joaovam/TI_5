import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Device } from '../smart-home-components/device';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  private devicesUrl: string = 'http://localhost:8000';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', '*');

  constructor(private httpClient: HttpClient) { }


  retrieveAll(): Observable<any> {
    return this.httpClient.get<any>(this.devicesUrl + '/lights', { 'headers': this.headers });
  }
  updateLight(device : Device) : Observable<any>{
    return this.httpClient.post<any>(this.devicesUrl + '/changeOptions', device,  { 'headers': this.headers });
  }
}