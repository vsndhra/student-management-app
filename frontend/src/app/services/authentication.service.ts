import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLoggedIn: boolean = false;
  public userName: string = '';
  userDataChanged = new Subject<{ isLoggedIn: boolean; userName: string }>();


  private apiUrl = 'http://192.168.0.106:5000/api/login'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  setUserData(isLoggedIn: boolean, userName: string) {
    this.isLoggedIn = isLoggedIn;
    this.userName = userName;

    // Emit changes using the Subject
    this.userDataChanged.next({ isLoggedIn: this.isLoggedIn, userName: this.userName });
  
  }

  clearUserData() {
    this.isLoggedIn = false;
    this.userName = '';

    // Emit changes using the Subject
    this.userDataChanged.next({ isLoggedIn: this.isLoggedIn, userName: this.userName });
    
  }
}
