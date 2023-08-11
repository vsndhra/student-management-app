import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerAPI = '${environment.apiUrl}/api/register'; // Replace with your Flask API URL for registration
  private updateAPI = '${environment.apiUrl}/api/update'; // Replace with your Flask API URL for updation
  private addAssignmentAPI = '${environment.apiUrl}/api/addAssignment'; // Replace with your Flask API URL for adding assignmen
  private getAssignmentAPI = '${environment.apiUrl}/api/getAssignment'; // Replace with your Flask API URL for getting assignmrnt
  private submitAssignmentAPI = '${environment.apiUrl}/api/submitAssignment'; // Replace with your Flask API URL for getting assignmrnt
  private getSubmissionAPI = '${environment.apiUrl}/api/getSubmission'; // Replace with your Flask API URL for getting assignmrnt

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
