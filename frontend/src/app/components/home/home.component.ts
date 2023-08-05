import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  isLoggedIn: boolean = false;
  userName: string = '';
  private subscription: Subscription;

  constructor(
    private autheticationService: AuthenticationService,
    private router: Router
    ) {
    // Subscribe to changes in the login status and user details
    this.subscription = this.autheticationService.userDataChanged.subscribe((data) => {
      this.isLoggedIn = data.isLoggedIn;
      this.userName = data.userName;
    });
    // console.log(this.userName) doesnt log 
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription to avoid memory leaks
    this.subscription.unsubscribe();
  }

  logout() {
    // Clear user data on logout
    this.autheticationService.clearUserData();
    this.router.navigate(['/']);
    
  }
}
