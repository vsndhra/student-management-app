import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerAPI = 'http://192.168.0.106:5000/api/register'; // Replace with your Flask API URL for registration
  private updateAPI = 'http://192.168.0.106:5000/api/update'; // Replace with your Flask API URL for updation
  private addAssignmentAPI = 'http://192.168.0.106:5000/api/addAssignment'; // Replace with your Flask API URL for adding assignmen
  private getAssignmentAPI = 'http://192.168.0.106:5000/api/getAssignment'; // Replace with your Flask API URL for getting assignmrnt
  private submitAssignmentAPI = 'http://192.168.0.106:5000/api/submitAssignment'; // Replace with your Flask API URL for getting assignmrnt
  private getSubmissionAPI = 'http://192.168.0.106:5000/api/getSubmission'; // Replace with your Flask API URL for getting assignmrnt

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    // Send the POST request to the Flask API
    return this.http.post<any>(this.registerAPI, data);
  }

  updateUser(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.updateAPI, data);
  }

  addAssignment(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.addAssignmentAPI, data);
  }

  getAssignment(): Observable<any> {
    return this.http.get<any>(this.getAssignmentAPI);
  }

  submitAssignment(data: any): Observable<any> {
    return this.http.post<any>(this.submitAssignmentAPI, data);
  }

  getSubmissions(): Observable<any> {
    return this.http.get<any>(this.getSubmissionAPI);
  }
  
}
