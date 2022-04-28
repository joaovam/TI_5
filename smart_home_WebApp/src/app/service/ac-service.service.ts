import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Device } from '../smart-home-components/device';

@Injectable({
  providedIn: 'root'
})
export class AcService {

  private acUrl: string = 'http://localhost:8000/ac';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', '*');

  constructor(private httpClient: HttpClient) { }


  retrieveAll(): Observable<any> {
    return this.httpClient.get<any>(this.acUrl, { 'headers': this.headers });
  }

}
