import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode'; // Import the jwt-decode library

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router
    ) { }

  loginUser(loginData: any){

    console.warn(loginData)
    this.authenticationService.loginUser(loginData)
    .subscribe(
      response => {

        // Storing the token to session
        sessionStorage.setItem('token', response.token);

        //retrieving the user details from payload
        const details: any = jwtDecode(response.token);
        const isLoggedIn = !!sessionStorage.getItem('token');
        
        console.log('User logged in successgully', response.token, details, isLoggedIn);

        // Set the login status and user's name in the UserDataService
        this.authenticationService.setUserData(isLoggedIn, details.name);

        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error logging in user: ', error);
      }
    );
  }
}
