import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Supplier, NewItem, Item, Bill} from '../modules/inventory/inventory.component';


export interface AllSuppliers {
  sup_id: number;
  supplier_name: string;
  mobile: number;
  email?: string;
  website?: string;
  address?: string;
}

const baseUrl = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  apiUrl = baseUrl + 'supplier/';

  constructor(private http: HttpClient) { }

  putSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, supplier);
  }

  getSuppliers(): Observable<AllSuppliers[]> {
    return this.http.get<AllSuppliers[]>(this.apiUrl);
  }
}

@Injectable({
  providedIn: 'root'
})
export class NewItemService {
  apiUrl = baseUrl + 'inventoryitems/';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  putNewItem(item: NewItem): Observable<NewItem> {
    return this.http.post<NewItem>(this.apiUrl, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.post<Item>(baseUrl + 'upit/', item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class BillService {
  apiUrl = baseUrl + 'bill/';

  constructor(private http: HttpClient) { }

  putBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill);
  }
}
