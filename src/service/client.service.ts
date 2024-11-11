import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { ClientEntity } from '../components/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getClientById(id: number): Observable<ClientEntity> {
    // Añadimos log para verificar la URL exacta
    console.log(`Requesting client at: ${this.baseUrl}/clients/findById/${id}`);
    
    return this.http.get<ClientEntity>(`${this.baseUrl}/clients/findById/${id}`)
      .pipe(
        tap(response => console.log('Response received:', response)),
        catchError(this.handleError)
      );
  }

  updateClient(id: number, client: ClientEntity): Observable<ClientEntity> {
    return this.http.put<ClientEntity>(`${this.baseUrl}/clients/updateClient/${id}`, client)
      .pipe(
        tap(response => console.log('Update response:', response)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error occurred:', error);
    
    let errorMessage = 'Ocurrió un error en la operación';
    
    if (error.status === 404) {
      errorMessage = 'Cliente no encontrado';
    } else if (error.status === 500) {
      errorMessage = 'No se pudieron cargar los datos del cliente, pero puede continuar con la edición.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}