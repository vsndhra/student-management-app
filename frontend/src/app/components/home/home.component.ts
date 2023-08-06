import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(
    private autheticationService: AuthenticationService,
    private router: Router
    ) { }
    
  ngOnInit(): void {
    this.isLoggedIn = this.autheticationService.getIsLoggedIn();
    this.userName = this.autheticationService.getUserName();
  }

}
