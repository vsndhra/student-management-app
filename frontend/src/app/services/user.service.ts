import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:5000/api/register'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    // Send the POST request to the Flask API
    return this.http.post<any>(this.apiUrl, data);
  }
  
}
