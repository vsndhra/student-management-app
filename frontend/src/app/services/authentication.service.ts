import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData = new Subject<{ isLoggedIn: boolean; userName: string }>();
  
  private isLoggedIn: boolean = false;
  private userName: string = '';

  private apiUrl = 'http://192.168.0.106:5000/api/login'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  setUserData(isLoggedIn: boolean, name: string): void {
    this.isLoggedIn = isLoggedIn;
    this.userName = name;

    // Emit changes using the Subject 
    this.userData.next({ isLoggedIn: this.isLoggedIn, userName: this.userName });
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getUserName(): string {
    return this.userName;
  }
  clearUserData():any{
    this.isLoggedIn = false;
    this.userName = '';
    this.userData.next({ isLoggedIn: this.isLoggedIn, userName: this.userName });
  }
}
