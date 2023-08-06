import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  
})
export class HeaderComponent {

  private subscription: Subscription;

  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(
    private autheticationService: AuthenticationService,
    private router: Router
    ) { 
      // Subscribe to changes in the login status and user details
      this.subscription = this.autheticationService.userData.subscribe((data) => {
        this.isLoggedIn = data.isLoggedIn;
        this.userName = data.userName;
      });
    }
    
  // ngOnInit(): void {
  //   this.isLoggedIn = this.autheticationService.getIsLoggedIn();
  //   this.userName = this.autheticationService.getUserName();
  //   console.log("From header "+this.isLoggedIn)
  // }

  logout() {
    // Clear user data on logout
    this.autheticationService.clearUserData();
    this.router.navigate(['/']); 
  }
}
