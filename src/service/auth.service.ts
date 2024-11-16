import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/admin/login'; 
  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('password', password);

    return this.http.post(this.apiUrl, body.toString(), { headers, responseType: 'text' });
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
    localStorage.setItem('isAuthenticated', value.toString());
  }

  isLoggedIn(): boolean {
    // Verifica si el usuario está autenticado
    const storedValue = localStorage.getItem('isAuthenticated');
    return storedValue === 'true';
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  
}
