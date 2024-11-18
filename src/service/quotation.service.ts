import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private apiUrl = 'http://localhost:8081/quotations/createQuotation'; // Endpoint para crear cotización
  private searchProductUrl = 'http://localhost:8081/products/searchProduct'; // Endpoint para buscar productos
  private searchClient = 'http://localhost:8081/clients/searchClient'; // Endpoint para buscar clientes

  constructor(private http: HttpClient) {}

  reateQuotation(quotationData: { clientName: string, selectedProducts: { name: string, amount: number }[] }): Observable<Blob> {
    return this.http.post(this.apiUrl, quotationData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' // Indica que la respuesta es un Blob (PDF)
    });
  }

  searchProductsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.searchProductUrl}/${name}`);
  }

  searchClientsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.searchClient}/${name}`);
  }
}
