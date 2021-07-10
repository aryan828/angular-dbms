import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataRequest} from '../modules/dashboard/dashboard.component';


export interface G1Data {
  month: string;
  expense: number;
  income: number;
}

export interface G2Data {
  cat: string;
  sum: number;
}

const baseUrl = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl = baseUrl + 'bs/';
  apiUrl2 = baseUrl + 'es/';

  constructor(private http: HttpClient) { }

  getData1(dat: DataRequest): Observable<G1Data[]> {
    return this.http.post<G1Data[]>(this.apiUrl, dat);
  }

  getData2(dat: DataRequest): Observable<G2Data[]> {
    return this.http.post<G2Data[]>(this.apiUrl2, dat);
  }

  getAvg(): Observable<number> {
    return this.http.get<number>(baseUrl + 'avg/');
  }

  getPD(): Observable<string> {
    return this.http.get<string>(baseUrl + 'pd/');
  }

  getTC(): Observable<number> {
    return this.http.get<number>(baseUrl + 'tcus/');
  }

  fetchGraphData(dat: DataRequest): any {
    return this.http.post(baseUrl + 'fetchdata/', dat);
  }
}
