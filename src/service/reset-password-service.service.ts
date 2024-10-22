import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordServiceService {

  private apiUrl = 'http://localhost:8081/admin/regenerate-password'; 

  constructor(private http: HttpClient) { }

  regeneratePassword(): Observable<string> {
    return this.http.post(this.apiUrl, {}, { responseType: 'text' }); 
  }
}
