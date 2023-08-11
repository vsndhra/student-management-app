import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData = new Subject<{ isLoggedIn: boolean; userName: string }>();
  
  private isLoggedIn: boolean = false;
  private userName: string = '';
  private email: string = '';
  private role: string = '';

  private apiUrl = environment.apiUrl+'/api/login'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  setUserData(isLoggedIn: boolean, name: string, email: string, role: string): void {
    this.isLoggedIn = isLoggedIn;
    this.userName = name;
    this.email = email;
    this.role = role;

    // Emit changes using the Subject 
    this.userData.next({ isLoggedIn: this.isLoggedIn, userName: this.userName });
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getUserName(): string {
    return this.userName;
  }

  getEmail(): string {
    return this.email
  }

  getRole(): string {
    return this.role;
  }
  
  clearUserData():any{
    this.isLoggedIn = false;
    this.userName = '';
    this.userData.next({ isLoggedIn: this.isLoggedIn, userName: this.userName });
  }
}
