import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private apiUrl = 'http://localhost:8081/quotations/createQuotation'; // Endpoint para crear cotización
  private searchProductUrl = 'http://localhost:8081/products/searchProduct'; // Endpoint para buscar productos

  constructor(private http: HttpClient) {}

  createQuotation(selectedProducts: any[]): Observable<Blob> {
    return this.http.post(this.apiUrl, selectedProducts, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' // Especifica que la respuesta es un archivo Blob
    });
  }

  searchProductsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.searchProductUrl}/${name}`);
  }
}
