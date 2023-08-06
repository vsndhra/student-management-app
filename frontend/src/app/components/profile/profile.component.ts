import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isLoggedIn: boolean = false;
  userName: string = '';
  email: string = '';
  role: string = '';

  constructor(
    private autheticationService: AuthenticationService,
    private userService: UserService
    ) { }
    
  ngOnInit(): void {
    this.isLoggedIn = this.autheticationService.getIsLoggedIn();
    this.userName = this.autheticationService.getUserName();
    this.email = this.autheticationService.getEmail();
    this.role = this.autheticationService.getRole();
  }

  updateUser(updateData: any, role: string){
    updateData.role = role;
    this.userService.updateUser(updateData)
      .subscribe(
          response => {
            console.log('User data updated successfully: ', response);
          },
          error => {
            console.error('Error updating user:', error);
          }
      );
  }
}
