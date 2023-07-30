import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  successMessage: string = ''; // Variable to store the success message
  constructor(private userService: UserService, private router: Router) { }

  registerUser(userData: any) {

    // Call the UserService to register the user
    this.userService.registerUser(userData)
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
          // this.successMessage = response.message;
          // Redirect to a success page or login page after successful registration
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error registering user:', error);
          // Handle the error, display an error message, or redirect to an error page.
        }
      );
  }
}
