import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  successMessage: string = ''; // Variable to store the success message
  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router
    ) { }

  loginUser(loginData: any){

    console.warn(loginData)
    this.authenticationService.loginUser(loginData)
    .subscribe(
      response => {
        console.log('User logged in successgully', response);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error logging in user: ', error);
      }
    );
  }
}
