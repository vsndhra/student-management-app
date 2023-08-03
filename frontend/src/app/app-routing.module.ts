import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Redirect to the login page if the URL is empty
  { path: 'login', title: 'Login',component: LoginComponent },
  { path: 'registration', title: 'Registeration',component: RegistrationComponent },
  { path: 'dashboard', title: 'Dashboard',component: DashboardComponent },
  { path: 'profile', title: 'Profile', component: ProfileComponent},
  // Add more routes here as needed

  // For example, you can define a wildcard route for handling unknown URLs
  { path: '**', redirectTo: '/' }, // Redirect to the login page for any unknown URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
