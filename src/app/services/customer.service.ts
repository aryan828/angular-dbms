import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SubmitOrder, Order} from '../modules/customer/customer.component';
import { saveAs } from 'file-saver';


export interface FoodItem {
  food_id: number;
  name: string;
  price: number;
  description?: string;
}

const baseUrl = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = baseUrl + 'fooditems/';

  constructor(private http: HttpClient) { }

  getMenu(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.apiUrl);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = baseUrl + 'orders/';
  apiUrl2 = baseUrl + 'payorder/';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  putOrder(order: SubmitOrder): Observable<SubmitOrder> {
    return this.http.post<SubmitOrder>(this.apiUrl, order);
  }

  markOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl2, order);
  }

  generatePdf(id: number): any {
    return this.http.post(baseUrl + 'getpdf/', id);
  }
}
