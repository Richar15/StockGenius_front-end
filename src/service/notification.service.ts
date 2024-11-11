import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8081/products'; 

  constructor(private http: HttpClient) {}

  getLowStockProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/low-stock`);
  }
}
