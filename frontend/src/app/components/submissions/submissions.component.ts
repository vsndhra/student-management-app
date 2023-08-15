import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent {

  isLoggedIn: boolean = false;
  userName: string = '';
  role: string = '';
  submissions: any[] = []; // Initialize the submissions array
  loader: boolean = true;

  constructor(
    private autheticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
    ) { }
    
  ngOnInit(): void {
    this.isLoggedIn = this.autheticationService.getIsLoggedIn();
    this.userName = this.autheticationService.getUserName();
    this.role = this.autheticationService.getRole();
    this.getSubmissions();
  }

  getSubmissions(){
    this.userService.getSubmissions()
      .subscribe(
          response => {
            console.log(response);
            this.submissions = response.submissions; 
            this.loader = false;
            console.log(this.submissions)
          },
          error => {
            console.error('Error getting submissions:', error);
          }
      )
  }

  gradeAssignment(){

  }
}
