import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../model/Sale';
import { Product } from '../model/Product';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private saleUrl = 'http://localhost:8081/sales/createSale';
  private searchProductUrl = 'http://localhost:8081/products/searchProduct/';
  private searchClientUrl = 'http://localhost:8081/clients/searchClient/';
  private createClientUrl = 'http://localhost:8081/client/createClient';

  constructor(private http: HttpClient) {}

  createSale(sale: Sale): Observable<Blob> {
    return this.http.post(this.saleUrl, sale, { responseType: 'blob' });
  }

  searchProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.searchProductUrl}${name}`);
  }

  searchClientsByName(name: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.searchClientUrl}${name}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.createClientUrl, client);
  }
}
