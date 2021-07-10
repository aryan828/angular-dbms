import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NewStaff, Staff} from '../modules/staff/staff.component';
import {SubmitOrder} from '../modules/customer/customer.component';

const baseUrl = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  apiUrl = baseUrl + 'getStaff/';
  apiUrl2 = baseUrl + 'staff/';
  apiUrl3 = baseUrl + 'payStaff/';

  constructor(private http: HttpClient) { }
  putStaff(staff: NewStaff): Observable<NewStaff> {
    return this.http.post<NewStaff>(this.apiUrl2, staff);
  }

  getStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl);
  }

  putAbsentees(staffs: Staff[]): Observable<Staff[]> {
    return this.http.post<Staff[]>(this.apiUrl, staffs);
  }

  payStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.apiUrl3, staff);
  }
}
