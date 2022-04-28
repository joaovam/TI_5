import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocksService {

  private locksUrl = 'http://localhost:8000/locks';

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', '*');

  constructor(private httpClient: HttpClient) { }

  retrieveAll(): Observable<any> {
    return this.httpClient.get<any>(this.locksUrl, { 'headers': this.headers });

  }


}
