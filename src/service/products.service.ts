import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:8081/products';

  constructor(private http: HttpClient) {}

  searchProductByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}searchProduct/${name}`);
  }
}
