import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerAPI = '/api/register'; // Replace with your Flask API URL for registration
  private updateAPI = '/api/update'; // Replace with your Flask API URL for updation
  private addAssignmentAPI = '/api/addAssignment'; // Replace with your Flask API URL for adding assignmen
  private getAssignmentAPI = '/api/getAssignment'; // Replace with your Flask API URL for getting assignmrnt
  private submitAssignmentAPI = '/api/submitAssignment'; // Replace with your Flask API URL for getting assignmrnt
  private getSubmissionAPI = '/api/getSubmission'; // Replace with your Flask API URL for getting assignmrnt

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
