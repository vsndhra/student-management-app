import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://127.0.0.1:5000/api/login'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
