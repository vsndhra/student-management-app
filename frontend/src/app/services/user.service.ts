import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerAPI = environment.apiUrl+'/api/register'; 
  private updateAPI = environment.apiUrl+'/api/update'; 
  private addAssignmentAPI = environment.apiUrl+'/api/addAssignment'; 
  private getAssignmentAPI = environment.apiUrl+'/api/getAssignment'; 
  private submitAssignmentAPI = environment.apiUrl+'/api/submitAssignment'; 
  private getSubmissionAPI = environment.apiUrl+'/api/getSubmission';

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    // Send the POST request to the Flask API
    console.log(data);
    return this.http.post<any>(this.registerAPI, data, this.httpOptions);
  }

  updateUser(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.updateAPI, data, { withCredentials: true });
  }

  addAssignment(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.addAssignmentAPI, data, { withCredentials: true });
  }

  getAssignment(): Observable<any> {
    return this.http.get<any>(this.getAssignmentAPI, { withCredentials: true });
  }

  submitAssignment(data: any): Observable<any> {
    return this.http.post<any>(this.submitAssignmentAPI, data, { withCredentials: true });
  }

  getSubmissions(): Observable<any> {
    return this.http.get<any>(this.getSubmissionAPI, { withCredentials: true });
  }
  
}
