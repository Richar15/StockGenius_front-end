import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = 'http://localhost:8081/clients';

  constructor(private http: HttpClient) {}

  searchClientByName(name: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}searchClient/${name}`);
  }
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/createClient`, client);
  }
}
